/**
 * SQUAD UP - Auth Mode Switch
 * Link para cambiar entre login y registro
 */

import type { AuthMode } from './AuthFormHeader'

interface AuthModeSwitchProps {
  mode: AuthMode
  onSwitch: () => void
}

export function AuthModeSwitch({ mode, onSwitch }: AuthModeSwitchProps) {
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
