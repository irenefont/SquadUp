/**
 * SQUAD UP - Tipos principales de la aplicación
 * ==============================
 *
 * Este archivo define todas las interfaces y tipos TypeScript utilizados
 * en toda la aplicación. Centraliza las definiciones para mantener
 * consistencia y facilitar el mantenimiento.
 *
 * CATEGORÍAS DE TIPOS:
 * - Usuario y Autenticación: User, Profile, GameStyle
 * - Salas de Juego: Room, RoomParticipant, RoomStatus
 * - Juegos: Game, GameGenre, GameRole, GameRank
 * - Chat y Mensajes: Message, MessageType
 * - Valoraciones: Rating, RatingStats
 * - Utilidades: RoomFilters, PaginatedResponse, Notification
 *
 * @module types
 * @author Squad Up Team
 */

// ============================================
// USUARIO Y AUTENTICACIÓN
// ============================================

/**
 * Usuario básico de Supabase Auth
 * Representa un usuario autenticado en el sistema
 */
export interface User {
  /** ID único del usuario (UUID generado por Supabase) */
  id: string
  /** Email del usuario */
  email: string
  /** Fecha de creación de la cuenta (ISO string) */
  created_at: string
  /** Última vez que el usuario inició sesión (opcional) */
  last_sign_in_at?: string
}

/**
 * Perfil completo del usuario
 * Contiene información adicional más allá de la autenticación básica
 */
export interface Profile {
  /** ID único del perfil (UUID) */
  id: string
  /** ID del usuario en auth.users (clave foránea) */
  user_id: string
  /** Nombre de usuario único (usado en @menciones) */
  username: string
  /** Nombre para mostrar en la UI */
  display_name: string
  /** URL del avatar del usuario (opcional) */
  avatar_url?: string
  /** Biografía o descripción del usuario (opcional) */
  bio?: string
  /** País de residencia (opcional) */
  country?: string
  /** Idioma preferido (opcional) */
  language?: string
  /** Zona horaria del usuario (opcional) */
  timezone?: string
  /** Usuario de Discord para contacto (opcional) */
  discord_username?: string
  /** Estilos de juego preferidos */
  preferred_game_style: GameStyle[]
  /** Fecha de creación del perfil */
  created_at: string
  /** Última actualización del perfil */
  updated_at: string
}

/**
 * Estilo de juego del usuario
 * Define cómo le gusta jugar
 */
export type GameStyle = 'casual' | 'competitivo' | 'hardcore'

// ============================================
// SALAS DE JUEGO
// ============================================

/**
 * Estado posible de una sala de juego
 * @property active - Sala abierta esperando jugadores
 * @property full - Sala llena, no acepta más jugadores
 * @property in_progress - Partida en curso
 * @property completed - Partida finalizada (lista para valoraciones)
 * @property cancelled - Sala cancelada por el host
 */
export type RoomStatus = 'active' | 'full' | 'in_progress' | 'completed' | 'cancelled'

/**
 * Sala de juego
 * Representa un "tablón de anuncios" donde los jugadores buscan equipo
 */
export interface Room {
  /** ID único de la sala (UUID) */
  id: string
  /** ID del usuario que creó la sala */
  creator_id: string
  /** ID del juego seleccionado */
  game_id: string
  /** Título descriptivo de la sala */
  title: string
  /** Descripción adicional (opcional) */
  description?: string
  /** Máximo de participantes permitidos */
  max_participants: number
  /** Cantidad actual de participantes */
  current_participants: number
  /** Rol(es) requeridos para unirse (opcional) */
  role_required?: string
  /** Rango mínimo requerido (opcional) */
  rank_required?: string
  /** Estado actual de la sala */
  status: RoomStatus
  /** Si la sala es privada (requiere código de invitación) */
  is_private: boolean
  /** Código de invitación para salas privadas (opcional) */
  invite_code?: string
  /** Fecha programada para la partida (opcional) */
  scheduled_at?: string
  /** Fecha de creación */
  created_at: string
  /** Última actualización */
  updated_at: string
  // ===== RELACIONES =====
  /** Información del juego (JOIN con tabla games) */
  game?: Game
  /** Perfil del creador (JOIN con tabla profiles) */
  creator?: Profile
  /** Lista de participantes (JOIN con tabla room_participants) */
  participants?: RoomParticipant[]
}

