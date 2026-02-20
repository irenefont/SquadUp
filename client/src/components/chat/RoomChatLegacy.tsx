/**
 * SQUAD UP - Componente RoomChat (Legacy)
 * Chat específico de una sala usando solo Socket.io Rooms
 * Versión sin persistencia - mantener para referencia
 */

import { useState, useEffect, useRef } from 'react'
import type { User } from '@supabase/supabase-js'
import socket from '../../utils/socket'

interface RoomChatMessage {
  id: string
  userId: string
  username: string
  content: string
  timestamp: Date
}

interface RoomChatProps {
  roomId: string
  user: User
}

export function RoomChat({ roomId, user }: RoomChatProps) {
  const [messages, setMessages] = useState<RoomChatMessage[]>([])
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Unirse a la sala y escuchar mensajes
  useEffect(() => {
    socket.emit('join-room', roomId)

    socket.on('room-message', (message: RoomChatMessage) => {
      setMessages((prev) => [...prev, message])
    })

    return () => {
      socket.emit('leave-room', roomId)
      socket.off('room-message')
    }
  }, [roomId])

  // Auto-scroll al final
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const getUsername = () => {
      const meta = user.user_metadata
      return meta?.display_name || meta?.username || meta?.full_name || meta?.name || user.email?.split('@')[0] || 'Usuario'
    }

    const message: RoomChatMessage = {
      id: crypto.randomUUID(),
      userId: user.id,
      username: getUsername(),
      content: inputValue.trim(),
      timestamp: new Date(),
    }

    socket.emit('room-message', { roomId, message })
    setInputValue('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="h-full flex flex-col bg-transparent">
      {/* Header del chat */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[#2d2d3a]">
        <span className="text-[#6c5ce7] text-lg">💬</span>
        <h3 className="text-[#b2bec3] font-bold text-sm">
          Chat de la sala
        </h3>
      </div>

      {/* Mensajes */}
      <div className="flex-1 flex flex-col overflow-y-auto p-4 gap-2 min-h-0">
        {messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-[#636e72] text-sm text-center">
              Sin mensajes aún. ¡Saluda a tu equipo!
            </p>
          </div>
        ) : (
          messages.map((msg) => {
            const isOwn = msg.userId === user.id
            return (
              <div
                key={msg.id}
                className={`flex flex-col gap-1 ${isOwn ? 'items-end' : 'items-start'}`}
              >
                <span className={`text-xs font-semibold ${isOwn ? 'text-[#a29bfe]' : 'text-[#6c5ce7]'}`}>
                  {isOwn ? 'Tú' : msg.username}
                </span>
                <span
                  className={`text-white text-sm px-3 py-2 rounded-xl max-w-[80%] break-words ${
                    isOwn
                      ? 'bg-[#6c5ce7] rounded-br-sm'
                      : 'bg-[#2d2d3a] rounded-bl-sm'
                  }`}
                >
                  {msg.content}
                </span>
              </div>
            )
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input del chat */}
      <div className="p-3 border-t border-[#2d2d3a]">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Escribe un mensaje..."
          className="w-full px-4 py-2.5 bg-[#121218] border-none rounded-lg text-white text-sm placeholder:text-[#636e72] focus:outline-none focus:ring-2 focus:ring-[#6c5ce7]"
        />
      </div>
    </div>
  )
}
