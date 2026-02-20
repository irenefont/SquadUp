/**
 * SQUAD UP - Componente Button
 * Botón reutilizable con variantes primary y secondary
 */

import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { LoaderIcon } from './Icons'

type ButtonVariant = 'primary' | 'secondary'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  icon?: ReactNode
  children: ReactNode
  fullWidth?: boolean
}

const styles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    backgroundColor: 'var(--color-brand)',
    color: 'white',
    border: 'none',
  },
  secondary: {
    backgroundColor: 'transparent',
    color: 'var(--color-text-primary)',
    border: '1px solid var(--color-border-light)',
  },
}

const sizes: Record<ButtonSize, React.CSSProperties> = {
  sm: {
    padding: 'var(--space-sm) var(--space-md)',
    fontSize: 'var(--font-size-xs)',
  },
  md: {
    padding: 'var(--space-md) var(--space-xl)',
    fontSize: 'var(--font-size-sm)',
  },
  lg: {
    padding: 'var(--space-lg) var(--space-2xl)',
    fontSize: 'var(--font-size-base)',
  },
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  children,
  fullWidth = false,
  disabled,
  style,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-sm)',
        borderRadius: 'var(--radius-sm)',
        fontWeight: 600,
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        opacity: disabled || loading ? 0.5 : 1,
        transition: 'all 0.2s ease',
        width: fullWidth ? '100%' : 'auto',
        ...styles[variant],
        ...sizes[size],
        ...style,
      }}
      {...props}
    >
      {loading ? <LoaderIcon size={16} /> : icon}
      {children}
    </button>
  )
}