/**
 * Participante de una sala
 * Relación many-to-many entre usuarios y salas
 */
export interface RoomParticipant {
  /** ID único del registro */
  id: string
  /** ID de la sala */
  room_id: string
  /** ID del usuario participante */
  user_id: string
  /** Rol del participante ('host' | 'member') */
  role: string
  /** Fecha de unión a la sala */
  joined_at: string
  // ===== RELACIONES =====
  /** Perfil del participante */
  profile?: Profile
}

/**
 * Datos para crear una nueva sala
 * Pasados al servicio createRoom()
 */
export interface CreateRoomInput {
  /** ID del juego seleccionado */
  game_id: string
  /** Título de la sala */
  title: string
  /** Descripción opcional */
  description?: string
  /** Máximo de participantes (2-5) */
  max_participants: number
  /** Rol requerido para unirse */
  role_required?: string
  /** Rango mínimo requerido */
  rank_required?: string
  /** Si es sala privada */
  is_private?: boolean
  /** Fecha programada */
  scheduled_at?: string
}

// ============================================
// JUEGOS
// ============================================

/**
 * Juego disponible en la plataforma
 * Catálogo de juegos con sus configuraciones específicas
 */
export interface Game {
  /** ID único del juego (UUID) */
  id: string
  /** Nombre del juego (ej: 'League of Legends') */
  name: string
  /** Slug para URLs (ej: 'league-of-legends') */
  slug: string
  /** URL del icono del juego (opcional) */
  icon_url?: string
  /** Género del juego */
  genre: GameGenre
  /** Máximo de jugadores por partida */
  max_players: number
  /** Si el juego tiene roles específicos */
  has_roles: boolean
  /** Si el juego tiene sistema de rangos */
  has_ranks: boolean
  /** Roles disponibles para este juego */
  roles?: GameRole[]
  /** Rangos disponibles para este juego */
  ranks?: GameRank[]
}

/**
 * Géneros de juegos soportados
 */
export type GameGenre =
  | 'moba'       // Multiplayer Online Battle Arena (LoL, Dota 2)
  | 'mmorpg'     // Massively Multiplayer Online RPG (WoW, FFXIV)
  | 'fps'        // First Person Shooter (Valorant, CS2)
  | 'coop'       // Cooperativo (Deep Rock Galactic, Portal 2)
  | 'strategy'   // Estrategia (StarCraft, Age of Empires)
  | 'card_game'  // Juego de cartas (MTG, Hearthstone)
  | 'tabletop'   // Mesa / Tablero (D&D, Warhammer)

/**
 * Rol específico de un juego
 * Ejemplos: Top, Mid, Jungle, Support (LoL)
 */
export interface GameRole {
  /** ID único del rol */
  id: string
  /** ID del juego al que pertenece */
  game_id: string
  /** Nombre del rol */
  name: string
  /** Icono representativo (opcional) */
  icon?: string
}

/**
 * Rango/nivel de un juego
 * Ejemplos: Bronce, Plata, Oro, Platino (LoL)
 */
export interface GameRank {
  /** ID único del rango */
  id: string
  /** ID del juego al que pertenece */
  game_id: string
  /** Nombre del rango */
  name: string
  /** Nivel jerárquico (1 = más bajo) */
  tier: number
  /** Icono representativo (opcional) */
  icon?: string
}

// ============================================
// CHAT Y MENSAJES
// ============================================

/**
 * Mensaje del chat
 * Puede ser de usuario o del sistema
 */
export interface Message {
  /** ID único del mensaje (UUID) */
  id: string
  /** ID de la sala donde se envió */
  room_id: string
  /** ID del usuario que envió el mensaje (null = sistema) */
  user_id: string
  /** Contenido del mensaje */
  content: string
  /** Tipo de mensaje */
  type: MessageType
  /** Fecha de envío */
  created_at: string
  // ===== RELACIONES =====
  /** Perfil del usuario que envió el mensaje */
  profile?: Profile
}

/**
 * Tipo de mensaje
 * @property text - Mensaje normal de usuario
 * @property system - Mensaje automático del sistema (ej: "Juan se unió")
 * @property notification - Notificación especial (futuro uso)
 */
