/**
 * SQUAD UP - Servicio de Salas
 * =============================
 *
 * Este servicio gestiona toda la persistencia de salas de juego con Supabase.
 *
 * RESPONSABILIDADES:
 * - Crear, leer, actualizar y eliminar salas
 * - Gestionar participantes (unirse/salir de salas)
 * - Suscribirse a cambios en tiempo real
 *
 * TABLAS DE BASE DE DATOS UTILIZADAS:
 * - rooms: Almacena las salas de juego
 * - room_participants: Relación usuarios-salas
 * - profiles: Datos de usuario para mostrar nombres
 * - games: Catálogo de juegos disponibles
 *
 * EJEMPLO DE USO:
 * ```tsx
 * import { getRooms, createRoom, joinRoom, subscribeToRooms } from './services/room.service'
 *
 * // Obtener todas las salas activas
 * const rooms = await getRooms({ status: 'active' })
 *
 * // Crear una nueva sala
 * const newRoom = await createRoom({
 *   title: 'Busco team para ranked',
 *   game_id: 'uuid-del-juego',
 *   max_participants: 5,
 *   creator_id: user.id
 * })
 *
 * // Unirse a una sala
 * const result = await joinRoom(roomId, userId)
 * if (result.success) {
 *   console.log('Unido correctamente:', result.room)
 * }
 *
 * // Suscribirse a cambios en tiempo real
 * const unsubscribe = subscribeToRooms(() => {
 *   // Se llama cuando hay cambios en salas o participantes
 *   loadRooms()
 * })
 * // Al desmontar el componente:
 * unsubscribe()
 * ```
 *
 * @module services/room.service
 * @author Squad Up Team
 */

import supabase from '../utils/supabase'
import type { Room, RoomParticipant, RoomFilters, User } from '@supabase/supabase-js'

// ============================================
// TIPOS E INTERFACES
// ============================================

/**
 * Sala con sus participantes incluidos
 * Extiende la interfaz Room base con la relación de participantes
 */
export interface RoomWithParticipants extends Room {
  participants: RoomParticipant[]
}

/**
 * Jugador dentro de una sala
 * Contiene los datos necesarios para mostrar en la UI
 */
export interface RoomPlayer {
  /** ID del registro en room_participants */
  id: string
  /** ID del usuario en auth.users */
  user_id: string
  /** Nombre para mostrar (display_name o username del perfil) */
  name: string
  /** URL del avatar del usuario */
  avatar_url?: string
  /** Si es el creador de la sala (rol 'host') */
  isHost: boolean
  /** Fecha de unión a la sala */
  joined_at: string
}

/**
 * Sala con todos los datos necesarios para la UI
 * Esta es la estructura principal que usan los componentes
 *
 * @example
 * ```tsx
 * const room: RoomWithData = {
 *   id: 'uuid',
 *   title: 'Busco team',
 *   game_name: 'League of Legends',
 *   game_slug: 'league-of-legends',
 *   max_participants: 5,
 *   current_participants: 2,
 *   players: [
 *     { id: '1', user_id: 'uuid', name: 'Juan', isHost: true, joined_at: '2024-01-01' }
 *   ]
 * }
 * ```
 */
export interface RoomWithData {
  /** ID único de la sala (UUID generado por Supabase) */
  id: string
  /** Título descriptivo de la sala */
  title: string
  /** Descripción opcional con detalles adicionales */
  description?: string
  /** UUID del juego seleccionado */
  game_id: string
  /** Nombre legible del juego (ej: 'League of Legends') */
  game_name: string
  /** Slug del juego para URLs e imágenes (ej: 'league-of-legends') */
  game_slug: string
  /** Máximo de jugadores permitidos */
  max_participants: number
  /** Cantidad actual de jugadores en la sala */
  current_participants: number
  /** Rango mínimo requerido para unirse (opcional) */
  rank_required?: string
  /** Roles buscados separados por coma (ej: 'Top, Mid, Support') */
  role_required?: string
  /** Estado actual de la sala: active, full, in_progress, completed, cancelled */
  status: string
  /** Si la sala es privada (requiere código de invitación) */
  is_private: boolean
  /** UUID del creador de la sala */
  creator_id: string
  /** Nombre del creador para mostrar en UI */
  creator_name: string
  /** Fecha de creación en ISO string */
  created_at: string
  /** Lista de jugadores actualmente en la sala */
  players: RoomPlayer[]
}

