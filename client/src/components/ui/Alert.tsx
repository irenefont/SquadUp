/**
 * SQUAD UP - Componentes de Alerta
 * Mensajes de error y éxito reutilizables
 */

import { AlertCircleIcon, CheckCircleIcon } from './Icons'

interface AlertProps {
  children: React.ReactNode
}

export function ErrorAlert({ children }: AlertProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-sm)',
        padding: 'var(--space-md)',
        backgroundColor: 'rgba(239, 68, 68, 0.15)',
        borderRadius: 'var(--radius-sm)',
        marginBottom: 'var(--space-lg)',
        color: 'var(--color-error)',
        fontSize: 'var(--font-size-sm)',
      }}
    >
      <AlertCircleIcon size={16} />
      <span>{children}</span>
    </div>
  )
}

export function SuccessAlert({ children }: AlertProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-sm)',
        padding: 'var(--space-md)',
        backgroundColor: 'rgba(34, 197, 94, 0.15)',
        borderRadius: 'var(--radius-sm)',
        marginBottom: 'var(--space-lg)',
        color: 'var(--color-success)',
        fontSize: 'var(--font-size-sm)',
      }}
    >
      <CheckCircleIcon size={16} />
      <span>{children}</span>
    </div>
  )
}
