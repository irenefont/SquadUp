/**
 * SQUAD UP - Componente Dashboard
 * ==============================
 *
 * Vista principal del dashboard después del login.
 * Coordina todos los componentes principales de la aplicación.
 *
 * ESTRUCTURA:
 * ┌─────────────────────────────────────────┐
 * │              NAVBAR                      │
 * ├─────────┬─────────────────┬─────────────┤
 * │ SIDEBAR │   CONTENIDO     │  CHAT       │
 * │ Juegos  │   PRINCIPAL     │  GLOBAL     │
 * │         │   (Salas/Room)  │             │
 * └─────────┴─────────────────┴─────────────┘
 *
 * FUNCIONALIDADES:
 * - Listar salas con filtros por juego
 * - Crear nuevas salas
 * - Unirse/salir de salas
 * - Ver detalles de sala
 * - Chat global (Socket.io)
 * - Chat de sala (Supabase Realtime)
 *
 * @module components/common/Dashboard
 * @author Squad Up Team
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
  deleteRoom,
  subscribeToRooms,
  type RoomWithData
} from '../../services/room.service'
import { getGames, type GameWithDetails } from '../../services/game.service'
import type { CreateRoomData } from '../rooms/CreateRoomModal'

interface DashboardProps {
  /** Usuario autenticado actual */
  user: User
  /** Callback para cerrar sesión */
  onLogout: () => void
}

/** Tipo de vista actual */
type View = 'list' | 'room'

export function Dashboard({ user, onLogout }: DashboardProps) {
  const [currentView, setCurrentView] = useState<View>('list')
  const [selectedRoom, setSelectedRoom] = useState<RoomWithData | null>(null)
  const [isCreateRoomModalOpen, setIsCreateRoomModalOpen] = useState(false)
  const [rooms, setRooms] = useState<RoomWithData[]>([])
  const [games, setGames] = useState<GameWithDetails[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isJoining, setIsJoining] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null)

  // Obtener el nombre del juego seleccionado desde los datos de la BD
  const selectedGameName = selectedGameId
    ? games.find(g => g.id === selectedGameId)?.name || null
    : null

  // Filtrar salas según el juego seleccionado (usando UUID directamente)
  const filteredRooms = selectedGameId
    ? rooms.filter(room => room.game_id === selectedGameId)
    : rooms

  // Cargar juegos desde la base de datos
  const loadGames = useCallback(async () => {
    const fetchedGames = await getGames()
    setGames(fetchedGames)
  }, [])

  // Cargar salas al montar el componente
  const loadRooms = useCallback(async () => {
    setIsLoading(true)
    const fetchedRooms = await getRooms({ status: 'active' })
    setRooms(fetchedRooms)
    setIsLoading(false)
  }, [])

  // Actualizar sala seleccionada cuando cambian las salas
  useEffect(() => {
    if (selectedRoom) {
      const updatedRoom = rooms.find(r => r.id === selectedRoom.id)
      if (updatedRoom) {
        setSelectedRoom(updatedRoom)
      } else if (rooms.length > 0) {
        // La sala ya no existe, volver a la lista
        setCurrentView('list')
        setSelectedRoom(null)
      }
    }
  }, [rooms, selectedRoom?.id])

  // Cargar juegos y salas al inicio
  useEffect(() => {
    loadGames()
    loadRooms()
  }, [loadGames, loadRooms])

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
    // roomData.gameId ya es el UUID de la base de datos
    const newRoom = await createRoom({
      title: roomData.title,
      game_id: roomData.gameId,
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

  // Eliminar/disolver una sala (solo host)
  const handleDeleteRoom = async (room: RoomWithData) => {
    setIsDeleting(true)

    const result = await deleteRoom(room.id, user.id)

    setIsDeleting(false)

    if (result.success) {
      // Volver a la lista
      setSelectedRoom(null)
      setCurrentView('list')
      // Recargar las salas
      loadRooms()
    } else {
      alert(result.error || 'Error al eliminar la sala')
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
    <div className="h-screen bg-[#121218] flex flex-col overflow-hidden">
      {/* NAVBAR */}
      <div className="px-3 pt-3 shrink-0">
        <Navbar
          user={user}
          onLogout={onLogout}
          onCreateRoom={() => setIsCreateRoomModalOpen(true)}
        />
      </div>

      {/* CONTENEDOR PRINCIPAL */}
      <div className="flex flex-1 gap-2 p-3 items-stretch min-h-0">
        {/* SIDEBAR - Juegos */}
        <aside className="w-52 shrink-0 hidden md:flex">
          <GameSidebar
            games={games}
            selectedGameId={selectedGameId}
            onGameSelect={setSelectedGameId}
          />
        </aside>

        {/* CONTENIDO PRINCIPAL */}
        <main className="flex-1 min-w-0 flex flex-col min-h-0">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-[#b2bec3]">Cargando salas...</div>
            </div>
          ) : currentView === 'list' ? (
            <RoomsList
              rooms={filteredRooms}
              onSelectRoom={handleSelectRoom}
              selectedGameName={selectedGameName}
            />
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
                onDeleteRoom={() => handleDeleteRoom(selectedRoom)}
                isJoining={isJoining}
                isLeaving={isLeaving}
                isDeleting={isDeleting}
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

        {/* PANEL DE CHAT GLOBAL - solo visible en lista */}
        {currentView === 'list' && (
          <aside className="w-56 shrink-0 hidden xl:flex">
            <ChatPanel user={user} />
          </aside>
        )}
      </div>

      {/* MODAL CREAR SALA */}
      <CreateRoomModal
        isOpen={isCreateRoomModalOpen}
        onClose={() => setIsCreateRoomModalOpen(false)}
        onSubmit={handleCreateRoom}
        games={games}
      />
    </div>
  )
}
