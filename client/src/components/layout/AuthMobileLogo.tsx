/**
 * SQUAD UP - Auth Mobile Logo
 * Logo que aparece en móvil en la página de autenticación
 */

import { SquadUpLogo } from '../ui/Icons'

interface AuthMobileLogoProps {
  className?: string
}

export function AuthMobileLogo({ className }: AuthMobileLogoProps) {
  return (
    <div
      style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}
      className={`auth-mobile-logo${className ? ` ${className}` : ''}`}
    >
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