// ============================================
// OBTENER SALAS
// ============================================

/**
 * Obtiene todas las salas activas con sus participantes
 *
 * FLUJO DE DATOS:
 * 1. SELECT de rooms con JOIN a games y profiles
 * 2. SELECT de room_participants con JOIN a profiles
 * 3. Combina los datos en estructura RoomWithData
 *
 * @param filters - Filtros opcionales para la búsqueda
 * @param filters.game_id - Filtrar por UUID de juego
 * @param filters.status - Filtrar por estado de sala
 * @param filters.is_private - Filtrar por privacidad
 * @param filters.search - Buscar en título (case insensitive)
 *
 * @returns Promise con array de salas, vacío si hay error
 *
 * @example
 * ```tsx
 * // Obtener todas las salas activas
 * const allRooms = await getRooms({ status: 'active' })
 *
 * // Obtener salas de un juego específico
 * const lolRooms = await getRooms({
 *   status: 'active',
 *   game_id: 'uuid-league-of-legends'
 * })
 *
 * // Buscar salas por título
 * const searchResults = await getRooms({ search: 'ranked' })
 * ```
 */
export async function getRooms(filters?: RoomFilters): Promise<RoomWithData[]> {
  try {
    // Construir query base con JOINs
    // Obtiene datos de la sala + información del juego + perfil del creador
    let query = supabase
      .from('rooms')
      .select(`
        id,
        title,
        description,
        game_id,
        max_participants,
        current_participants,
        rank_required,
        role_required,
        status,
        is_private,
        creator_id,
        created_at,
        games (
          id,
          name,
          slug
        ),
        profiles!rooms_creator_id_fkey (
          user_id,
          username,
          display_name,
          avatar_url
        )
      `)
      .is('deleted_at', null) // Excluir salas eliminadas (soft delete)
      .order('created_at', { ascending: false }) // Más recientes primero

    // Aplicar filtros opcionales
    if (filters?.game_id) {
      query = query.eq('game_id', filters.game_id)
    }
    if (filters?.status) {
      query = query.eq('status', filters.status)
    }
    if (filters?.is_private !== undefined) {
      query = query.eq('is_private', filters.is_private)
    }
    if (filters?.search) {
      // ILIKE hace búsqueda case-insensitive
      query = query.ilike('title', `%${filters.search}%`)
    }

    const { data: rooms, error } = await query

    if (error) {
      console.error('Error al obtener salas:', error)
      return []
    }

    if (!rooms || rooms.length === 0) {
      return []
    }

    // Obtener participantes para todas las salas en una sola query
    // Esto es más eficiente que hacer una query por cada sala
    const roomIds = rooms.map(r => r.id)
    const { data: participants, error: participantsError } = await supabase
      .from('room_participants')
      .select(`
        id,
        room_id,
        user_id,
        role,
        joined_at,
        profiles (
          user_id,
          username,
          display_name,
          avatar_url
        )
      `)
      .in('room_id', roomIds)

    if (participantsError) {
      console.error('Error al obtener participantes:', participantsError)
    }

    // Mapear las salas con sus participantes
    // Convierte la estructura de Supabase a RoomWithData
    const roomsWithData: RoomWithData[] = rooms.map((room: Record<string, unknown>) => {
      // Filtrar participantes de esta sala específica
      const roomParticipants = (participants || []).filter((p: Record<string, unknown>) => p.room_id === room.id)

      // Extraer datos del juego (viene como objeto único del JOIN)
      const game = (room.games || {}) as { id?: string; name?: string; slug?: string }

      // Extraer datos del creador (viene como objeto único del JOIN)
      const creator = (room.profiles || {}) as { user_id?: string; username?: string; display_name?: string; avatar_url?: string }

      // Mapear participantes a estructura RoomPlayer
      const players: RoomPlayer[] = roomParticipants.map((p: Record<string, unknown>) => {
        const profile = (p.profiles || {}) as { user_id?: string; username?: string; display_name?: string; avatar_url?: string }
        return {
          id: p.id as string,
          user_id: p.user_id as string,
          name: profile?.display_name || profile?.username || 'Usuario',
          avatar_url: profile?.avatar_url,
          isHost: p.role === 'host', // El creador tiene rol 'host'
          joined_at: p.joined_at as string
        }
      })

      // Construir objeto final con todos los datos
      return {
        id: room.id as string,
        title: room.title as string,
        description: (room.description as string) || undefined,
        game_id: room.game_id as string,
        game_name: game?.name || 'Unknown',
        game_slug: game?.slug || 'unknown',
        max_participants: room.max_participants as number,
        current_participants: room.current_participants as number,
        rank_required: (room.rank_required as string) || undefined,
        role_required: (room.role_required as string) || undefined,
        status: room.status as string,
        is_private: room.is_private as boolean,
        creator_id: room.creator_id as string,
        creator_name: creator?.display_name || creator?.username || 'Usuario',
        created_at: room.created_at as string,
        players
      }
    })

    return roomsWithData
  } catch (error) {
    console.error('Error inesperado al obtener salas:', error)
    return []
  }
}

