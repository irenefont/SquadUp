/**
 * SQUAD UP - Componente Dashboard
 * Vista principal del dashboard - Fiel al Figma
 */

import { useState } from 'react'
import type { User } from '@supabase/supabase-js'
import { Navbar, GameSidebar } from '../layout'
import { ChatPanel } from '../chat'
import { RoomsList, RoomView } from '../rooms'
import type { Room } from '../../data/mockData'

interface DashboardProps {
  user: User
  onLogout: () => void
}

type View = 'list' | 'room'

export function Dashboard({ user, onLogout }: DashboardProps) {
  const [currentView, setCurrentView] = useState<View>('list')
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)

  const handleSelectRoom = (room: Room) => {
    setSelectedRoom(room)
    setCurrentView('room')
  }

  const handleBackToList = () => {
    setSelectedRoom(null)
    setCurrentView('list')
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-bg-primary)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* NAVBAR */}
      <div style={{ padding: '16px 16px 0 16px' }}>
        <Navbar user={user} onLogout={onLogout} />
      </div>

      {/* CONTENEDOR PRINCIPAL */}
      <div
        style={{
          display: 'flex',
          flex: 1,
          gap: 12,
          padding: 16,
          alignItems: 'stretch',
        }}
      >
        {/* SIDEBAR - Juegos - 250px */}
        <aside
          style={{
            width: 250,
            flexShrink: 0,
            display: 'flex',
          }}
          className="hidden md:flex"
        >
          <GameSidebar />
        </aside>

        {/* CONTENIDO PRINCIPAL */}
        <main style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          {currentView === 'list' ? (
            <RoomsList onSelectRoom={handleSelectRoom} />
          ) : (
            selectedRoom && (
              <RoomView room={selectedRoom} onBack={handleBackToList} />
            )
          )}
        </main>

        {/* PANEL DE CHAT - 264px */}
        <aside
          style={{
            width: 264,
            flexShrink: 0,
            display: 'flex',
          }}
          className="hidden xl:flex"
        >
          <ChatPanel user={user} />
        </aside>
      </div>
    </div>
  )
}
