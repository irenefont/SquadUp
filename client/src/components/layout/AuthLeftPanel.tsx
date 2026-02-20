/**
 * SQUAD UP - Auth Left Panel
 * Panel izquierdo decorativo de la página de autenticación (25% de ancho)
 */

import { SquadUpLogo } from '../ui/Icons'

export function AuthLeftPanel() {
  return (
    <div
      className="auth-left-panel"
      style={{
        width: '25%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-xl)',
        background: 'linear-gradient(135deg, #6c5ce7 0%, #a855f7 50%, #6c5ce7 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Círculos decorativos de fondo */}
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

      {/* Contenido */}
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
