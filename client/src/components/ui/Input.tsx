/**
 * SQUAD UP - Componente Input
 * Campo de entrada con soporte para iconos
 */

import { InputHTMLAttributes, ReactNode } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode
  rightIcon?: ReactNode
  onRightIconClick?: () => void
}

export function Input({
  icon,
  rightIcon,
  onRightIconClick,
  style,
  ...props
}: InputProps) {
  return (
    <div style={{ position: 'relative' }}>
      {icon && (
        <div
          style={{
            position: 'absolute',
            left: 12,
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--color-brand)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </div>
      )}
      <input
        className="input"
        style={{
          paddingLeft: icon ? 44 : 16,
          paddingRight: rightIcon ? 44 : 16,
          ...style,
        }}
        {...props}
      />
      {rightIcon && (
        <button
          type="button"
          onClick={onRightIconClick}
          style={{
            position: 'absolute',
            right: 12,
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--color-text-muted)',
            padding: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {rightIcon}
        </button>
      )}
    </div>
  )
}
