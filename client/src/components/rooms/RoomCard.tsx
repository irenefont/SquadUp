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
      className="flex items-center gap-4 p-4 bg-[#1e1e26] border-l-4 border-[#6c5ce7] rounded-xl no-underline cursor-pointer transition-all hover:bg-[#252530] hover:border-[#00e0a6]"
    >
      {/* Avatar del host */}
      <div className="w-10 h-10 rounded-full bg-[#6c5ce7]/20 flex-shrink-0 flex items-center justify-center text-lg text-[#6c5ce7] font-bold">
        {room.creator_name.charAt(0).toUpperCase()}
      </div>

      {/* Contenido de la sala */}
      <div className="flex-1 flex flex-col gap-1 min-w-0">
        {/* Título de la sala */}
        <span className="text-white font-semibold text-base truncate">
          {room.title}
        </span>

        {/* Info adicional */}
        <div className="flex items-center gap-3 flex-wrap text-xs">
          {/* Juego */}
          <div className="flex items-center gap-1.5">
            <img
              src={gameImages[gameSlug] || '/lol_logo.png'}
              alt={room.game_name}
              className="w-4 h-4 object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none'
              }}
            />
            <span className="text-[#636e72]">{room.game_name}</span>
          </div>

          {/* Rango */}
          {room.rank_required && (
            <span className="text-[#636e72] px-1.5 py-0.5 bg-[#121218] rounded">
              {room.rank_required}
            </span>
          )}

          {/* Jugadores */}
          <div className="flex items-center gap-1 text-[#636e72]">
            <UsersIcon size={12} />
            <span>{room.players.length}/{room.max_participants}</span>
          </div>

          {/* Host */}
          <span className="text-[#636e72]">
            por <span className="text-[#6c5ce7]">{room.creator_name}</span>
          </span>
        </div>

        {/* Roles buscados */}
        {room.role_required && (
          <div className="flex items-center gap-1.5 flex-wrap mt-0.5">
            {room.role_required.split(', ').map((role, index) => (
              <span
                key={index}
                className="text-[10px] px-1.5 py-0.5 bg-[#6c5ce7]/20 text-[#6c5ce7] rounded"
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
