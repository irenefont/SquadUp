/**
 * SQUAD UP - Componente Divider
 * Separador horizontal con texto opcional
 */

interface DividerProps {
  text?: string
}

export function Divider({ text }: DividerProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-lg)',
        marginTop: 'var(--space-xl)',
        marginBottom: 'var(--space-xl)',
      }}
    >
      <div
        style={{
          flex: 1,
          height: 1,
          backgroundColor: 'var(--color-border-light)',
        }}
      />
      {text && (
        <span
          style={{
            color: 'var(--color-text-muted)',
            fontSize: 'var(--font-size-sm)',
          }}
        >
          {text}
        </span>
      )}
      <div
        style={{
          flex: 1,
          height: 1,
          backgroundColor: 'var(--color-border-light)',
        }}
      />
    </div>
  )
}
