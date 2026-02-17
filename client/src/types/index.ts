/**
 * Squad Up - Tipos principales de la aplicación
 */

// ============================================
// USUARIO Y AUTENTICACIÓN
// ============================================
export interface User {
  id: string
  email: string
  created_at: string
  last_sign_in_at?: string
}

export interface Profile {
  id: string
  user_id: string
  username: string
  display_name: string
  avatar_url?: string
  bio?: string
  country?: string
  language?: string
  timezone?: string
  discord_username?: string
  preferred_game_style: GameStyle[]
  created_at: string
  updated_at: string
}

export type GameStyle = 'casual' | 'competitivo' | 'hardcore'

// ============================================
// SALAS DE JUEGO
// ============================================
export type RoomStatus = 'active' | 'full' | 'in_progress' | 'completed' | 'cancelled'

export interface Room {
  id: string
  creator_id: string
  game_id: string
  title: string
  description?: string
  max_participants: number
  current_participants: number
  role_required?: string
  rank_required?: string
  status: RoomStatus
  is_private: boolean
  invite_code?: string
  scheduled_at?: string
  created_at: string
  updated_at: string
  // Relaciones
  game?: Game
  creator?: Profile
  participants?: RoomParticipant[]
}

export interface RoomParticipant {
  id: string
  room_id: string
  user_id: string
  role: string
  joined_at: string
  // Relaciones
  profile?: Profile
}

export interface CreateRoomInput {
  game_id: string
  title: string
  description?: string
  max_participants: number
  role_required?: string
  rank_required?: string
  is_private?: boolean
  scheduled_at?: string
}

// ============================================
// JUEGOS
// ============================================
export interface Game {
  id: string
  name: string
  slug: string
  icon_url?: string
  genre: GameGenre
  max_players: number
  has_roles: boolean
  has_ranks: boolean
  roles?: GameRole[]
  ranks?: GameRank[]
}

export type GameGenre =
  | 'moba'
  | 'mmorpg'
  | 'fps'
  | 'coop'
  | 'strategy'
  | 'card_game'
  | 'tabletop'

export interface GameRole {
  id: string
  game_id: string
  name: string
  icon?: string
}

export interface GameRank {
  id: string
  game_id: string
  name: string
  tier: number
  icon?: string
}

// ============================================
// CHAT Y MENSAJES
// ============================================
export interface Message {
  id: string
  room_id: string
  user_id: string
  content: string
  type: MessageType
  created_at: string
  // Relaciones
  profile?: Profile
}

export type MessageType = 'text' | 'system' | 'notification'

export interface SendMessageInput {
  room_id: string
  content: string
  type?: MessageType
}

// ============================================
// VALORACIONES
// ============================================
export interface Rating {
  id: string
  room_id: string
  rater_id: string
  rated_user_id: string
  stars: 1 | 2 | 3 | 4 | 5
  comment?: string
  created_at: string
  // Relaciones
  rater?: Profile
  rated_user?: Profile
}

export interface RatingStats {
  user_id: string
  average_rating: number
  total_ratings: number
  five_star_count: number
  four_star_count: number
  three_star_count: number
  two_star_count: number
  one_star_count: number
}

export interface CreateRatingInput {
  room_id: string
  rated_user_id: string
  stars: 1 | 2 | 3 | 4 | 5
  comment?: string
}

// ============================================
// FILTROS Y BÚSQUEDA
// ============================================
export interface RoomFilters {
  game_id?: string
  role?: string
  rank?: string
  status?: RoomStatus
  is_private?: boolean
  search?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  per_page: number
  total_pages: number
}

// ============================================
// NOTIFICACIONES
// ============================================
export interface Notification {
  id: string
  user_id: string
  type: NotificationType
  title: string
  message: string
  data?: Record<string, unknown>
  read: boolean
  created_at: string
}

export type NotificationType =
  | 'room_invite'
  | 'room_joined'
  | 'room_starting'
  | 'new_rating'
  | 'new_message'

