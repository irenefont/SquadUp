/**
 * SQUAD UP - Auth Form Fields
 * Campos del formulario de autenticación
 */

import { MailIcon, LockIcon, UserIcon, EyeIcon, EyeOffIcon, ArrowRightIcon } from '../ui/Icons'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { FormField } from './FormField'
import type { AuthMode } from './AuthFormHeader'

interface AuthFormFieldsProps {
  mode: AuthMode
  loading: boolean
  showPassword: boolean
  showConfirmPassword: boolean
  email: string
  password: string
  confirmPassword: string
  displayName: string
  username: string
  onEmailChange: (value: string) => void
  onPasswordChange: (value: string) => void
  onConfirmPasswordChange: (value: string) => void
  onDisplayNameChange: (value: string) => void
  onUsernameChange: (value: string) => void
  onTogglePassword: () => void
  onToggleConfirmPassword: () => void
  onSubmit: (e: React.FormEvent) => void
}

export function AuthFormFields({
  mode,
  loading,
  showPassword,
  showConfirmPassword,
  email,
  password,
  confirmPassword,
  displayName,
  username,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onDisplayNameChange,
  onUsernameChange,
  onTogglePassword,
  onToggleConfirmPassword,
  onSubmit,
}: AuthFormFieldsProps) {
  return (
    <form onSubmit={onSubmit}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
        {/* Campos adicionales para registro */}
        {mode === 'register' && (
          <>
            <FormField label="Nombre de usuario" required icon={<UserIcon size={16} />}>
              <Input
                type="text"
                value={username}
                onChange={(e) => onUsernameChange(e.target.value)}
                required
                placeholder="tu_username"
              />
            </FormField>

            <FormField label="Nombre para mostrar" icon={<UserIcon size={16} />}>
              <Input
                type="text"
                value={displayName}
                onChange={(e) => onDisplayNameChange(e.target.value)}
                placeholder="Tu nombre"
              />
            </FormField>
          </>
        )}

        {/* Email */}
        <FormField label="Email" icon={<MailIcon size={16} />}>
          <Input
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            required
            placeholder="tu@email.com"
          />
        </FormField>

        {/* Contraseña */}
        <FormField label="Contraseña" icon={<LockIcon size={16} />}>
          <Input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            required
            placeholder="••••••••"
            rightIcon={showPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
            onRightIconClick={onTogglePassword}
          />
        </FormField>

        {/* Confirmar contraseña (solo registro) */}
        {mode === 'register' && (
          <FormField label="Confirmar contraseña" required icon={<LockIcon size={16} />}>
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => onConfirmPasswordChange(e.target.value)}
              required
              placeholder="••••••••"
              rightIcon={showConfirmPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
              onRightIconClick={onToggleConfirmPassword}
            />
          </FormField>
        )}

        {/* Link olvidé contraseña (solo login) */}
        {mode === 'login' && (
          <div style={{ textAlign: 'right' }}>
            <button
              type="button"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-brand)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>
        )}

        {/* Botón submit */}
        <Button
          type="submit"
          fullWidth
          loading={loading}
          icon={loading ? undefined : <ArrowRightIcon size={16} />}
          style={{ marginTop: 'var(--space-sm)' }}
        >
          {loading ? 'Cargando...' : mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
        </Button>
      </div>
    </form>
  )
}
