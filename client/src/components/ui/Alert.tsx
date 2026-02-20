/**
 * SQUAD UP - Componentes de Alerta
 * ==============================
 *
 * Componentes para mostrar mensajes de feedback al usuario.
 * Disponibles en dos variantes: error (rojo) y success (verde).
 *
 * USO:
 * - ErrorAlert: Para mostrar errores de formularios, API, etc.
 * - SuccessAlert: Para confirmar acciones exitosas
 *
 * @module components/ui/Alert
 * @author Squad Up Team
 */

import { AlertCircleIcon, CheckCircleIcon } from './Icons'

interface AlertProps {
  /** Contenido del mensaje */
  children: React.ReactNode
}

/**
 * Alerta de error
 * Muestra mensajes de error con icono y fondo rojo
 *
 * @example
 * ```tsx
 * {error && <ErrorAlert>{error}</ErrorAlert>}
 * ```
 */
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

/**
 * Alerta de éxito
 * Muestra mensajes de confirmación con icono y fondo verde
 *
 * @example
 * ```tsx
 * {success && <SuccessAlert>{success}</SuccessAlert>}
 * ```
 */
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
