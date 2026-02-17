/**
 * SQUAD UP - Componente RoomCard
 * Tarjeta individual de sala de juego
 */

import type { Room } from '../../data/mockData'

interface RoomCardProps {
  room: Room
  onClick?: (room: Room) => void
}

export function RoomCard({ room, onClick }: RoomCardProps) {
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault()
        onClick?.(room)
      }}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 24,
        height: 175,
        padding: 24,
        backgroundColor: '#1e1e26',
        borderLeft: '10px solid #6c5ce7',
        borderRadius: 16,
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = '0px 8px 20px 0px rgba(0, 0, 0, 0.3)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Avatar del host - 75x75 circular */}
      <div
        style={{
          width: 75,
          height: 75,
          borderRadius: 87,
          backgroundColor: '#d9d9d9',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 28,
        }}
      >
        👤
      </div>
      {/* Título de la sala */}
      <span
        style={{
          color: '#b2bec3',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 700,
          fontSize: 26,
          textAlign: 'left',
        }}
      >
        {room.title}
      </span>
    </a>
  )
}
