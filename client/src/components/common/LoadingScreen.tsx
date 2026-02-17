/**
 * SQUAD UP - Componente LoadingScreen
 * Pantalla de carga inicial
 */

import { LoaderIcon, SquadUpLogo } from '../ui/Icons'

export function LoadingScreen() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--color-bg-primary)',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            width: 56,
            height: 56,
            margin: '0 auto var(--space-lg)',
            background: 'linear-gradient(135deg, #6c5ce7 0%, #a855f7 100%)',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <SquadUpLogo size={28} style={{ color: 'white' }} />
        </div>
        <h2
          style={{
            fontSize: 'var(--font-size-lg)',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            marginBottom: 'var(--space-md)',
          }}
        >
          Squad Up
        </h2>
        <LoaderIcon size={24} style={{ color: 'var(--color-brand)', margin: '0 auto' }} />
      </div>
    </div>
  )
}
