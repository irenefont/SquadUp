/**
 * SQUAD UP - Aplicación Principal
 * ==============================
 *
 * Este es el componente raíz de la aplicación.
 * Gestiona el estado de autenticación y renderiza la vista apropiada.
 *
 * FLUJO DE AUTENTICACIÓN:
 * 1. Al montar, verifica si hay sesión existente
 * 2. Si hay sesión → Muestra Dashboard
 * 3. Si no hay sesión → Muestra AuthPage (login/register)
 * 4. Escucha cambios de auth para reaccionar a login/logout
 *
 * ESTADOS:
 * - loading: true → Muestra LoadingScreen
 * - user: null → Muestra AuthPage
 * - user: User → Muestra Dashboard
 *
 * @module App
 * @author Squad Up Team
 */

import { useState, useEffect } from 'react'
import { getUser, onAuthStateChange, signOut } from './services/auth.service'
import type { User } from '@supabase/supabase-js'
import { AuthPage, LoadingScreen, Dashboard } from './components'

/**
 * Componente principal de la aplicación
 * Gestiona autenticación y routing básico
 */
function App() {
  // Estado del usuario autenticado (null = no autenticado)
  const [user, setUser] = useState<User | null>(null)

  // Estado de carga inicial (verificando sesión)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar si ya hay una sesión guardada
    getUser().then((user) => {
      setUser(user)
      setLoading(false)
    })

    // Suscribirse a cambios de autenticación
    // Esto permite reaccionar a login/logout en cualquier momento
    const unsubscribe = onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    // Cleanup: cancelar suscripción al desmontar
    return () => unsubscribe()
  }, [])

  // Mostrar pantalla de carga mientras se verifica la sesión
  if (loading) {
    return <LoadingScreen />
  }

  // Usuario autenticado - mostrar dashboard principal
  if (user) {
    return (
      <Dashboard
        user={user}
        onLogout={() => signOut().then(() => setUser(null))}
      />
    )
  }

  // Usuario no autenticado - mostrar página de login/registro
  return <AuthPage />
}

export default App
