/**
 * SQUAD UP - Componente RoomView
 * Vista detallada de una sala de juego - Basado en Figma
 * Mitad superior: detalles y jugadores
 * Mitad inferior: chat de sala (pasado como children)
 */

import type { User } from '@supabase/supabase-js'
import { GAMES } from '../../data/mockData'

// Tipo local para compatibilidad con el componente
interface LocalRoomWithPlayers {
  id: string
  title: string
  game: string
  description?: string
  maxPlayers: number
  rank: string
  roles: string[]
  host: string
  hostEmail: string
  createdAt: Date
  players: Array<{
    id: string
    name: string
    email: string
    isHost: boolean
  }>
}

interface RoomViewProps {
  room: LocalRoomWithPlayers
  user: User
  onBack: () => void
  isUserInRoom: boolean
  isUserHost: boolean
  onJoinRoom: () => void
  onLeaveRoom: () => void
  isJoining?: boolean
  isLeaving?: boolean
  children?: React.ReactNode
}

export function RoomView({
  room,
  user,
  onBack,
  isUserInRoom,
  isUserHost,
  onJoinRoom,
  onLeaveRoom,
  isJoining = false,
  isLeaving = false,
  children,
}: RoomViewProps) {
  const gameInfo = GAMES.find((g) => g.id === room.game)
  const playerCount = room.players.length
  const isFull = playerCount >= room.maxPlayers

  return (
    <div className="flex flex-col h-full bg-[#1e1e26] rounded-2xl overflow-hidden">
      {/* ============ MITAD SUPERIOR: DETALLES Y JUGADORES ============ */}
      <div className="flex-1 flex flex-col gap-6 p-8 overflow-y-auto">
        {/* Título y detalles */}
        <div className="flex flex-col gap-2">
          <h1 className="text-[#b2bec3] font-bold text-3xl">
            {room.title}
          </h1>
          <p className="text-[#636e72] text-sm">
            Host: <span className="text-[#6c5ce7]">{room.host}</span>
            {gameInfo && ` | ${gameInfo.name}`}
            {room.rank !== 'Sin rango' && ` | ${room.rank}`}
          </p>
        </div>

        {/* Estado de la sala */}
        <div className="flex items-center gap-3 bg-[rgba(18,18,24,0.5)] px-4 py-3 rounded-xl w-fit">
          <div className={`w-3.5 h-3.5 rounded-full ${isFull ? 'bg-[#ff7675]' : 'bg-[#00e0a6]'}`} />
          <span className="text-[#b2bec3] font-bold text-sm">
            Estado: {isFull ? 'Sala llena' : 'Esperando jugadores...'} ({playerCount}/{room.maxPlayers})
          </span>
        </div>

        {/* Contenido principal: Jugadores + Detalles */}
        <div className="flex flex-1 gap-5">
          {/* Grid de jugadores */}
          <div className="flex-1">
            <div className="grid grid-cols-3 gap-4 auto-rows-fr">
              {/* Jugadores unidos */}
              {room.players.map((player) => (
                <PlayerSlot
                  key={player.id}
                  name={player.name}
                  isHost={player.isHost}
                  isCurrentUser={player.id === user.id}
                />
              ))}
              {/* Slots vacíos */}
              {Array.from({ length: room.maxPlayers - playerCount }).map((_, i) => (
                <EmptySlot key={`empty-${i}`} />
              ))}
            </div>
          </div>

          {/* Panel de detalles */}
          <div className="w-60 bg-[#121218] rounded-xl p-4 flex flex-col gap-4">
            <h3 className="text-[#b2bec3] font-bold text-base">
              Detalles de la sala
            </h3>

            {/* Juego */}
            {gameInfo && (
              <div className="flex items-center gap-3">
                <img src={gameInfo.image || ''} alt={gameInfo.name} className="w-10 h-10 object-contain" />
                <div>
                  <p className="text-[#636e72] text-xs">Juego</p>
                  <p className="text-white text-sm font-medium">{gameInfo.name}</p>
                </div>
              </div>
            )}

            {/* Rango */}
            {room.rank !== 'Sin rango' && (
              <div>
                <p className="text-[#636e72] text-xs">Rango mínimo</p>
                <p className="text-white text-sm font-medium">{room.rank}</p>
              </div>
            )}

            {/* Roles buscados */}
            {room.roles.length > 0 && (
              <div>
                <p className="text-[#636e72] text-xs mb-2">Roles buscados</p>
                <div className="flex flex-wrap gap-1">
                  {room.roles.map((role) => (
                    <span
                      key={role}
                      className="text-xs px-2 py-0.5 bg-[#6c5ce7]/20 text-[#6c5ce7] rounded"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Descripción */}
            {room.description && (
              <div className="flex-1">
                <p className="text-[#636e72] text-xs mb-1">Descripción</p>
                <p className="text-white text-sm">{room.description}</p>
              </div>
            )}
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex gap-12 justify-center py-2">
          {!isUserInRoom ? (
            // No está en la sala - Botón unirse
            <button
              onClick={onJoinRoom}
              disabled={isFull || isJoining}
              className={`flex-1 max-w-xs h-14 rounded-full font-bold text-white transition-all ${
                isFull || isJoining
                  ? 'bg-[#636e72] cursor-not-allowed'
                  : 'bg-[#00e0a6] hover:bg-[#00c896] cursor-pointer'
              }`}
            >
              {isJoining ? 'Uniéndose...' : isFull ? 'Sala llena' : 'Unirse a la sala'}
            </button>
          ) : isUserHost ? (
            // Es el host - Botón iniciar partida
            <button
              className="flex-1 max-w-xs h-14 rounded-full font-bold text-white bg-[#00e0a6] hover:bg-[#00c896] cursor-pointer transition-all"
            >
              Iniciar partida
            </button>
          ) : (
            // Está en la sala pero no es host - Botón salir
            <button
              onClick={onLeaveRoom}
              disabled={isLeaving}
              className={`flex-1 max-w-xs h-14 rounded-full font-bold text-white transition-all ${
                isLeaving
                  ? 'bg-[#636e72] cursor-not-allowed'
                  : 'bg-[#ff7675] hover:bg-[#ff6b6b] cursor-pointer'
              }`}
            >
              {isLeaving ? 'Saliendo...' : 'Salir de la sala'}
            </button>
          )}

          {/* Botón cancelar/volver */}
          <button
            onClick={onBack}
            className="flex-1 max-w-xs h-14 rounded-full font-bold text-white bg-[#ff7675] hover:bg-[#ff6b6b] cursor-pointer transition-all"
          >
            {isUserHost ? 'Cancelar sala' : 'Volver'}
          </button>
        </div>
      </div>

      {/* ============ MITAD INFERIOR: CHAT DE SALA ============ */}
      <div className="h-[280px] border-t border-[#2d2d3a]">
        {isUserInRoom ? (
          children || (
            <div className="h-full flex items-center justify-center">
              <p className="text-[#636e72] text-sm">Chat no disponible</p>
            </div>
          )
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-[#636e72] text-sm">
              Únete a la sala para participar en el chat
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// Componente para slot de jugador
function PlayerSlot({
  name,
  isHost,
  isCurrentUser,
}: {
  name: string
  isHost?: boolean
  isCurrentUser?: boolean
}) {
  return (
    <div className="bg-[#121218] rounded-xl p-3 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        {isHost && (
          <span className="text-[#636e72] text-xs font-bold">Host</span>
        )}
        {isCurrentUser && (
          <span className="text-[#6c5ce7] text-xs font-bold">Tú</span>
        )}
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-2">
        <div className="w-12 h-12 rounded-full bg-[#d9d9d9] flex items-center justify-center text-[#6c5ce7] font-bold text-lg">
          {name.charAt(0).toUpperCase()}
        </div>
        <span className="text-white text-sm font-medium">{name}</span>
      </div>
    </div>
  )
}

// Componente para slot vacío
function EmptySlot() {
  return (
    <div className="bg-[#121218] rounded-xl p-3 flex flex-col items-center justify-center gap-2 border border-dashed border-[#2d2d3a]">
      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-[#636e72] text-lg">
        ?
      </div>
      <span className="text-[#636e72] text-sm">Esperando...</span>
    </div>
  )
}
