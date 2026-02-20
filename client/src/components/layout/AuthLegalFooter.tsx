/**
 * SQUAD UP - Auth Legal Footer
 * Footer con links legales en la página de autenticación
 */

export function AuthLegalFooter() {
  return (
    <p
      style={{
        textAlign: 'center',
        marginTop: 'var(--space-xl)',
        color: 'var(--color-text-muted)',
        fontSize: 'var(--font-size-xs)',
      }}
    >
      Al continuar, aceptas nuestros{' '}
      <button
        type="button"
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--color-brand)',
          cursor: 'pointer',
          textDecoration: 'underline',
        }}
      >
        Términos de servicio
      </button>
      {' '}y{' '}
      <button
        type="button"
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--color-brand)',
          cursor: 'pointer',
          textDecoration: 'underline',
        }}
      >
        Política de privacidad
      </button>
    </p>
  )
}
