/**
 * SQUAD UP - Componente RoomsList
 * Lista de salas disponibles - Fiel al Figma
 */

import { RoomCard } from './RoomCard'
import { GamepadIcon } from '../ui/Icons'
import type { RoomWithData } from '../../services/room.service'

interface RoomsListProps {
  rooms: RoomWithData[]
  onSelectRoom?: (room: RoomWithData) => void
}

export function RoomsList({ rooms, onSelectRoom }: RoomsListProps) {
  // Estado vacío - no hay salas
  if (rooms.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center p-8">
        <div className="w-20 h-20 rounded-full bg-[#1e1e26] flex items-center justify-center">
          <GamepadIcon size={40} className="text-[#6c5ce7]" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-white">No hay salas disponibles</h3>
          <p className="text-[#b2bec3] text-sm max-w-sm">
            Sé el primero en crear una sala y encuentra compañeros de equipo para jugar.
          </p>
        </div>
      </div>
    )
  }

  // Lista de salas
  return (
    <div className="flex flex-col gap-5 h-full overflow-y-auto p-1">
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} onClick={onSelectRoom} />
      ))}
    </div>
  )
}
