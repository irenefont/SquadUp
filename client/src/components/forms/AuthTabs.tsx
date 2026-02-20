/**
 * SQUAD UP - Auth Tabs
 * Tabs para cambiar entre login y registro
 */

import type { AuthMode } from './AuthFormHeader'

interface AuthTabsProps {
  mode: AuthMode
  setMode: (mode: AuthMode) => void
}

export function AuthTabs({ mode, setMode }: AuthTabsProps) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 'var(--space-xs)',
        padding: 'var(--space-xs)',
        backgroundColor: 'var(--color-surface)',
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
            borderRadius: 'var(--radius-sm)',
            border: 'none',
            cursor: 'pointer',
            fontSize: 'var(--font-size-sm)',
            fontWeight: 600,
            transition: 'all 0.2s ease',
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
