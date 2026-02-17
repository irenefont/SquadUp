/**
 * SQUAD UP - Componente RoomsList
 * Lista de salas disponibles - Fiel al Figma
 */

import { ROOMS, type Room } from '../../data/mockData'
import { RoomCard } from './RoomCard'

interface RoomsListProps {
  onSelectRoom?: (room: Room) => void
}

export function RoomsList({ onSelectRoom }: RoomsListProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        height: '100%',
        overflowY: 'auto',
      }}
    >
      {ROOMS.map((room) => (
        <RoomCard key={room.id} room={room} onClick={onSelectRoom} />
      ))}
    </div>
  )
}
