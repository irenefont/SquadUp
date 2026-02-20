/**
 * SQUAD UP - Componente Dashboard
 * Vista principal del dashboard con persistencia en Supabase
 */

import { useState, useEffect, useCallback } from 'react'
import type { User } from '@supabase/supabase-js'
import { Navbar, GameSidebar } from '../layout'
import { ChatPanel } from '../chat'
import { RoomsList, RoomView, CreateRoomModal } from '../rooms'
import { RoomChatWithPersistence } from '../chat/RoomChat'
import {
  getRooms,
  createRoom,
  joinRoom,
  leaveRoom,
  subscribeToRooms,
  type RoomWithData
} from '../../services/room.service'
import type { CreateRoomData } from '../rooms/CreateRoomModal'

interface DashboardProps {
  user: User
  onLogout: () => void
}

type View = 'list' | 'room'

export function Dashboard({ user, onLogout }: DashboardProps) {
  const [currentView, setCurrentView] = useState<View>('list')
  const [selectedRoom, setSelectedRoom] = useState<RoomWithData | null>(null)
  const [isCreateRoomModalOpen, setIsCreateRoomModalOpen] = useState(false)
  const [rooms, setRooms] = useState<RoomWithData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isJoining, setIsJoining] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)

  // Cargar salas al montar el componente
  const loadRooms = useCallback(async () => {
    setIsLoading(true)
    const fetchedRooms = await getRooms({ status: 'active' })
    setRooms(fetchedRooms)

    // Si hay una sala seleccionada, actualizar sus datos
    if (selectedRoom) {
      const updatedRoom = fetchedRooms.find(r => r.id === selectedRoom.id)
      if (updatedRoom) {
        setSelectedRoom(updatedRoom)
      } else {
        // La sala ya no existe, volver a la lista
        setCurrentView('list')
        setSelectedRoom(null)
      }
    }

    setIsLoading(false)
  }, [selectedRoom])

  // Cargar salas al inicio
  useEffect(() => {
    loadRooms()
  }, [])

  // Suscribirse a cambios en tiempo real
  useEffect(() => {
    const unsubscribe = subscribeToRooms(() => {
      loadRooms()
    })

    return () => {
      unsubscribe()
    }
  }, [loadRooms])

  const handleSelectRoom = (room: RoomWithData) => {
    setSelectedRoom(room)
    setCurrentView('room')
  }

  const handleBackToList = () => {
    setSelectedRoom(null)
    setCurrentView('list')
  }

  const handleCreateRoom = async (roomData: CreateRoomData) => {
    // Mapear el ID del juego (desde mockData: 'lol', 'valorant', etc.) al UUID de la base de datos
    const gameMap: Record<string, string> = {
      'lol': 'd5432591-2266-4b5e-ba86-aa3943f671df',           // League of Legends
      'valorant': 'f3a9286d-4bac-4e6b-9ff5-5f8ea58c1b1f',      // Valorant
      'wow': '12921437-d08a-496b-ab7c-f7b07bab49e8',           // World of Warcraft
      'apex': '00a8f02f-10c8-4571-a7c3-9e817701ec3b',          // Apex Legends
    }

    const gameId = gameMap[roomData.game]
    if (!gameId) {
      alert('Juego no válido')
      return
    }

    const newRoom = await createRoom({
      title: roomData.title,
      game_id: gameId,
      description: roomData.description,
      max_participants: roomData.maxPlayers,
      rank_required: roomData.rank === 'Sin rango' ? undefined : roomData.rank,
      role_required: roomData.roles.length > 0 ? roomData.roles.join(', ') : undefined,
      creator_id: user.id
    })

    if (newRoom) {
      // Cerrar el modal
      setIsCreateRoomModalOpen(false)

      // El host entra automáticamente a la sala
      setSelectedRoom(newRoom)
      setCurrentView('room')

      // Recargar las salas
      loadRooms()
    } else {
      alert('Error al crear la sala')
    }
  }

  // Unirse a una sala
  const handleJoinRoom = async (room: RoomWithData) => {
    // Verificar si ya está unido
    if (room.players.some((p) => p.user_id === user.id)) {
      return
    }

    // Verificar si hay espacio
    if (room.players.length >= room.max_participants) {
      alert('La sala está llena')
      return
    }

    setIsJoining(true)

    const result = await joinRoom(room.id, user.id)

    setIsJoining(false)

    if (result.success && result.room) {
      setSelectedRoom(result.room)
      // Recargar las salas para actualizar la lista
      loadRooms()
    } else {
      alert(result.error || 'Error al unirse a la sala')
    }
  }

  // Salir de una sala
  const handleLeaveRoom = async (room: RoomWithData) => {
    setIsLeaving(true)

    const result = await leaveRoom(room.id, user.id)

    setIsLeaving(false)

    if (result.success) {
      // Volver a la lista
      setSelectedRoom(null)
      setCurrentView('list')
      // Recargar las salas
      loadRooms()
    } else {
      alert(result.error || 'Error al salir de la sala')
    }
  }

  // Verificar si el usuario está unido a la sala actual
  const isUserInRoom = selectedRoom?.players.some((p) => p.user_id === user.id) ?? false
  const isUserHost = selectedRoom?.players.find((p) => p.user_id === user.id)?.isHost ?? false

  // Convertir RoomWithData al formato esperado por RoomView para compatibilidad
  const adaptedRoom = selectedRoom ? {
    ...selectedRoom,
    game: selectedRoom.game_name,
    maxPlayers: selectedRoom.max_participants,
    rank: selectedRoom.rank_required || 'Sin rango',
    roles: selectedRoom.role_required ? selectedRoom.role_required.split(', ') : [],
    host: selectedRoom.creator_name,
    hostEmail: '',
    createdAt: new Date(selectedRoom.created_at),
    players: selectedRoom.players.map(p => ({
      id: p.id,
      name: p.name,
      email: '',
      isHost: p.isHost
    }))
  } : null

  return (
    <div className="min-h-screen bg-[#121218] flex flex-col">
      {/* NAVBAR */}
      <div className="px-4 pt-4">
        <Navbar
          user={user}
          onLogout={onLogout}
          onCreateRoom={() => setIsCreateRoomModalOpen(true)}
        />
      </div>

      {/* CONTENEDOR PRINCIPAL */}
      <div className="flex flex-1 gap-3 p-4 items-stretch">
        {/* SIDEBAR - Juegos - 250px */}
        <aside className="w-64 shrink-0 hidden md:flex">
          <GameSidebar />
        </aside>

        {/* CONTENIDO PRINCIPAL */}
        <main className="flex-1 min-w-0 flex flex-col">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-[#b2bec3]">Cargando salas...</div>
            </div>
          ) : currentView === 'list' ? (
            <RoomsList rooms={rooms} onSelectRoom={handleSelectRoom} />
          ) : (
            selectedRoom && adaptedRoom && (
              <RoomView
                room={adaptedRoom}
                user={user}
                onBack={handleBackToList}
                isUserInRoom={isUserInRoom}
                isUserHost={isUserHost}
                onJoinRoom={() => handleJoinRoom(selectedRoom)}
                onLeaveRoom={() => handleLeaveRoom(selectedRoom)}
                isJoining={isJoining}
                isLeaving={isLeaving}
              >
                {/* Chat con persistencia - solo si está unido */}
                {isUserInRoom && (
                  <RoomChatWithPersistence
                    roomId={selectedRoom.id}
                    user={user}
                  />
                )}
              </RoomView>
            )
          )}
        </main>

        {/* PANEL DE CHAT GLOBAL - 264px - solo visible en lista */}
        {currentView === 'list' && (
          <aside className="w-64 shrink-0 hidden xl:flex">
            <ChatPanel user={user} />
          </aside>
        )}
      </div>

      {/* MODAL CREAR SALA */}
      <CreateRoomModal
        isOpen={isCreateRoomModalOpen}
        onClose={() => setIsCreateRoomModalOpen(false)}
        onSubmit={handleCreateRoom}
      />
    </div>
  )
}
