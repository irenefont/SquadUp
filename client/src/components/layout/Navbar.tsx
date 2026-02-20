/**
 * SQUAD UP - Componente Navbar
 * Barra de navegación principal - Fiel al Figma
 */

import { SearchIcon, BellIcon, LogOutIcon, SquadUpLogo, PlusIcon } from '../ui/Icons'
import { Avatar } from '../ui/Avatar'
import type { User } from '@supabase/supabase-js'

interface NavbarProps {
  user: User
  onLogout: () => void
  onCreateRoom: () => void
}

export function Navbar({ user, onLogout, onCreateRoom }: NavbarProps) {
  return (
    <header className="flex items-center gap-4 h-14 w-full px-4 py-2 bg-[#1e1e26] rounded-xl shadow-md">
      {/* Logo */}
      <div className="w-10 h-10 shrink-0 flex items-center justify-center">
        <SquadUpLogo size={36} className="text-[#6c5ce7]" />
      </div>

      {/* SearchBar */}
      <div className="flex-1 flex items-center justify-center gap-2 h-9 bg-[#121218] rounded-full px-3 hover:bg-[#121218]/80 transition-colors cursor-pointer">
        <SearchIcon size={18} className="text-white/60 shrink-0" />
        <span className="text-white/60 text-sm">
          Buscar salas...
        </span>
      </div>

      {/* Botón Crear Sala */}
      <button
        onClick={onCreateRoom}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#6c5ce7] hover:bg-[#5b4cdb] text-white font-semibold text-sm rounded-lg transition-all"
      >
        <PlusIcon size={16} />
        <span className="hidden sm:inline">Crear sala</span>
      </button>

      {/* Bell Icon */}
      <button className="p-1.5 flex items-center justify-center hover:bg-white/5 rounded-lg transition-colors">
        <BellIcon size={20} className="text-white/70" />
      </button>

      {/* Avatar */}
      <Avatar
        initials={user.email?.charAt(0).toUpperCase()}
        alt={user.email || 'Usuario'}
        size="sm"
        className="bg-[#6c5ce7]/30 text-[#6c5ce7]"
      />

      {/* Logout button */}
      <button
        onClick={onLogout}
        className="flex items-center gap-1.5 text-[#b2bec3] hover:text-white cursor-pointer text-sm px-2 py-1.5 rounded-lg hover:bg-white/5 transition-colors shrink-0"
      >
        <LogOutIcon size={16} />
        <span className="hidden sm:inline">Salir</span>
      </button>
    </header>
  )
}
