/**
 * SQUAD UP - Auth Form Header
 * Header del formulario de autenticación
 */

export type AuthMode = 'login' | 'register'

interface AuthFormHeaderProps {
  mode: AuthMode
}

export function AuthFormHeader({ mode }: AuthFormHeaderProps) {
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
