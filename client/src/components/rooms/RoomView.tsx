/**
 * SQUAD UP - Componente RoomView
 * Vista detallada de una sala de juego
 */

import { ArrowRightIcon, UsersIcon, ChatIcon } from '../ui/Icons'
import { Button } from '../ui/Button'
import type { Room } from '../../data/mockData'

interface RoomViewProps {
  room: Room
  onBack: () => void
}

export function RoomView({ room, onBack }: RoomViewProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        height: '100%',
        backgroundColor: '#1e1e26',
        borderRadius: 16,
        overflow: 'hidden',
      }}
    >
      {/* Header de la sala */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          padding: '24px',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        {/* Avatar del host */}
        <div
          style={{
            width: 75,
            height: 75,
            borderRadius: 87,
            backgroundColor: '#d9d9d9',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 28,
          }}
        >
          👤
        </div>

        {/* Info de la sala */}
        <div style={{ flex: 1 }}>
          <h2
            style={{
              color: 'var(--color-text-primary)',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              fontSize: 24,
              margin: 0,
              marginBottom: 4,
            }}
          >
            {room.title}
          </h2>
          <p
            style={{
              color: 'var(--color-text-secondary)',
              fontSize: 14,
              margin: 0,
            }}
          >
            Creado por {room.host}
          </p>
        </div>

        {/* Botón volver */}
        <Button variant="secondary" onClick={onBack}>
          Volver
        </Button>
      </div>

      {/* Contenido principal */}
      <div
        style={{
          display: 'flex',
          flex: 1,
          gap: 20,
          padding: '0 24px 24px 24px',
        }}
      >
        {/* Columna izquierda - Info y jugadores */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          {/* Descripción */}
          <div
            style={{
              padding: 16,
              backgroundColor: 'rgba(18, 18, 24, 0.5)',
              borderRadius: 12,
              borderLeft: '8px solid #6c5ce7',
            }}
          >
            <h3
              style={{
                color: 'var(--color-text-secondary)',
                fontSize: 14,
                fontWeight: 600,
                marginBottom: 8,
              }}
            >
              Descripción
            </h3>
            <p style={{ color: 'var(--color-text-primary)', fontSize: 14, margin: 0 }}>
              Busco jugadores activos para ranked. Se requiere micrófono y comunicación.
              Preferiblemente jugadores con experiencia en el rol.
            </p>
          </div>

          {/* Jugadores en la sala */}
          <div
            style={{
              flex: 1,
              padding: 16,
              backgroundColor: 'rgba(18, 18, 24, 0.5)',
              borderRadius: 12,
              borderLeft: '8px solid #6c5ce7',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 16,
              }}
            >
              <UsersIcon size={20} style={{ color: 'var(--color-brand)' }} />
              <h3
                style={{
                  color: 'var(--color-text-secondary)',
                  fontSize: 14,
                  fontWeight: 600,
                  margin: 0,
                }}
              >
                Jugadores (1/5)
              </h3>
            </div>

            {/* Lista de jugadores */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <PlayerItem name={room.host} isHost />
              <PlayerSlot empty />
              <PlayerSlot empty />
              <PlayerSlot empty />
              <PlayerSlot empty />
            </div>
          </div>

          {/* Botón unirse */}
          <Button fullWidth icon={<ArrowRightIcon size={16} />}>
            Unirse a la sala
          </Button>
        </div>

        {/* Columna derecha - Chat */}
        <div
          style={{
            width: 300,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgba(18, 18, 24, 0.5)',
            borderRadius: 12,
            overflow: 'hidden',
          }}
        >
          {/* Header del chat */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: 16,
              borderBottom: '1px solid var(--color-border)',
            }}
          >
            <ChatIcon size={20} style={{ color: 'var(--color-brand)' }} />
            <h3
              style={{
                color: 'var(--color-text-secondary)',
                fontSize: 14,
                fontWeight: 600,
                margin: 0,
              }}
            >
              Chat de la sala
            </h3>
          </div>

          {/* Mensajes */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-text-muted)',
              fontSize: 14,
              padding: 24,
              textAlign: 'center',
            }}
          >
            Únete a la sala para participar en el chat
          </div>

          {/* Input del chat */}
          <div
            style={{
              padding: 12,
              borderTop: '1px solid var(--color-border)',
            }}
          >
            <div
              style={{
                padding: '10px 16px',
                backgroundColor: 'var(--color-bg-primary)',
                borderRadius: 8,
                color: 'var(--color-text-muted)',
                fontSize: 14,
              }}
            >
              Escribe un mensaje...
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente para jugador
function PlayerItem({ name, isHost }: { name: string; isHost?: boolean }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '10px 12px',
        backgroundColor: 'rgba(108, 92, 231, 0.1)',
        borderRadius: 8,
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          backgroundColor: '#d9d9d9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 16,
        }}
      >
        👤
      </div>
      <div style={{ flex: 1 }}>
        <span style={{ color: 'var(--color-text-primary)', fontSize: 14, fontWeight: 500 }}>
          {name}
        </span>
        {isHost && (
          <span
            style={{
              marginLeft: 8,
              padding: '2px 8px',
              backgroundColor: 'var(--color-brand)',
              color: 'white',
              fontSize: 10,
              borderRadius: 4,
              fontWeight: 600,
            }}
          >
            HOST
          </span>
        )}
      </div>
    </div>
  )
}

// Componente para slot vacío
function PlayerSlot({ empty }: { empty?: boolean }) {
  if (!empty) return null

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '10px 12px',
        backgroundColor: 'transparent',
        borderRadius: 8,
        border: '1px dashed var(--color-border)',
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 14,
          color: 'var(--color-text-muted)',
        }}
      >
        ?
      </div>
      <span style={{ color: 'var(--color-text-muted)', fontSize: 14 }}>
        Esperando jugador...
      </span>
    </div>
  )
}
