/**
 * SQUAD UP - Componente ChatPanel
 * Panel lateral de chat - Fiel al Figma
 */

export function ChatPanel() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        backgroundColor: '#1e1e26',
        borderRadius: 32,
      }}
    >
      {/* Header del Chat */}
      <div
        style={{
          padding: 24,
          borderBottom: '1px solid #5c5a5a',
        }}
      >
        <h3
          style={{
            color: '#b2bec3',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 700,
            fontSize: 24,
            margin: 0,
          }}
        >
          Chat
        </h3>
      </div>

      {/* Contenido placeholder */}
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
        Selecciona una sala para ver el chat
      </div>
    </div>
  )
}
