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
  selectedGameName?: string | null
}

export function RoomsList({ rooms, onSelectRoom, selectedGameName }: RoomsListProps) {
  // Estado vacío - no hay salas
  if (rooms.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center p-6">
        <div className="w-14 h-14 rounded-full bg-[#1e1e26] flex items-center justify-center">
          <GamepadIcon size={28} className="text-[#6c5ce7]" />
        </div>
        <div className="space-y-1">
          {selectedGameName ? (
            <>
              <h3 className="text-lg font-semibold text-white">
                No hay salas para {selectedGameName}
              </h3>
              <p className="text-[#b2bec3] text-sm max-w-sm">
                No hay salas disponibles para este juego. Sé el primero en crear una.
              </p>
            </>
          ) : (
            <>
              <h3 className="text-lg font-semibold text-white">No hay salas disponibles</h3>
              <p className="text-[#b2bec3] text-sm max-w-sm">
                Sé el primero en crear una sala y encuentra compañeros de equipo.
              </p>
            </>
          )}
        </div>
      </div>
    )
  }

  // Lista de salas con scroll interno
  return (
    <div className="flex-1 flex flex-col gap-2 overflow-y-auto pr-1 min-h-0">
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} onClick={onSelectRoom} />
      ))}
    </div>
  )
}
