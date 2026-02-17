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
import {
  MailIcon,
  LockIcon,
  UserIcon,
  EyeIcon,
  EyeOffIcon,
  ArrowRightIcon,
  AlertCircleIcon,
  GoogleIcon,
  LoaderIcon,
  SquadUpLogo,
  Button,
  Input,
} from '../ui'
import { FormField } from './FormField'

type AuthMode = 'login' | 'register'

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
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
      }
    } else {
      const result = await signInWithEmail(email, password)
      if (!result.success) {
        setError(result.error || 'Error al iniciar sesión')
        setLoading(false)
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
      {/* Panel izquierdo decorativo */}
      <LeftPanel />

      {/* Panel derecho - Formulario */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'var(--space-xl)',
          width: '100%',
          flex: '1 1 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <BackgroundDecorations />

        <div style={{ width: '100%', maxWidth: 400, position: 'relative', zIndex: 1 }}>
          {/* Logo móvil */}
          <MobileLogo className="lg:hidden" />

          {/* Header del formulario */}
          <FormHeader mode={mode} />

          {/* Tabs */}
          <AuthTabs mode={mode} setMode={setMode} />

          {/* Error */}
          {error && <ErrorMessage error={error} />}

          {/* Formulario */}
          <AuthForm
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
          <Divider />

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
          <ModeSwitch mode={mode} onSwitch={switchMode} />

          {/* Footer legal */}
          <LegalFooter />
        </div>
      </div>
    </div>
  )
}

// ============================================
// SUBCOMPONENTES
// ============================================

function LeftPanel() {
  return (
    <div
      style={{
        display: 'none',
        flex: '1 1 0',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-xl)',
        background: 'linear-gradient(135deg, #6c5ce7 0%, #a855f7 50%, #6c5ce7 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
      className="lg:flex"
    >
      <div style={{ position: 'absolute', inset: 0, opacity: 0.1 }}>
        <div
          style={{
            position: 'absolute',
            top: 80,
            left: 80,
            width: 288,
            height: 288,
            borderRadius: '50%',
            backgroundColor: 'white',
            filter: 'blur(64px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 80,
            right: 80,
            width: 384,
            height: 384,
            borderRadius: '50%',
            backgroundColor: 'white',
            filter: 'blur(64px)',
          }}
        />
      </div>

      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
        <div
          style={{
            width: 64,
            height: 64,
            margin: '0 auto var(--space-xl)',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <SquadUpLogo size={32} style={{ color: 'white' }} />
        </div>

        <h1
          style={{
            fontSize: 'var(--font-size-xl)',
            fontWeight: 700,
            color: 'white',
            marginBottom: 'var(--space-md)',
          }}
        >
          Squad Up
        </h1>
        <p
          style={{
            fontSize: 'var(--font-size-base)',
            color: 'rgba(255, 255, 255, 0.8)',
            maxWidth: 320,
          }}
        >
          Encuentra tu equipo perfecto para jugar, crear y conquistar juntos.
        </p>
      </div>
    </div>
  )
}

function BackgroundDecorations() {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(circle, var(--color-border-light) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
          opacity: 0.3,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: -50,
          right: -50,
          width: 150,
          height: 150,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--color-brand) 0%, transparent 70%)',
          opacity: 0.1,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -30,
          left: -30,
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: 'linear-gradient(315deg, var(--color-brand) 0%, transparent 70%)',
          opacity: 0.1,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: '20%',
          bottom: '20%',
          width: 3,
          background: 'linear-gradient(to bottom, transparent, var(--color-brand), transparent)',
          opacity: 0.3,
        }}
      />
    </>
  )
}

function MobileLogo({ className }: { className?: string }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }} className={className}>
      <div
        style={{
          width: 48,
          height: 48,
          margin: '0 auto var(--space-md)',
          backgroundColor: 'var(--color-brand)',
          borderRadius: 'var(--radius-sm)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <SquadUpLogo size={24} style={{ color: 'white' }} />
      </div>
      <h1 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 700, color: 'var(--color-brand)' }}>
        Squad Up
      </h1>
    </div>
  )
}

function FormHeader({ mode }: { mode: AuthMode }) {
  return (
    <div style={{ marginBottom: 'var(--space-xl)' }}>
      <h2
        style={{
          fontSize: 'var(--font-size-lg)',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          marginBottom: 'var(--space-xs)',
        }}
      >
        {mode === 'login' ? 'Bienvenido' : 'Crear cuenta'}
      </h2>
      <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
        {mode === 'login' ? 'Inicia sesión para continuar' : 'Completa tus datos'}
      </p>
    </div>
  )
}

function AuthTabs({ mode, setMode }: { mode: AuthMode; setMode: (m: AuthMode) => void }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 'var(--space-xs)',
        padding: 'var(--space-xs)',
        backgroundColor: 'var(--color-bg-surface)',
        borderRadius: 'var(--radius-sm)',
        marginBottom: 'var(--space-xl)',
      }}
    >
      {(['login', 'register'] as AuthMode[]).map((m) => (
        <button
          key={m}
          type="button"
          onClick={() => setMode(m)}
          style={{
            flex: 1,
            padding: 'var(--space-sm) var(--space-md)',
            borderRadius: 8,
            border: 'none',
            cursor: 'pointer',
            fontSize: 'var(--font-size-sm)',
            fontWeight: 600,
            transition: 'all 0.2s',
            backgroundColor: mode === m ? 'var(--color-brand)' : 'transparent',
            color: mode === m ? 'white' : 'var(--color-text-secondary)',
          }}
        >
          {m === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
        </button>
      ))}
    </div>
  )
}

