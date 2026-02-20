/**
 * SQUAD UP - Background Decorations
 * Decoraciones de fondo para páginas de autenticación
 */

export function BackgroundDecorations() {
  return (
    <>
      {/* Patrón de puntos */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.3,
          backgroundImage: 'radial-gradient(circle, #2d2d3a 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      {/* Círculo superior derecho */}
      <div
        style={{
          position: 'absolute',
          top: -48,
          right: -48,
          width: 150,
          height: 150,
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--color-brand) 0%, transparent 70%)',
          opacity: 0.1,
        }}
      />
      {/* Círculo inferior izquierdo */}
      <div
        style={{
          position: 'absolute',
          bottom: -32,
          left: -32,
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--color-brand) 0%, transparent 70%)',
          opacity: 0.1,
        }}
      />
      {/* Línea vertical izquierda */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: '20%',
          bottom: '20%',
          width: 3,
          background: 'linear-gradient(to bottom, transparent, var(--color-brand), transparent)',
          opacity: 0.3,
        }}
      />
    </>
  )
}