export type MessageType = 'text' | 'system' | 'notification'

/**
 * Datos para enviar un mensaje
 */
export interface SendMessageInput {
  /** ID de la sala destino */
  room_id: string
  /** Contenido del mensaje */
  content: string
  /** Tipo de mensaje (opcional, default: 'text') */
  type?: MessageType
}

// ============================================
// VALORACIONES
// ============================================

/**
 * Valoración de un usuario a otro después de una partida
 * Sistema de 5 estrellas obligatorio al finalizar sala
 */
export interface Rating {
  /** ID único de la valoración */
  id: string
  /** ID de la sala donde ocurrió la partida */
  room_id: string
  /** ID del usuario que hace la valoración */
  rater_id: string
  /** ID del usuario valorado */
  rated_user_id: string
  /** Cantidad de estrellas (1-5) */
  stars: 1 | 2 | 3 | 4 | 5
  /** Comentario opcional */
  comment?: string
  /** Fecha de la valoración */
  created_at: string
  // ===== RELACIONES =====
  /** Perfil del usuario que valora */
  rater?: Profile
  /** Perfil del usuario valorado */
  rated_user?: Profile
}

/**
 * Estadísticas de valoración de un usuario
 * Agregación de todas las valoraciones recibidas
 */
export interface RatingStats {
  /** ID del usuario */
  user_id: string
  /** Promedio de estrellas (0.0 - 5.0) */
  average_rating: number
  /** Total de valoraciones recibidas */
  total_ratings: number
  /** Cantidad de valoraciones de 5 estrellas */
  five_star_count: number
  /** Cantidad de valoraciones de 4 estrellas */
  four_star_count: number
  /** Cantidad de valoraciones de 3 estrellas */
  three_star_count: number
  /** Cantidad de valoraciones de 2 estrellas */
  two_star_count: number
  /** Cantidad de valoraciones de 1 estrella */
  one_star_count: number
}

/**
 * Datos para crear una valoración
 */
export interface CreateRatingInput {
  /** ID de la sala completada */
  room_id: string
  /** ID del usuario a valorar */
  rated_user_id: string
  /** Cantidad de estrellas */
  stars: 1 | 2 | 3 | 4 | 5
  /** Comentario opcional */
  comment?: string
}

// ============================================
// FILTROS Y BÚSQUEDA
// ============================================

/**
 * Filtros para búsqueda de salas
 * Todos los campos son opcionales
 */
export interface RoomFilters {
  /** Filtrar por ID de juego */
  game_id?: string
  /** Filtrar por rol requerido */
  role?: string
  /** Filtrar por rango requerido */
  rank?: string
  /** Filtrar por estado de sala */
  status?: RoomStatus
  /** Filtrar por privacidad */
  is_private?: boolean
  /** Búsqueda de texto en título */
  search?: string
}

/**
 * Respuesta paginada genérica
 * Usada para listados grandes de datos
 * @template T - Tipo de los elementos de la respuesta
 */
export interface PaginatedResponse<T> {
  /** Array de elementos */
  data: T[]
  /** Total de elementos disponibles */
  total: number
  /** Página actual (1-indexed) */
  page: number
  /** Elementos por página */
  per_page: number
  /** Total de páginas */
  total_pages: number
}

// ============================================
// NOTIFICACIONES
// ============================================

/**
 * Notificación del sistema
 * Alertas para eventos importantes
 */
export interface Notification {
  /** ID único de la notificación */
  id: string
  /** ID del usuario destinatario */
  user_id: string
  /** Tipo de notificación */
  type: NotificationType
  /** Título corto */
  title: string
  /** Mensaje descriptivo */
  message: string
  /** Datos adicionales (opcional) */
  data?: Record<string, unknown>
  /** Si ya fue leída */
  read: boolean
  /** Fecha de creación */
  created_at: string
}

/**
 * Tipos de notificaciones disponibles
 */
export type NotificationType =
  | 'room_invite'      // Invitación a una sala privada
  | 'room_joined'      // Un usuario se unió a tu sala
  | 'room_starting'    // La partida está por comenzar
  | 'new_rating'       // Recibiste una nueva valoración
  | 'new_message'      // Nuevo mensaje en una sala