function ErrorMessage({ error }: { error: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-sm)',
        padding: 'var(--space-md)',
        backgroundColor: 'rgba(231, 76, 60, 0.15)',
        borderRadius: 'var(--radius-sm)',
        marginBottom: 'var(--space-lg)',
        color: 'var(--color-error)',
        fontSize: 'var(--font-size-sm)',
      }}
    >
      <AlertCircleIcon size={16} />
      <span>{error}</span>
    </div>
  )
}

interface AuthFormProps {
  mode: AuthMode
  loading: boolean
  showPassword: boolean
  showConfirmPassword: boolean
  email: string
  password: string
  confirmPassword: string
  displayName: string
  username: string
  onEmailChange: (v: string) => void
  onPasswordChange: (v: string) => void
  onConfirmPasswordChange: (v: string) => void
  onDisplayNameChange: (v: string) => void
  onUsernameChange: (v: string) => void
  onTogglePassword: () => void
  onToggleConfirmPassword: () => void
  onSubmit: (e: React.FormEvent) => void
}

function AuthForm({
  mode,
  loading,
  showPassword,
  showConfirmPassword,
  email,
  password,
  confirmPassword,
  displayName,
  username,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onDisplayNameChange,
  onUsernameChange,
  onTogglePassword,
  onToggleConfirmPassword,
  onSubmit,
}: AuthFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
        {mode === 'register' && (
          <>
            <FormField label="Nombre de usuario" required icon={<UserIcon size={16} />}>
              <Input
                type="text"
                value={username}
                onChange={(e) => onUsernameChange(e.target.value)}
                required
                placeholder="tu_username"
              />
            </FormField>

            <FormField label="Nombre para mostrar" icon={<UserIcon size={16} />}>
              <Input
                type="text"
                value={displayName}
                onChange={(e) => onDisplayNameChange(e.target.value)}
                placeholder="Tu nombre"
              />
            </FormField>
          </>
        )}

        <FormField label="Email" icon={<MailIcon size={16} />}>
          <Input
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            required
            placeholder="tu@email.com"
          />
        </FormField>

        <FormField label="Contraseña" icon={<LockIcon size={16} />}>
          <Input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            required
            placeholder="••••••••"
            rightIcon={showPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
            onRightIconClick={onTogglePassword}
          />
        </FormField>

        {mode === 'register' && (
          <FormField label="Confirmar contraseña" required icon={<LockIcon size={16} />}>
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => onConfirmPasswordChange(e.target.value)}
              required
              placeholder="••••••••"
              rightIcon={showConfirmPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
              onRightIconClick={onToggleConfirmPassword}
            />
          </FormField>
        )}

        {mode === 'login' && (
          <div style={{ textAlign: 'right' }}>
            <button
              type="button"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-brand)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>
        )}

        <Button
          type="submit"
          fullWidth
          loading={loading}
          icon={loading ? undefined : <ArrowRightIcon size={16} />}
          style={{ marginTop: 'var(--space-sm)' }}
        >
          {loading ? 'Cargando...' : mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
        </Button>
      </div>
    </form>
  )
}

function Divider() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-md)',
        margin: 'var(--space-xl) 0',
      }}
    >
      <div style={{ flex: 1, height: 1, backgroundColor: 'var(--color-border-light)' }} />
      <span style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
        o continúa con
      </span>
      <div style={{ flex: 1, height: 1, backgroundColor: 'var(--color-border-light)' }} />
    </div>
  )
}

function ModeSwitch({ mode, onSwitch }: { mode: AuthMode; onSwitch: () => void }) {
  return (
    <p
      style={{
        textAlign: 'center',
        marginTop: 'var(--space-xl)',
        color: 'var(--color-text-secondary)',
        fontSize: 'var(--font-size-sm)',
      }}
    >
      {mode === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}{' '}
      <button
        type="button"
        onClick={onSwitch}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--color-brand)',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        {mode === 'login' ? 'Regístrate' : 'Inicia sesión'}
      </button>
    </p>
  )
}

function LegalFooter() {
  return (
    <p
      style={{
        textAlign: 'center',
        marginTop: 'var(--space-xl)',
        color: 'var(--color-text-muted)',
        fontSize: 'var(--font-size-xs)',
      }}
    >
      Al continuar, aceptas nuestros{' '}
      <button
        type="button"
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--color-brand)',
          cursor: 'pointer',
          textDecoration: 'underline',
        }}
      >
        Términos de servicio
      </button>
      {' '}y{' '}
      <button
        type="button"
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--color-brand)',
          cursor: 'pointer',
          textDecoration: 'underline',
        }}
      >
        Política de privacidad
      </button>
    </p>
  )
}
