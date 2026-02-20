/**
 * SQUAD UP - Página de Autenticación
 * Diseño minimalista y limpio con consistencia de design tokens
 */

import { useState } from 'react'
import {
  signInWithGoogle,
  signUpWithEmail,
  signInWithEmail,
} from '../../services/auth.service'
import { GoogleIcon, Button, ErrorAlert, SuccessAlert, Divider, BackgroundDecorations } from '../ui'
import {
  AuthLeftPanel,
  AuthMobileLogo,
  AuthLegalFooter,
} from '../layout'
import {
  AuthFormHeader,
  AuthTabs,
  AuthFormFields,
  AuthModeSwitch,
} from '../forms'
import type { AuthMode } from '../forms/AuthFormHeader'

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [username, setUsername] = useState('')

  const handleGoogleLogin = async () => {
    setLoading(true)
    setError(null)
    const result = await signInWithGoogle()
    if (!result.success) {
      setError(result.error || 'Error al iniciar sesión')
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    if (mode === 'register') {
      if (password !== confirmPassword) {
        setError('Las contraseñas no coinciden')
        setLoading(false)
        return
      }
      if (password.length < 6) {
        setError('La contraseña debe tener al menos 6 caracteres')
        setLoading(false)
        return
      }
      if (!username.trim()) {
        setError('El nombre de usuario es obligatorio')
        setLoading(false)
        return
      }

      const result = await signUpWithEmail(email, password, {
        username: username.trim(),
        display_name: displayName.trim() || username.trim(),
      })

      if (!result.success) {
        setError(result.error || 'Error al registrarse')
        setLoading(false)
        return
      }

      if (!result.session) {
        setSuccess('¡Cuenta creada! Revisa tu email para confirmar tu cuenta antes de iniciar sesión.')
        setLoading(false)
        setTimeout(() => {
          setMode('login')
          setSuccess(null)
        }, 5000)
      }
    } else {
      const result = await signInWithEmail(email, password)
      if (!result.success) {
        setError(result.error || 'Error al iniciar sesión')
        setLoading(false)
        return
      }
    }
  }

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login')
    setError(null)
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setDisplayName('')
    setUsername('')
  }

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: 'var(--color-bg-primary)',
      }}
    >
      {/* Panel izquierdo decorativo - 25% */}
      <AuthLeftPanel />

      {/* Panel derecho - Formulario - 75% */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'var(--space-xl)',
          flex: 1,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <BackgroundDecorations />

        <div style={{ width: '100%', maxWidth: 400, position: 'relative', zIndex: 1 }}>
          {/* Logo móvil */}
          <AuthMobileLogo />

          {/* Header del formulario */}
          <AuthFormHeader mode={mode} />

          {/* Tabs */}
          <AuthTabs mode={mode} setMode={setMode} />

          {/* Error */}
          {error && <ErrorAlert>{error}</ErrorAlert>}

          {/* Success */}
          {success && <SuccessAlert>{success}</SuccessAlert>}

          {/* Formulario */}
          <AuthFormFields
            mode={mode}
            loading={loading}
            showPassword={showPassword}
            showConfirmPassword={showConfirmPassword}
            email={email}
            password={password}
            confirmPassword={confirmPassword}
            displayName={displayName}
            username={username}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            onConfirmPasswordChange={setConfirmPassword}
            onDisplayNameChange={setDisplayName}
            onUsernameChange={setUsername}
            onTogglePassword={() => setShowPassword(!showPassword)}
            onToggleConfirmPassword={() => setShowConfirmPassword(!showConfirmPassword)}
            onSubmit={handleSubmit}
          />

          {/* Separador */}
          <Divider text="o continúa con" />

          {/* Botón Google */}
          <Button
            variant="secondary"
            fullWidth
            onClick={handleGoogleLogin}
            disabled={loading}
            icon={<GoogleIcon size={16} />}
          >
            Google
          </Button>

          {/* Link cambiar modo */}
          <AuthModeSwitch mode={mode} onSwitch={switchMode} />

          {/* Footer legal */}
          <AuthLegalFooter />
        </div>
      </div>
    </div>
  )
}