/**
 * Obtiene una sala específica por su ID
 *
 * Útil cuando necesitas los datos actualizados de una sola sala,
 * por ejemplo después de unirse o salir de ella.
 *
 * @param roomId - UUID de la sala a obtener
 * @returns La sala con todos sus datos, o null si no existe/hay error
 *
 * @example
 * ```tsx
 * const room = await getRoomById('uuid-de-la-sala')
 * if (room) {
 *   console.log(`Sala: ${room.title} con ${room.players.length} jugadores`)
 * }
 * ```
 */
export async function getRoomById(roomId: string): Promise<RoomWithData | null> {
  try {
    // Query similar a getRooms pero con filtro por ID y .single()
    const { data: room, error } = await supabase
      .from('rooms')
      .select(`
        id,
        title,
        description,
        game_id,
        max_participants,
        current_participants,
        rank_required,
        role_required,
        status,
        is_private,
        creator_id,
        created_at,
        games (
          id,
          name,
          slug
        ),
        profiles!rooms_creator_id_fkey (
          user_id,
          username,
          display_name,
          avatar_url
        )
      `)
      .eq('id', roomId)
      .is('deleted_at', null)
      .single() // Espera exactamente un resultado

    if (error || !room) {
      console.error('Error al obtener sala:', error)
      return null
    }

    // Obtener participantes de esta sala
    const { data: participants, error: participantsError } = await supabase
      .from('room_participants')
      .select(`
        id,
        room_id,
        user_id,
        role,
        joined_at,
        profiles (
          user_id,
          username,
          display_name,
          avatar_url
        )
      `)
      .eq('room_id', roomId)

    if (participantsError) {
      console.error('Error al obtener participantes:', participantsError)
    }

    // Mapear datos igual que en getRooms
    const game = (room.games || {}) as { id?: string; name?: string; slug?: string }
    const creator = (room.profiles || {}) as { user_id?: string; username?: string; display_name?: string; avatar_url?: string }

    const players: RoomPlayer[] = (participants || []).map((p: Record<string, unknown>) => {
      const profile = (p.profiles || {}) as { user_id?: string; username?: string; display_name?: string; avatar_url?: string }
      return {
        id: p.id as string,
        user_id: p.user_id as string,
        name: profile?.display_name || profile?.username || 'Usuario',
        avatar_url: profile?.avatar_url,
        isHost: p.role === 'host',
        joined_at: p.joined_at as string
      }
    })

    return {
      id: room.id as string,
      title: room.title as string,
      description: (room.description as string) || undefined,
      game_id: room.game_id as string,
      game_name: game?.name || 'Unknown',
      game_slug: game?.slug || 'unknown',
      max_participants: room.max_participants as number,
      current_participants: room.current_participants as number,
      rank_required: (room.rank_required as string) || undefined,
      role_required: (room.role_required as string) || undefined,
      status: room.status as string,
      is_private: room.is_private as boolean,
      creator_id: room.creator_id as string,
      creator_name: creator?.display_name || creator?.username || 'Usuario',
      created_at: room.created_at as string,
      players
    }
  } catch (error) {
    console.error('Error inesperado al obtener sala:', error)
    return null
  }
}

// ============================================
// CREAR SALA
// ============================================

/**
 * Parámetros para crear una nueva sala
 */
interface CreateRoomParams {
  /** Título descriptivo de la sala (obligatorio) */
  title: string
  /** UUID del juego (de la tabla games) */
  game_id: string
  /** Descripción opcional con detalles */
  description?: string
  /** Máximo de jugadores (2-10) */
  max_participants: number
  /** Rango mínimo requerido */
  rank_required?: string
  /** Roles buscados separados por coma */
  role_required?: string
  /** Si es sala privada */
  is_private?: boolean
  /** UUID del usuario que crea la sala */
  creator_id: string
}

