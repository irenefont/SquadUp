/**
 * Squad Up - Servicio de Autenticación
 * Maneja la lógica de autenticación con Supabase
 */

import supabase from '../utils/supabase'
import type { User, Session } from '@supabase/supabase-js'

// Tipos de respuesta
export interface AuthResponse {
  success: boolean
  error?: string
  user?: User | null
  session?: Session | null
}

// Listener para cambios de estado
type AuthStateCallback = (event: string, session: Session | null) => void

/**
 * Iniciar sesión con Google OAuth
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
 */
export async function getSession(): Promise<Session | null> {
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

/**
 * Obtener usuario actual
 */
export async function getUser(): Promise<User | null> {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

/**
 * Escuchar cambios en el estado de autenticación
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
