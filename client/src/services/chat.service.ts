/**
 * SQUAD UP - Servicio de Chat
 * ============================
 *
 * Este servicio gestiona la persistencia de mensajes del chat con Supabase.
 *
 * RESPONSABILIDADES:
 * - Obtener historial de mensajes de una sala
 * - Enviar nuevos mensajes (persistencia en BD)
 * - Enviar mensajes del sistema (ej: "Usuario se ha unido")
 * - Suscribirse a nuevos mensajes en tiempo real
 *
 * TABLAS DE BASE DE DATOS UTILIZADAS:
 * - messages: Almacena todos los mensajes del chat
 * - profiles: Datos de usuario para mostrar nombres
 * - room_participants: Verificación de pertenencia a sala
 *
 * TIPOS DE MENSAJES:
 * - text: Mensaje normal de usuario
 * - system: Mensaje automático del sistema (ej: "Juan se ha unido")
 * - notification: Notificaciones especiales (reservado para futuro)
 *
 * DOBLE CANAL DE COMUNICACIÓN:
 * Este servicio usa dos canales para máxima compatibilidad:
 * 1. Supabase Realtime: Para recibir mensajes nuevos en tiempo real
 * 2. Socket.io: Como respaldo y para compatibilidad con clientes legacy
 *
 * EJEMPLO DE USO:
 * ```tsx
 * import { getMessages, sendMessage, subscribeToMessages } from './services/chat.service'
 *
 * // Cargar historial de mensajes
 * const messages = await getMessages(roomId)
 *
 * // Enviar un mensaje
 * const savedMessage = await sendMessage({
 *   roomId: 'uuid-de-sala',
 *   userId: 'uuid-de-usuario',
 *   content: '¡Hola a todos!'
 * })
 *
 * // Suscribirse a mensajes nuevos
 * const unsubscribe = subscribeToMessages(roomId, (newMessage) => {
 *   setMessages(prev => [...prev, newMessage])
 * })
 * // Al desmontar:
 * unsubscribe()
 * ```
 *
 * @module services/chat.service
 * @author Squad Up Team
 */

import supabase from '../utils/supabase'
import type { Message, MessageType } from '../types'

// ============================================
// TIPOS E INTERFACES
// ============================================

/**
 * Mensaje con datos del usuario para mostrar en UI
 * Combina datos de la tabla messages con datos del perfil del usuario
 *
 * @example
 * ```tsx
 * const msg: MessageWithData = {
 *   id: 'uuid',
 *   room_id: 'room-uuid',
 *   user_id: 'user-uuid',
 *   content: '¡Hola!',
 *   type: 'text',
 *   created_at: '2024-01-01T12:00:00Z',
 *   username: 'Juan',
 *   avatar_url: 'https://...'
 * }
 * ```
 */
export interface MessageWithData {
  /** ID único del mensaje (UUID generado por Supabase) */
  id: string
  /** UUID de la sala donde se envió el mensaje */
  room_id: string
  /** UUID del usuario que envió el mensaje (null para mensajes del sistema) */
  user_id: string | null
  /** Contenido del mensaje */
  content: string
  /** Tipo de mensaje: 'text' | 'system' | 'notification' */
  type: MessageType
  /** Fecha de envío en formato ISO string */
  created_at: string
  /** Nombre para mostrar del usuario (del perfil) */
  username: string
  /** URL del avatar del usuario */
  avatar_url?: string
}

// ============================================
// OBTENER MENSAJES
// ============================================

/**
 * Obtiene el historial de mensajes de una sala
 *
 * Retorna los mensajes ordenados cronológicamente (más antiguos primero)
 * con los datos del perfil de cada usuario.
 *
 * NOTA: Solo usuarios que son participantes de la sala pueden ver los mensajes
 * (esto se controla por RLS en Supabase)
 *
 * @param roomId - UUID de la sala
 * @param limit - Cantidad máxima de mensajes (default: 50)
 * @returns Array de mensajes con datos de usuario, vacío si hay error
 *
 * @example
 * ```tsx
 * // Cargar últimos 50 mensajes
 * const messages = await getMessages('room-uuid')
 *
 * // Cargar más mensajes (para scroll infinito)
 * const moreMessages = await getMessages('room-uuid', 100)
 *
 * // Mostrar en UI
 * messages.forEach(msg => {
 *   console.log(`${msg.username}: ${msg.content}`)
 * })
 * ```
 */