/**
 * Crea una nueva sala de juego
 *
 * FLUJO:
 * 1. INSERT en tabla rooms
 * 2. INSERT en room_participants (creador como host)
 * 3. Retorna la sala completa con getRoomById()
 *
 * TRANSACCIÓN:
 * Si falla la inserción del participante, intenta eliminar la sala creada
 * para mantener consistencia.
 *
 * @param params - Datos de la sala a crear
 * @returns La sala creada con todos sus datos, o null si hay error
 *
 * @example
 * ```tsx
 * const newRoom = await createRoom({
 *   title: 'Busco team para ranked',
 *   game_id: 'd5432591-2266-4b5e-ba86-aa3943f671df', // League of Legends
 *   description: 'Somos 3 buscando 2 más',
 *   max_participants: 5,
 *   rank_required: 'Oro',
 *   role_required: 'Jungle, Support',
 *   creator_id: user.id
 * })
 * ```
 */
export async function createRoom(params: CreateRoomParams): Promise<RoomWithData | null> {
  try {
    // Insertar la sala en la base de datos
    const { data: room, error: roomError } = await supabase
      .from('rooms')
      .insert({
        title: params.title,
        game_id: params.game_id,
        description: params.description || null,
        max_participants: params.max_participants,
        current_participants: 1, // El creador es el primer participante
        rank_required: params.rank_required || null,
        role_required: params.role_required || null,
        is_private: params.is_private || false,
        creator_id: params.creator_id,
        status: 'active'
      })
      .select('id')
      .single()

    if (roomError || !room) {
      console.error('Error al crear sala:', roomError)
      return null
    }

    // Insertar al creador como participante con rol 'host'
    // Esto permite que el creador aparezca en la lista de jugadores
    const { error: participantError } = await supabase
      .from('room_participants')
      .insert({
        room_id: room.id,
        user_id: params.creator_id,
        role: 'host' // Rol especial para el creador
      })

    if (participantError) {
      console.error('Error al añadir host como participante:', participantError)
      // Rollback: eliminar la sala si no se pudo añadir el participante
      await supabase.from('rooms').delete().eq('id', room.id)
      return null
    }

    // Obtener la sala completa para retornar con todos los datos
    return await getRoomById(room.id)
  } catch (error) {
    console.error('Error inesperado al crear sala:', error)
    return null
  }
}

// ============================================
// UNIRSE / SALIR DE SALA
// ============================================

/**
 * Une un usuario a una sala existente
 *
 * VALIDACIONES:
 * - La sala debe existir y no estar eliminada
 * - La sala debe estar en estado 'active'
 * - Debe haber espacio disponible
 * - El usuario no debe estar ya en la sala
 *
 * @param roomId - UUID de la sala
 * @param userId - UUID del usuario
 * @returns Objeto con success, sala actualizada (si éxito), o error
 *
 * @example
 * ```tsx
 * const result = await joinRoom('room-uuid', 'user-uuid')
 * if (result.success) {
 *   console.log('Unido a:', result.room?.title)
 * } else {
 *   alert(result.error) // 'La sala está llena', 'Ya estás en esta sala', etc.
 * }
 * ```
 */
