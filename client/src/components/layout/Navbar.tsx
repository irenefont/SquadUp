/**
 * SQUAD UP - Componente Navbar
 * Barra de navegación principal - Fiel al Figma
 */

import { SearchIcon, BellIcon, LogOutIcon } from '../ui/Icons'
import { Avatar } from '../ui/Avatar'
import type { User } from '@supabase/supabase-js'

interface NavbarProps {
  user: User
  onLogout: () => void
}

export function Navbar({ user, onLogout }: NavbarProps) {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 24,
        height: 80,
        width: '100%',
        padding: '12px 24px',
        backgroundColor: '#1e1e26',
        borderRadius: 12,
        boxShadow: '0px 4px 10px 0px rgba(0, 0, 0, 0.25)',
        opacity: 0.8,
      }}
    >
      {/* Logo - 64x64 */}
      <div
        style={{
          width: 64,
          height: 64,
          backgroundColor: '#6c5ce7',
          borderRadius: 12,
          opacity: 0.8,
          flexShrink: 0,
        }}
      />

      {/* SearchBar */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          height: '100%',
          backgroundColor: '#121218',
          borderRadius: 79,
          padding: '10px',
        }}
      >
        <SearchIcon size={24} style={{ color: 'white', flexShrink: 0 }} />
        <span
          style={{
            color: 'white',
            fontSize: 16,
            fontFamily: 'Inter, sans-serif',
          }}
        >
          Buscar...
        </span>
      </div>

      {/* Bell Icon - 24x24 */}
      <button
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <BellIcon size={24} style={{ color: 'white' }} />
      </button>

      {/* Avatar - 48x48 */}
      <Avatar
        initials={user.email?.charAt(0).toUpperCase()}
        alt={user.email || 'Usuario'}
        size="md"
        style={{
          backgroundColor: 'rgba(217, 212, 255, 0.75)',
          opacity: 0.8,
        }}
      />

      {/* Logout button */}
      <button
        onClick={onLogout}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: 'none',
          border: 'none',
          color: 'var(--color-text-secondary)',
          cursor: 'pointer',
          fontSize: 14,
          padding: '8px 12px',
          borderRadius: 8,
          flexShrink: 0,
        }}
      >
        <LogOutIcon size={16} />
        <span className="hidden sm:inline">Salir</span>
      </button>
    </header>
  )
}
