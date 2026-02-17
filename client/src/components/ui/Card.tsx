/**
 * SQUAD UP - Componente Card
 * Contenedor con estilo de tarjeta
 */

import { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hoverable?: boolean
  borderLeft?: boolean
}

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
