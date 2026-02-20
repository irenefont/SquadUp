/**
 * SQUAD UP - Servicio de Autenticación
 * ==============================
 *
 * Este servicio maneja toda la lógica de autenticación con Supabase.
 * Proporciona métodos para registro, login, logout y gestión de sesiones.
 *
 * FUNCIONALIDADES:
 * - Login con Google OAuth
 * - Registro con email/contraseña
 * - Login con email/contraseña
 * - Logout (cerrar sesión)
 * - Obtener sesión/usuario actual
 * - Escuchar cambios de estado de autenticación
 *
 * CONFIGURACIÓN REQUERIDA:
 * - Variables de entorno VITE_SUPABASE_URL y VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY
 * - Tabla profiles en Supabase con RLS configurado
 *
 * @module services/auth.service
 * @author Squad Up Team
 */

import supabase from '../utils/supabase'
import type { User, Session } from '@supabase/supabase-js'

/**
 * Respuesta de operaciones de autenticación
 * Estructura consistente para todas las funciones de auth
 */
export interface AuthResponse {
  /** Si la operación fue exitosa */
  success: boolean
  /** Mensaje de error si success es false */
  error?: string
  /** Usuario autenticado (si aplica) */
  user?: User | null
  /** Sesión activa (si aplica) */
  session?: Session | null
}

/**
 * Callback para escuchar cambios de autenticación
 * @param event - Nombre del evento (SIGNED_IN, SIGNED_OUT, etc.)
 * @param session - Sesión actual (null si no hay sesión)
 */
type AuthStateCallback = (event: string, session: Session | null) => void

/**
 * Iniciar sesión con Google OAuth
 * Abre el popup de Google para autenticación
 * Redirige a /dashboard después del login exitoso
 *
 * @returns AuthResponse con success o error
 *
 * @example
 * ```tsx
 * const result = await signInWithGoogle()
 * if (!result.success) {
 *   alert(result.error)
 * }
 * // Si success, el usuario será redirigido automáticamente
 * ```
 */
export async function signInWithGoogle(): Promise<AuthResponse> {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin + '/dashboard'
    }
  })

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true }
}

/**
 * Registrar usuario con email y contraseña
 * Supabase envía un email de confirmación por defecto
 *
 * @param email - Email del nuevo usuario
 * @param password - Contraseña (mínimo 8 caracteres)
 * @param metadata - Datos adicionales (username, display_name)
 * @returns AuthResponse con success y sesión (si no requiere confirmación)
 *
 * @example
 * ```tsx
 * const result = await signUpWithEmail('user@email.com', 'password123', {
 *   username: 'player1',
 *   display_name: 'Player One'
 * })
 *
 * if (result.success && !result.session) {
 *   alert('Revisa tu email para confirmar tu cuenta')
 * }
 * ```
 */
export async function signUpWithEmail(
  email: string,
  password: string,
  metadata?: { username?: string; display_name?: string }
): Promise<AuthResponse> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata,
      emailRedirectTo: window.location.origin + '/dashboard'
    }
  })

  if (error) {
    return { success: false, error: error.message }
  }
// NOTA: Supabase envía un email de confirmación. El usuario debe validar su email antes de poder iniciar sesión.
  return { success: true, user: data.user, session: data.session }
}

/**
 * Iniciar sesión con email y contraseña
 * Requiere que el email esté confirmado (si aplica)
 *
 * @param email - Email del usuario
 * @param password - Contraseña
 * @returns AuthResponse con success, user y session
 *
 * @example
 * ```tsx
 * const result = await signInWithEmail('user@email.com', 'password')
 * if (result.success) {
 *   console.log('Usuario:', result.user?.email)
 * }
 * ```
 */
export async function signInWithEmail(
  email: string,
  password: string
): Promise<AuthResponse> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true, user: data.user, session: data.session }
}

/**
 * Cerrar sesión
 * Invalida la sesión actual del usuario
 *
 * @returns AuthResponse con success o error
 *
 * @example
 * ```tsx
 * const result = await signOut()
 * if (result.success) {
 *   navigate('/login')
 * }
 * ```
 */
export async function signOut(): Promise<AuthResponse> {
  const { error } = await supabase.auth.signOut()

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true }
}

/**
 * Obtener sesión actual
 * Retorna null si no hay sesión activa
 *
 * @returns Session activa o null
 *
 * @example
 * ```tsx
 * const session = await getSession()
 * if (session) {
 *   console.log('Token:', session.access_token)
 * }
 * ```
 */
export async function getSession(): Promise<Session | null> {
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

/**
 * Obtener usuario actual
 * Retorna null si no hay usuario autenticado
 *
 * @returns User autenticado o null
 *
 * @example
 * ```tsx
 * const user = await getUser()
 * if (user) {
 *   console.log('Email:', user.email)
 * }
 * ```
 */
export async function getUser(): Promise<User | null> {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

/**
 * Escuchar cambios en el estado de autenticación
 * Permite reaccionar a login, logout, token refresh, etc.
 *
 * @param callback - Función a llamar cuando cambia el estado
 * @returns Función de cleanup para cancelar la suscripción
 *
 * @example
 * ```tsx
 * useEffect(() => {
 *   const unsubscribe = onAuthStateChange((event, session) => {
 *     if (event === 'SIGNED_IN') {
 *       console.log('Usuario logueado:', session?.user)
 *     } else if (event === 'SIGNED_OUT') {
 *       console.log('Usuario deslogueado')
 *     }
 *   })
 *
 *   return () => unsubscribe()
 * }, [])
 * ```
 */
export function onAuthStateChange(callback: AuthStateCallback) {
  const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session)
  })

  // Retornar función para cancelar la suscripción
  return () => subscription.unsubscribe()
}

/**
 * Verificar si el usuario está autenticado
 * Atajo para comprobar rápidamente si hay sesión
 *
 * @returns true si hay sesión activa, false si no
 *
 * @example
 * ```tsx
 * if (await isAuthenticated()) {
 *   // Mostrar contenido protegido
 * } else {
 *   // Redirigir a login
 * }
 * ```
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession()
  return session !== null
}

export default {
  signInWithGoogle,
  signUpWithEmail,
  signInWithEmail,
  signOut,
  getSession,
  getUser,
  onAuthStateChange,
  isAuthenticated
}
