/**
 * SQUAD UP - Componente Avatar
 * Avatar de usuario con diferentes tamaños
 */

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl'

interface AvatarProps {
  src?: string
  alt?: string
  initials?: string
  size?: AvatarSize
  style?: React.CSSProperties
  onClick?: () => void
}

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