export async function getMessages(roomId: string, limit: number = 50): Promise<MessageWithData[]> {
  try {
    // Query con JOIN a profiles para obtener datos del usuario
    const { data: messages, error } = await supabase
      .from('messages')
      .select(`
        id,
        room_id,
        user_id,
        content,
        type,
        created_at,
        profiles (
          user_id,
          username,
          display_name,
          avatar_url
        )
      `)
      .eq('room_id', roomId)
      .order('created_at', { ascending: true }) // Orden cronológico
      .limit(limit)

    if (error) {
      console.error('Error al obtener mensajes:', error)
      return []
    }

    if (!messages || messages.length === 0) {
      return []
    }

    // Mapear mensajes agregando datos del perfil
    const messagesWithData: MessageWithData[] = messages.map((msg: Record<string, unknown>) => {
      // El perfil puede ser null para mensajes del sistema
      const profile = (msg.profiles || {}) as { user_id?: string; username?: string; display_name?: string; avatar_url?: string }
      return {
        id: msg.id as string,
        room_id: msg.room_id as string,
        user_id: msg.user_id as string | null,
        content: msg.content as string,
        type: msg.type as MessageType,
        created_at: msg.created_at as string,
        // Si no hay perfil, es mensaje del sistema
        username: profile?.display_name || profile?.username || 'Sistema',
        avatar_url: profile?.avatar_url
      }
    })

    return messagesWithData
  } catch (error) {
    console.error('Error inesperado al obtener mensajes:', error)
    return []
  }
}

// ============================================
// ENVIAR MENSAJE
// ============================================

/**
 * Parámetros para enviar un mensaje
 */
interface SendMessageParams {
  /** UUID de la sala donde enviar el mensaje */
  roomId: string
  /** UUID del usuario que envía el mensaje */
  userId: string
  /** Contenido del mensaje */
  content: string
  /** Tipo de mensaje (opcional, default: 'text') */
  type?: MessageType
}

/**
 * Envía un mensaje a una sala y lo persiste en la base de datos
 *
 * VALIDACIONES (controladas por RLS en Supabase):
 * - El usuario debe ser participante de la sala
 * - El contenido no puede estar vacío
 *
 * @param params - Datos del mensaje a enviar
 * @returns El mensaje guardado con todos sus datos, o null si hay error
 *
 * @example
 * ```tsx
 * const savedMessage = await sendMessage({
 *   roomId: 'room-uuid',
 *   userId: 'user-uuid',
 *   content: '¡Hola equipo!'
 * })
 *
 * if (savedMessage) {
 *   console.log('Mensaje enviado:', savedMessage.id)
 * } else {
 *   alert('No puedes enviar mensajes si no estás en la sala')
 * }
 * ```
 */
export async function sendMessage(params: SendMessageParams): Promise<MessageWithData | null> {
  try {
    // Verificar que el usuario está en la sala
    // Esta verificación también la hace RLS, pero la hacemos aquí
    // para dar feedback inmediato al usuario
    const { data: participant, error: participantError } = await supabase
      .from('room_participants')
      .select('id')
      .eq('room_id', params.roomId)
      .eq('user_id', params.userId)
      .single()

    if (participantError || !participant) {
      console.error('El usuario no está en la sala')
      return null
    }

    // Insertar el mensaje en la base de datos
    const { data: message, error: messageError } = await supabase
      .from('messages')
      .insert({
        room_id: params.roomId,
        user_id: params.userId,
        content: params.content,
        type: params.type || 'text'
      })
      .select(`
        id,
        room_id,
        user_id,
        content,
        type,
        created_at,
        profiles (
          user_id,
          username,
          display_name,
          avatar_url
        )
      `)
      .single()

    if (messageError || !message) {
      console.error('Error al enviar mensaje:', messageError)
      return null
    }

    // Mapear el mensaje guardado con datos del perfil
    const profile = (message.profiles || {}) as { user_id?: string; username?: string; display_name?: string; avatar_url?: string }

    return {
      id: message.id as string,
      room_id: message.room_id as string,
      user_id: message.user_id as string | null,
      content: message.content as string,
      type: message.type as MessageType,
      created_at: message.created_at as string,
      username: profile?.display_name || profile?.username || 'Usuario',
      avatar_url: profile?.avatar_url
    }
  } catch (error) {
    console.error('Error inesperado al enviar mensaje:', error)
    return null
  }
}

// ============================================
// ENVIAR MENSAJE DEL SISTEMA
// ============================================

