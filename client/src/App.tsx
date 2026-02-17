/**
 * SQUAD UP - Aplicación Principal
 * Punto de entrada que gestiona autenticación y routing básico
 */

import { useState, useEffect } from 'react'
import { getUser, onAuthStateChange, signOut } from './services/auth.service'
import type { User } from '@supabase/supabase-js'
import { AuthPage, LoadingScreen, Dashboard } from './components'

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar sesión inicial
    getUser().then((user) => {
      setUser(user)
      setLoading(false)
    })

    // Escuchar cambios de autenticación
    const unsubscribe = onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })

    return () => unsubscribe()
  }, [])

  // Pantalla de carga
  if (loading) {
    return <LoadingScreen />
  }

  // Usuario autenticado - mostrar dashboard
  if (user) {
    return (
      <Dashboard
        user={user}
        onLogout={() => signOut().then(() => setUser(null))}
      />
    )
  }

  // Usuario no autenticado - mostrar login
  return <AuthPage />
}

export default App
