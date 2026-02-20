/**
 * SQUAD UP - Componente Button
 * ==============================
 *
 * Botón reutilizable con múltiples variantes y tamaños.
 * Soporta estados de carga, iconos y ancho completo.
 *
 * VARIANTES:
 * - primary: Botón principal con color de marca (morado)
 * - secondary: Botón secundario con borde
 *
 * TAMAÑOS:
 * - sm: Pequeño (para acciones secundarias)
 * - md: Mediano (por defecto)
 * - lg: Grande (para CTAs principales)
 *
 * @module components/ui/Button
 * @author Squad Up Team
 */

import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { LoaderIcon } from './Icons'

/** Variantes visuales del botón */
type ButtonVariant = 'primary' | 'secondary'

/** Tamaños disponibles */
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Variante visual (primary/secondary) */
  variant?: ButtonVariant
  /** Tamaño del botón */
  size?: ButtonSize
  /** Muestra indicador de carga y deshabilita el botón */
  loading?: boolean
  /** Icono a mostrar antes del texto */
  icon?: ReactNode
  /** Contenido del botón */
  children: ReactNode
  /** Si ocupa todo el ancho disponible */
  fullWidth?: boolean
}

/** Estilos para cada variante */
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

/** Estilos para cada tamaño */
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

/**
 * Componente Button
 * Botón reutilizable con variantes y estados
 *
 * @example
 * ```tsx
 * // Botón primario
 * <Button>Enviar</Button>
 *
 * // Botón secundario con icono
 * <Button variant="secondary" icon={<GoogleIcon />}>
 *   Continuar con Google
 * </Button>
 *
 * // Botón de carga
 * <Button loading>Procesando...</Button>
 * ```
 */
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
