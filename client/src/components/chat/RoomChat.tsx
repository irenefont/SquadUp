/**
 * SQUAD UP - Componente RoomChat con Persistencia
 * Chat específico de una sala con persistencia en Supabase
 * Combina Socket.io para tiempo real + Supabase para persistencia
 */

import { useState, useEffect, useRef } from 'react'
import type { User } from '@supabase/supabase-js'
import socket from '../../utils/socket'
import {
  getMessages,
  sendMessage,
  subscribeToMessages,
  type MessageWithData
} from '../../services/chat.service'

interface RoomChatProps {
  roomId: string
  user: User
}

export function RoomChatWithPersistence({ roomId, user }: RoomChatProps) {
  const [messages, setMessages] = useState<MessageWithData[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Cargar mensajes históricos
  useEffect(() => {
    const loadMessages = async () => {
      setIsLoading(true)
      const historicalMessages = await getMessages(roomId)
      setMessages(historicalMessages)
      setIsLoading(false)
    }

    loadMessages()
  }, [roomId])

  // Suscribirse a nuevos mensajes en tiempo real (Supabase Realtime)
  useEffect(() => {
    const unsubscribe = subscribeToMessages(roomId, (newMessage) => {
      setMessages((prev) => {
        // Evitar duplicados
        if (prev.some(m => m.id === newMessage.id)) {
          return prev
        }
        return [...prev, newMessage]
      })
    })

    return () => {
      unsubscribe()
    }
  }, [roomId])

  // También unirse al socket.io room para tiempo real adicional
  useEffect(() => {
    socket.emit('join-room', roomId)

    // Escuchar mensajes de otros clientes que aún usen socket.io
    socket.on('room-message', (message: { id: string; userId: string; username: string; content: string; timestamp: Date }) => {
      // Solo agregar si no es nuestro propio mensaje (para evitar duplicados)
      if (message.userId !== user.id) {
        setMessages((prev) => {
          // Evitar duplicados
          if (prev.some(m => m.content === message.content && m.user_id === message.userId)) {
            return prev
          }
          return [...prev, {
            id: message.id,
            room_id: roomId,
            user_id: message.userId,
            content: message.content,
            type: 'text' as const,
            created_at: new Date(message.timestamp).toISOString(),
            username: message.username
          }]
        })
      }
    })

    return () => {
      socket.emit('leave-room', roomId)
      socket.off('room-message')
    }
  }, [roomId, user.id])

  // Auto-scroll al final
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const content = inputValue.trim()

    // Obtener username para socket.io
    const getUsername = () => {
      const meta = user.user_metadata
      return meta?.display_name || meta?.username || meta?.full_name || meta?.name || user.email?.split('@')[0] || 'Usuario'
    }

    // Enviar a Supabase (persistencia)
    const savedMessage = await sendMessage({
      roomId,
      userId: user.id,
      content
    })

    if (savedMessage) {
      // Agregar el mensaje guardado a la lista
      setMessages((prev) => {
        if (prev.some(m => m.id === savedMessage.id)) {
          return prev
        }
        return [...prev, savedMessage]
      })
    }

    // También enviar por socket.io para clientes que no usen Supabase Realtime
    socket.emit('room-message', {
      roomId,
      message: {
        id: savedMessage?.id || crypto.randomUUID(),
        userId: user.id,
        username: getUsername(),
        content,
        timestamp: new Date()
      }
    })

    setInputValue('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
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
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-[#636e72] text-sm">Cargando mensajes...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-[#636e72] text-sm text-center">
              Sin mensajes aún. ¡Saluda a tu equipo!
            </p>
          </div>
        ) : (
          messages.map((msg) => {
            const isOwn = msg.user_id === user.id
            const isSystem = msg.type === 'system'
            return (
              <div
                key={msg.id}
                className={`flex flex-col gap-1 ${isSystem ? 'items-center' : isOwn ? 'items-end' : 'items-start'}`}
              >
                {isSystem ? (
                  <span className="text-[#636e72] text-xs italic text-center bg-[#1e1e26] px-3 py-1 rounded-lg">
                    {msg.content}
                  </span>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-semibold ${isOwn ? 'text-[#a29bfe]' : 'text-[#6c5ce7]'}`}>
                        {isOwn ? 'Tú' : msg.username}
                      </span>
                      <span className="text-[10px] text-[#636e72]">
                        {formatTime(msg.created_at)}
                      </span>
                    </div>
                    <span
                      className={`text-white text-sm px-3 py-2 rounded-xl max-w-[80%] break-words ${
                        isOwn
                          ? 'bg-[#6c5ce7] rounded-br-sm'
                          : 'bg-[#2d2d3a] rounded-bl-sm'
                      }`}
                    >
                      {msg.content}
                    </span>
                  </>
                )}
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

// Exportar también la versión original para compatibilidad
export { RoomChat } from './RoomChatLegacy'
