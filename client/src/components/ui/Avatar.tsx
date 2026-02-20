/**
 * SQUAD UP - Componente Avatar
 * ==============================
 *
 * Avatar de usuario con múltiples tamaños.
 * Muestra imagen, iniciales o icono por defecto.
 *
 * VARIANTES:
 * - Con imagen: Muestra la imagen proporcionada
 * - Con iniciales: Muestra las iniciales sobre fondo
 * - Por defecto: Muestra icono de usuario
 *
 * TAMAÑOS:
 * - sm: 32px (para listas compactas)
 * - md: 48px (tamaño estándar)
 * - lg: 64px (para perfiles)
 * - xl: 75px (para vista detallada)
 *
 * @module components/ui/Avatar
 * @author Squad Up Team
 */

/** Tamaños disponibles para el avatar */
type AvatarSize = 'sm' | 'md' | 'lg' | 'xl'

interface AvatarProps {
  /** URL de la imagen del avatar */
  src?: string
  /** Texto alternativo para accesibilidad */
  alt?: string
  /** Iniciales a mostrar si no hay imagen */
  initials?: string
  /** Tamaño del avatar */
  size?: AvatarSize
  /** Estilos personalizados */
  style?: React.CSSProperties
  /** Clases CSS adicionales */
  className?: string
  /** Callback al hacer click */
  onClick?: () => void
}

/** Dimensiones en píxeles para cada tamaño */
const sizes: Record<AvatarSize, number> = {
  sm: 32,
  md: 48,
  lg: 64,
  xl: 75,
}

export function Avatar({
  src,
  alt = 'Avatar',
  initials,
  size = 'md',
  style,
  className = '',
  onClick,
}: AvatarProps) {
  const dimension = sizes[size]

  return (
    <div
      onClick={onClick}
      style={{
        width: dimension,
        height: dimension,
        borderRadius: size === 'xl' ? 87 : 'var(--radius-full)',
        backgroundColor: src ? 'transparent' : 'var(--color-placeholder)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: onClick ? 'pointer' : 'default',
        overflow: 'hidden',
        flexShrink: 0,
        fontSize: dimension * 0.4,
        ...style,
      }}
      className={className}
      title={alt}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      ) : initials ? (
        <span
          style={{
            color: 'var(--color-brand)',
            fontWeight: 600,
          }}
        >
          {initials}
        </span>
      ) : (
        <span>👤</span>
      )}
    </div>
  )
}
