/**
 * SQUAD UP - Componente RoomCard
 * Tarjeta individual de sala de juego
 */

import { UsersIcon } from '../ui/Icons'
import type { RoomWithData } from '../../services/room.service'

interface RoomCardProps {
  room: RoomWithData
  onClick?: (room: RoomWithData) => void
}

export function RoomCard({ room, onClick }: RoomCardProps) {
  // Obtener info del juego desde los datos de la sala
  const gameSlug = room.game_slug

  // Mapear slugs a imágenes
  const gameImages: Record<string, string> = {
    'league-of-legends': '/lol_logo.png',
    'valorant': '/valorant_logo.png',
    'world-of-warcraft': '/wow_logo.png',
    'apex-legends': '/apex_logo.png',
  }

  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault()
        onClick?.(room)
      }}
      className="flex items-start gap-6 h-auto min-h-[120px] p-6 bg-[#1e1e26] border-l-[10px] border-[#6c5ce7] rounded-2xl no-underline cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-[0px_8px_20px_0px_rgba(0,0,0,0.3)]"
    >
      {/* Avatar del host - 75x75 circular */}
      <div className="w-[75px] h-[75px] rounded-[87px] bg-[#d9d9d9] flex-shrink-0 flex items-center justify-center text-3xl text-[#6c5ce7] font-bold">
        {room.creator_name.charAt(0).toUpperCase()}
      </div>

      {/* Contenido de la sala */}
      <div className="flex-1 flex flex-col gap-2">
        {/* Título de la sala */}
        <span className="text-[#b2bec3] font-bold text-2xl text-left">
          {room.title}
        </span>

        {/* Info adicional */}
        <div className="flex items-center gap-4 flex-wrap">
          {/* Juego */}
          <div className="flex items-center gap-2">
            <img
              src={gameImages[gameSlug] || '/lol_logo.png'}
              alt={room.game_name}
              className="w-5 h-5 object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none'
              }}
            />
            <span className="text-sm text-[#636e72]">{room.game_name}</span>
          </div>

          {/* Rango */}
          {room.rank_required && (
            <span className="text-sm text-[#636e72] px-2 py-0.5 bg-[#121218] rounded">
              {room.rank_required}
            </span>
          )}

          {/* Jugadores */}
          <div className="flex items-center gap-1 text-sm text-[#636e72]">
            <UsersIcon size={14} />
            <span>{room.players.length}/{room.max_participants}</span>
          </div>

          {/* Host */}
          <span className="text-sm text-[#636e72]">
            por <span className="text-[#6c5ce7]">{room.creator_name}</span>
          </span>
        </div>

        {/* Roles buscados */}
        {room.role_required && (
          <div className="flex items-center gap-2 flex-wrap mt-1">
            {room.role_required.split(', ').map((role, index) => (
              <span
                key={index}
                className="text-xs px-2 py-0.5 bg-[#6c5ce7]/20 text-[#6c5ce7] rounded"
              >
                {role}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  )
}