/**
 * Envía un mensaje automático del sistema
 *
 * Los mensajes del sistema tienen user_id = null y type = 'system'.
 * Se usan para notificar eventos como:
 * - "Usuario se ha unido a la sala"
 * - "La partida ha comenzado"
 * - "Usuario ha salido de la sala"
 *
 * NOTA: Esta función no verifica permisos ya que es para uso interno del sistema.
 *
 * @param roomId - UUID de la sala
 * @param content - Contenido del mensaje del sistema
 * @returns El mensaje guardado, o null si hay error
 *
 * @example
 * ```tsx
 * // Cuando un usuario se une
 * await sendSystemMessage(roomId, `${username} se ha unido a la sala`)
 *
 * // Cuando la partida comienza
 * await sendSystemMessage(roomId, '¡La partida ha comenzado!')
 * ```
 */
export async function sendSystemMessage(roomId: string, content: string): Promise<MessageWithData | null> {
  try {
    const { data: message, error: messageError } = await supabase
      .from('messages')
      .insert({
        room_id: roomId,
        user_id: null, // null indica mensaje del sistema
        content,
        type: 'system'
      })
      .select('id, room_id, user_id, content, type, created_at')
      .single()

    if (messageError || !message) {
      console.error('Error al enviar mensaje del sistema:', messageError)
      return null
    }

    return {
      id: message.id as string,
      room_id: message.room_id as string,
      user_id: message.user_id as string | null,
      content: message.content as string,
      type: message.type as MessageType,
      created_at: message.created_at as string,
      username: 'Sistema'
    }
  } catch (error) {
    console.error('Error inesperado al enviar mensaje del sistema:', error)
    return null
  }
}

// ============================================
// SUSCRIPCIÓN A MENSAJES EN TIEMPO REAL
// ============================================

/**
 * Suscribe a nuevos mensajes de una sala en tiempo real
 *
 * Usa Supabase Realtime para recibir notificaciones cuando se inserta
 * un nuevo mensaje en la tabla messages para esta sala.
 *
 * FLUJO:
 * 1. Se crea un canal único para esta sala
 * 2. Se escuchan eventos INSERT en la tabla messages
 * 3. Cuando llega un mensaje nuevo, se obtiene el perfil del usuario
 * 4. Se llama al callback con el mensaje completo
 *
 * IMPORTANTE: Llamar a la función de cleanup al desmontar el componente.
 *
 * @param roomId - UUID de la sala a monitorear
 * @param callback - Función a llamar con cada mensaje nuevo
 * @returns Función de cleanup para cancelar la suscripción
 *
 * @example
 * ```tsx
 * function RoomChat({ roomId }) {
 *   const [messages, setMessages] = useState([])
 *
 *   useEffect(() => {
 *     // Cargar historial inicial
 *     getMessages(roomId).then(setMessages)
 *
 *     // Suscribirse a mensajes nuevos
 *     const unsubscribe = subscribeToMessages(roomId, (newMessage) => {
 *       setMessages(prev => [...prev, newMessage])
 *     })
 *
 *     // Cleanup al desmontar
 *     return () => unsubscribe()
 *   }, [roomId])
 *
 *   return <MessageList messages={messages} />
 * }
 * ```
 */
export function subscribeToMessages(roomId: string, callback: (message: MessageWithData) => void) {
  // Crear canal único para esta sala
  const channel = supabase
    .channel(`messages-${roomId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT', // Solo nos interesan mensajes nuevos
        schema: 'public',
        table: 'messages',
        filter: `room_id=eq.${roomId}` // Solo mensajes de esta sala
      },
      async (payload) => {
        // El payload contiene el mensaje nuevo
        const newMessage = payload.new as Message

        // Obtener datos del perfil del usuario
        // (no vienen en el payload del INSERT)
        let username = 'Usuario'
        let avatar_url: string | undefined

        if (newMessage.user_id) {
          // Buscar perfil del usuario
          const { data: profile } = await supabase
            .from('profiles')
            .select('username, display_name, avatar_url')
            .eq('user_id', newMessage.user_id)
            .single()

          if (profile) {
            username = profile.display_name || profile.username || 'Usuario'
            avatar_url = profile.avatar_url || undefined
          }
        } else {
          // user_id null significa mensaje del sistema
          username = 'Sistema'
        }

        // Llamar al callback con el mensaje completo
        callback({
          id: newMessage.id,
          room_id: newMessage.room_id,
          user_id: newMessage.user_id,
          content: newMessage.content,
          type: newMessage.type as MessageType,
          created_at: newMessage.created_at,
          username,
          avatar_url
        })
      }
    )
    .subscribe()

  // Retornar función de cleanup
  return () => {
    supabase.removeChannel(channel)
  }
}