export async function joinRoom(roomId: string, userId: string): Promise<{ success: boolean; room?: RoomWithData; error?: string }> {
  try {
    // Verificar que la sala existe y tiene espacio
    const { data: room, error: roomError } = await supabase
      .from('rooms')
      .select('id, max_participants, current_participants, status')
      .eq('id', roomId)
      .is('deleted_at', null)
      .single()

    if (roomError || !room) {
      return { success: false, error: 'La sala no existe' }
    }

    // Validar estado de la sala
    if (room.status !== 'active') {
      return { success: false, error: 'La sala no está activa' }
    }

    // Validar espacio disponible
    if (room.current_participants >= room.max_participants) {
      return { success: false, error: 'La sala está llena' }
    }

    // Verificar si ya está unido (evitar duplicados)
    const { data: existingParticipant } = await supabase
      .from('room_participants')
      .select('id')
      .eq('room_id', roomId)
      .eq('user_id', userId)
      .single()

    if (existingParticipant) {
      return { success: false, error: 'Ya estás en esta sala' }
    }

    // Añadir participante con rol 'member'
    const { error: joinError } = await supabase
      .from('room_participants')
      .insert({
        room_id: roomId,
        user_id: userId,
        role: 'member'
      })

    if (joinError) {
      console.error('Error al unirse a la sala:', joinError)
      return { success: false, error: 'Error al unirse a la sala' }
    }

    // Actualizar contador de participantes y estado si se llenó
    const newCount = room.current_participants + 1
    const newStatus = newCount >= room.max_participants ? 'full' : 'active'

    await supabase
      .from('rooms')
      .update({
        current_participants: newCount,
        status: newStatus,
        updated_at: new Date().toISOString()
      })
      .eq('id', roomId)

    // Obtener y retornar la sala actualizada
    const updatedRoom = await getRoomById(roomId)
    return { success: true, room: updatedRoom || undefined }
  } catch (error) {
    console.error('Error inesperado al unirse a sala:', error)
    return { success: false, error: 'Error inesperado' }
  }
}

/**
 * Saca un usuario de una sala
 *
 * REGLAS:
 * - El host NO puede salir (debe eliminar la sala)
 * - Solo el propio usuario puede salirse
 *
 * @param roomId - UUID de la sala
 * @param userId - UUID del usuario que sale
 * @returns Objeto con success y sala actualizada, o error
 *
 * @example
 * ```tsx
 * const result = await leaveRoom('room-uuid', 'user-uuid')
 * if (result.success) {
 *   // Volver a la lista de salas
 *   navigate('/rooms')
 * } else if (result.error?.includes('host')) {
 *   alert('El creador debe eliminar la sala para salir')
 * }
 * ```
 */
export async function leaveRoom(roomId: string, userId: string): Promise<{ success: boolean; room?: RoomWithData; error?: string }> {
  try {
    // Verificar que el usuario está en la sala
    const { data: participant, error: participantError } = await supabase
      .from('room_participants')
      .select('id, role')
      .eq('room_id', roomId)
      .eq('user_id', userId)
      .single()

    if (participantError || !participant) {
      return { success: false, error: 'No estás en esta sala' }
    }

    // El host no puede salir, debe eliminar la sala
    if (participant.role === 'host') {
      return { success: false, error: 'El host no puede salir de la sala. Debe eliminarla.' }
    }

    // Eliminar registro de participante
    const { error: deleteError } = await supabase
      .from('room_participants')
      .delete()
      .eq('id', participant.id)

    if (deleteError) {
      console.error('Error al salir de la sala:', deleteError)
      return { success: false, error: 'Error al salir de la sala' }
    }

    // Decrementar contador y cambiar estado a activo si estaba llena
    const { data: room } = await supabase
      .from('rooms')
      .select('current_participants')
      .eq('id', roomId)
      .single()

    if (room) {
      const newCount = Math.max(0, room.current_participants - 1)
      await supabase
        .from('rooms')
        .update({
          current_participants: newCount,
          status: 'active', // Volver a activa (si estaba llena ahora hay espacio)
          updated_at: new Date().toISOString()
        })
        .eq('id', roomId)
    }

    // Retornar la sala actualizada (puede ser útil para actualizar UI)
    const updatedRoom = await getRoomById(roomId)
    return { success: true, room: updatedRoom || undefined }
  } catch (error) {
    console.error('Error inesperado al salir de sala:', error)
    return { success: false, error: 'Error inesperado' }
  }
}

// ============================================
// ELIMINAR / ACTUALIZAR SALA
// ============================================

/**
 * Elimina una sala (soft delete)
 *
 * Usa soft delete marcando deleted_at en lugar de eliminar el registro.
 * Esto permite mantener historial y recuperar salas si es necesario.
 *
 * SOLO el creador puede eliminar la sala.
 *
 * @param roomId - UUID de la sala
 * @param userId - UUID del usuario (debe ser el creador)
 * @returns Objeto con success o error
 *
 * @example
 * ```tsx
 * const result = await deleteRoom('room-uuid', 'user-uuid')
 * if (result.success) {
 *   navigate('/rooms')
 * } else {
 *   alert(result.error)
 * }
 * ```
 */
