/**
 * SQUAD UP - Componente ChatPanel
 * Chat general con WebSocket usando Socket.io
 *
 * FLUJO DE MENSAJES:
 * ┌─────────────────────────────────────────────────────────────────┐
 * │  CLIENTE A (envía)                                              │
 * │  ┌─────────────────┐                                            │
 * │  │ handleSendMsg() │────┐                                       │
 * │  └─────────────────┘    │                                       │
 * │                         ▼                                       │
 * │              socket.emit('message', data)                       │
 * │                         │                                       │
 * │                         ▼                                       │
 * │  ┌─────────────────────────────────────────┐                    │
 * │  │           SERVIDOR SOCKET.IO             │                    │
 * │  │  socket.on('message') → io.emit('message')│                   │
 * │  │  (recibe de uno, reenvía a todos)        │                    │
 * │  └─────────────────────────────────────────┘                    │
 * │                         │                                       │
 * │              ┌──────────┴──────────┐                            │
 * │              ▼                     ▼                            │
 * │  ┌───────────────────┐  ┌───────────────────┐                   │
 * │  │ CLIENTE A         │  │ CLIENTE B         │                   │
 * │  │ socket.on('msg')  │  │ socket.on('msg')  │                   │
 * │  │ setMessages()     │  │ setMessages()     │                   │
 * │  └───────────────────┘  └───────────────────┘                   │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * EVENTOS SOCKET.IO:
 * - socket.emit('evento', datos)  → ENVÍA un evento al servidor
 * - socket.on('evento', callback) → ESCUCHA eventos del servidor
 * - io.emit('evento', datos)      → El servidor envía a TODOS los clientes
 * - socket.broadcast.emit()       → El servidor envía a todos EXCEPTO al emisor
 */

import { useState, useEffect, useRef } from 'react'
import type { User } from '@supabase/supabase-js'
import socket from '../../utils/socket'

/**
 * Estructura de un mensaje de chat
 */
interface ChatMessage {
  id: string        // Identificador único (UUID)
  userId: string    // ID del usuario que envía (de Supabase Auth)
  username: string  // Nombre para mostrar
  content: string   // Contenido del mensaje
  timestamp: Date   // Fecha y hora de envío
}

interface ChatPanelProps {
  user: User  // Usuario autenticado (viene de Supabase)
}

