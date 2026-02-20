/**
 * SQUAD UP - Componente FormField
 * Campo de formulario con label e icono
 */

import type { ReactNode } from 'react'

interface FormFieldProps {
  label: string
  required?: boolean
  icon?: ReactNode
  children: ReactNode
}

export function FormField({ label, required, icon, children }: FormFieldProps) {
  return (
    <div>
      <label
        style={{
          display: 'block',
          marginBottom: 'var(--space-xs)',
          color: 'var(--color-text-secondary)',
          fontSize: 'var(--font-size-sm)',
          fontWeight: 500,
        }}
      >
        {label}{' '}
        {required && <span style={{ color: 'var(--color-brand)' }}>*</span>}
      </label>
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
        {children}
      </div>
    </div>
  )
}
