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
    <header className="flex items-center gap-6 h-20 w-full px-6 py-3 bg-[#1e1e26] rounded-xl shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)] opacity-80">
      {/* Logo - 64x64 */}
      <div className="w-16 h-16 shrink-0 flex items-center justify-center">
        <SquadUpLogo size={56} className="text-[#6c5ce7]" />
      </div>

      {/* SearchBar */}
      <div className="flex-1 flex items-center gap-3 h-full bg-[#121218] rounded-full p-2.5 hover:bg-[#121218]/80 transition-colors cursor-pointer">
        <SearchIcon size={24} className="text-white shrink-0" />
        <span className="text-white text-base">
          Buscar salas...
        </span>
      </div>

      {/* Botón Crear Sala */}
      <button
        onClick={onCreateRoom}
        className="flex items-center gap-2 px-4 py-2 bg-[#6c5ce7] hover:bg-[rgba(108,92,231,0.8)] text-white font-semibold text-sm rounded-xl transition-all duration-200 hover:scale-105"
      >
        <PlusIcon size={18} />
        <span className="hidden sm:inline">Crear sala</span>
      </button>

      {/* Bell Icon */}
      <button className="p-0 flex items-center justify-center hover:opacity-70 transition-opacity">
        <BellIcon size={24} className="text-white" />
      </button>

      {/* Avatar */}
      <Avatar
        initials={user.email?.charAt(0).toUpperCase()}
        alt={user.email || 'Usuario'}
        size="md"
        className="bg-[#d9d9d9]/75 opacity-80"
      />

      {/* Logout button */}
      <button
        onClick={onLogout}
        className="flex items-center gap-2 text-[#b2bec3] hover:text-white cursor-pointer text-sm px-3 py-2 rounded-lg transition-colors shrink-0"
      >
        <LogOutIcon size={16} />
        <span className="hidden sm:inline">Salir</span>
      </button>
    </header>
  )
}