export function ChatPanel({ user }: ChatPanelProps) {
  // Estado para almacenar todos los mensajes del chat
  const [messages, setMessages] = useState<ChatMessage[]>([])

  // Estado para el texto del input
  const [inputValue, setInputValue] = useState('')

  // Referencia al final de la lista de mensajes (para auto-scroll)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  /**
   * SUSCRIPCIÓN A EVENTOS DEL SERVIDOR
   *
   * socket.on('message', callback) → Registra un listener para el evento 'message'
   * Cuando el servidor envía un mensaje (io.emit), todos los clientes conectados
   * lo reciben y ejecutan este callback.
   *
   * El return con socket.off() es CRUCIAL: limpia el listener cuando el
   * componente se desmonta, evitando memory leaks y listeners duplicados.
   */
  useEffect(() => {
    socket.on('message', (message: ChatMessage) => {
      // Añadimos el nuevo mensaje al array preservando los anteriores
      setMessages((prev) => [...prev, message])
    })

    // Cleanup: eliminar listener al desmontar el componente
    return () => {
      socket.off('message')
    }
  }, [])

  /**
   * AUTO-SCROLL
   * Cada vez que llegan mensajes nuevos, hacemos scroll al final
   * para mostrar los mensajes más recientes.
   */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  /**
   * ENVÍO DE MENSAJES
   *
   * Flujo:
   * 1. Validar que el input no esté vacío
   * 2. Construir el objeto mensaje con datos del usuario
   * 3. Enviar al servidor con socket.emit()
   * 4. Limpiar el input
   *
   * NOTA: No añadimos el mensaje localmente aquí. El servidor lo
   * reenviará con io.emit() y llegará por el socket.on() de arriba.
   * Esto asegura que todos los clientes vean los mensajes en el mismo orden.
   */
  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    /**
     * Obtener nombre de usuario con prioridad:
     * 1. display_name → Nombre configurado en el registro (email/contraseña)
     * 2. username → Username del registro
     * 3. full_name → Nombre de Google OAuth
     * 4. name → Alternativa de algunos proveedores OAuth
     * 5. 'Usuario' → Fallback por defecto
     */
    const getUsername = () => {
      const meta = user.user_metadata
      return meta?.display_name || meta?.username || meta?.full_name || meta?.name || 'Usuario'
    }

    // Construir el mensaje
    const message: ChatMessage = {
      id: crypto.randomUUID(),              // ID único del mensaje
      userId: user.id,                      // ID del usuario autenticado
      username: getUsername(),              // Nombre para mostrar
      content: inputValue.trim(),           // Texto del mensaje (sin espacios extra)
      timestamp: new Date(),                // Fecha actual
    }

    // Enviar mensaje al servidor Socket.io
    socket.emit('message', message)

    // Limpiar input después de enviar
    setInputValue('')
  }

  /**
   * ENVÍO CON TECLA ENTER
   * Permite enviar mensajes presionando Enter (sin Shift)
   * Shift+Enter permite saltos de línea (si se implementa textarea)
   */
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()  // Evita salto de línea
      handleSendMessage()
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        backgroundColor: '#1e1e26',
        borderRadius: 32,
        overflow: 'hidden',
        minHeight: 0,
      }}
    >
      {/* Header del Chat */}
      <div
        style={{
          padding: 24,
          borderBottom: '1px solid #5c5a5a',
          flexShrink: 0,
        }}
      >
        <h3
          style={{
            color: '#b2bec3',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 700,
            fontSize: 24,
            margin: 0,
          }}
        >
          Chat
        </h3>
      </div>

      {/* Lista de mensajes */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          minHeight: 0,
        }}
      >
        {messages.length === 0 ? (
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#636e72',
              fontSize: 14,
              textAlign: 'center',
            }}
          >
            No hay mensajes aún...
          </div>
        ) : (
          messages.map((msg) => {
            const isOwn = msg.userId === user.id
            return (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                  alignItems: isOwn ? 'flex-end' : 'flex-start',
                }}
              >
                <span
                  style={{
                    color: isOwn ? '#a29bfe' : '#6c5ce7',
                    fontSize: 11,
                    fontWeight: 600,
                    marginRight: isOwn ? 4 : 0,
                    marginLeft: isOwn ? 0 : 4,
                  }}
                >
                  {isOwn ? 'Tú' : msg.username}
                </span>
                <span
                  style={{
                    color: '#ffffff',
                    fontSize: 14,
                    padding: '8px 12px',
                    backgroundColor: isOwn ? '#6c5ce7' : '#2d2d3a',
                    borderRadius: 12,
                    borderBottomRightRadius: isOwn ? 4 : 12,
                    borderBottomLeftRadius: isOwn ? 12 : 4,
                    maxWidth: '80%',
                    wordBreak: 'break-word',
                  }}
                >
                  {msg.content}
                </span>
              </div>
            )
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input para enviar */}
      <div
        style={{
          padding: 16,
          borderTop: '1px solid #5c5a5a',
          display: 'flex',
          gap: 8,
          flexShrink: 0,
          minWidth: 0,
        }}
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Escribe un mensaje..."
          style={{
            flex: 1,
            padding: '12px 16px',
            backgroundColor: '#121218',
            border: 'none',
            borderRadius: 8,
            color: '#ffffff',
            fontSize: 14,
            outline: 'none',
            minWidth: 0,
          }}
        />
        <button
          onClick={handleSendMessage}
          disabled={!inputValue.trim()}
          style={{
            padding: '12px 16px',
            backgroundColor: '#6c5ce7',
            color: '#ffffff',
            border: 'none',
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 600,
            cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
            opacity: inputValue.trim() ? 1 : 0.5,
            flexShrink: 0,
          }}
        >
          Enviar
        </button>
      </div>
    </div>
  )
}