export async function deleteRoom(roomId: string, userId: string): Promise<{ success: boolean; error?: string }> {
  try {
    // Verificar que el usuario es el creador
    const { data: room, error: roomError } = await supabase
      .from('rooms')
      .select('creator_id')
      .eq('id', roomId)
      .single()

    if (roomError || !room) {
      return { success: false, error: 'La sala no existe' }
    }

    if (room.creator_id !== userId) {
      return { success: false, error: 'Solo el creador puede eliminar la sala' }
    }

    // Soft delete: marcar como eliminada en lugar de borrar
    const { error: deleteError } = await supabase
      .from('rooms')
      .update({
        status: 'cancelled',
        deleted_at: new Date().toISOString()
      })
      .eq('id', roomId)

    if (deleteError) {
      console.error('Error al eliminar sala:', deleteError)
      return { success: false, error: 'Error al eliminar la sala' }
    }

    return { success: true }
  } catch (error) {
    console.error('Error inesperado al eliminar sala:', error)
    return { success: false, error: 'Error inesperado' }
  }
}

/**
 * Actualiza el estado de una sala
 *
 * Estados disponibles:
 * - active: Esperando jugadores
 * - full: Sala llena
 * - in_progress: Partida en curso
 * - completed: Partida terminada
 * - cancelled: Sala cancelada
 *
 * SOLO el creador puede cambiar el estado.
 *
 * @param roomId - UUID de la sala
 * @param status - Nuevo estado
 * @param userId - UUID del usuario (debe ser el creador)
 * @returns Objeto con success o error
 *
 * @example
 * ```tsx
 * // Iniciar partida
 * const result = await updateRoomStatus('room-uuid', 'in_progress', 'user-uuid')
 *
 * // Marcar como completada
 * const result = await updateRoomStatus('room-uuid', 'completed', 'user-uuid')
 * ```
 */
export async function updateRoomStatus(
  roomId: string,
  status: 'active' | 'full' | 'in_progress' | 'completed' | 'cancelled',
  userId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Verificar que el usuario es el creador
    const { data: room, error: roomError } = await supabase
      .from('rooms')
      .select('creator_id')
      .eq('id', roomId)
      .single()

    if (roomError || !room) {
      return { success: false, error: 'La sala no existe' }
    }

    if (room.creator_id !== userId) {
      return { success: false, error: 'Solo el creador puede cambiar el estado' }
    }

    const { error: updateError } = await supabase
      .from('rooms')
      .update({
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', roomId)

    if (updateError) {
      console.error('Error al actualizar estado:', updateError)
      return { success: false, error: 'Error al actualizar el estado' }
    }

    return { success: true }
  } catch (error) {
    console.error('Error inesperado al actualizar estado:', error)
    return { success: false, error: 'Error inesperado' }
  }
}

// ============================================
// SUSCRIPCIÓN A CAMBIOS EN TIEMPO REAL
// ============================================

/**
 * Suscribe a cambios en salas y participantes en tiempo real
 *
 * Usa Supabase Realtime para recibir notificaciones cuando:
 * - Se crea/actualiza/elimina una sala
 * - Un usuario se une/sale de una sala
 *
 * IMPORTANTE: Llamar a la función de cleanup al desmontar el componente
 * para evitar memory leaks.
 *
 * @param callback - Función a llamar cuando hay cambios
 * @returns Función de cleanup para cancelar la suscripción
 *
 * @example
 * ```tsx
 * useEffect(() => {
 *   const unsubscribe = subscribeToRooms(() => {
 *     // Recargar salas cuando hay cambios
 *     loadRooms()
 *   })
 *
 *   // Cleanup al desmontar
 *   return () => unsubscribe()
 * }, [])
 * ```
 */
export function subscribeToRooms(callback: () => void) {
  // Crear canal único para esta suscripción
  const channel = supabase
    .channel('rooms-changes')
    .on(
      'postgres_changes',
      {
        event: '*', // INSERT, UPDATE, DELETE
        schema: 'public',
        table: 'rooms'
      },
      () => {
        // Se llama cuando hay cualquier cambio en rooms
        callback()
      }
    )
    .on(
      'postgres_changes',
      {
        event: '*', // INSERT, DELETE (UPDATE no suele ser necesario)
        schema: 'public',
        table: 'room_participants'
      },
      () => {
        // Se llama cuando alguien se une o sale de una sala
        callback()
      }
    )
    .subscribe()

  // Retornar función de cleanup
  return () => {
    supabase.removeChannel(channel)
  }
}
