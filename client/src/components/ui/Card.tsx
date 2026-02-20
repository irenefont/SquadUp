/**
 * SQUAD UP - Componente Card
 * ==============================
 *
 * Contenedor con estilo de tarjeta para agrupar contenido.
 * Usado para salas, perfiles, secciones de UI, etc.
 *
 * CARACTERÍSTICAS:
 * - Padding configurable
 * - Borde izquierdo opcional (para destacar)
 * - Efecto hover opcional
 *
 * @module components/ui/Card
 * @author Squad Up Team
 */

import type { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Contenido de la tarjeta */
  children: ReactNode
  /** Espaciado interno */
  padding?: 'none' | 'sm' | 'md' | 'lg'
  /** Si tiene efecto hover */
  hoverable?: boolean
  /** Si muestra borde izquierdo de marca */
  borderLeft?: boolean
}

/** Valores de padding para cada tamaño */
const paddings = {
  none: 0,
  sm: 'var(--space-md)',
  md: 'var(--space-lg)',
  lg: 'var(--space-xl)',
}

export function Card({
  children,
  padding = 'md',
  hoverable = false,
  borderLeft = false,
  style,
  ...props
}: CardProps) {
  return (
    <div
      style={{
        backgroundColor: '#1e1e26',
        borderRadius: 'var(--radius-md)',
        borderLeft: borderLeft ? '10px solid var(--color-brand)' : 'none',
        padding: paddings[padding],
        transition: hoverable ? 'transform 0.2s, box-shadow 0.2s' : 'none',
        boxShadow: 'var(--shadow-card)',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
}
