/**
 * Squad Up - Constantes de la aplicación
 */

// ============================================
// CONFIGURACIÓN GENERAL
// ============================================
export const APP_CONFIG = {
  NAME: 'Squad Up',
  VERSION: '1.0.0',
  DESCRIPTION: 'Encuentra tu equipo perfecto',
  MAX_UPLOAD_SIZE: 5 * 1024 * 1024, // 5MB
  SUPPORTED_IMAGE_FORMATS: ['image/jpeg', 'image/png', 'image/webp'],
} as const

// ============================================
// LÍMITES DE LA APLICACIÓN
// ============================================
export const LIMITS = {
  // Salas
  MAX_PARTICIPANTS_PER_ROOM: 5,
  MIN_PARTICIPANTS_PER_ROOM: 2,

  // Mensajes
  MAX_MESSAGE_LENGTH: 500,
  MESSAGES_PER_PAGE: 50,

  // Perfil
  MIN_USERNAME_LENGTH: 3,
  MAX_USERNAME_LENGTH: 20,
  MAX_BIO_LENGTH: 300,

  // Valoraciones
  MIN_RATING_STARS: 1,
  MAX_RATING_STARS: 5,
  MAX_RATING_COMMENT_LENGTH: 200,

  // Búsqueda
  ROOMS_PER_PAGE: 20,
  MAX_SEARCH_RESULTS: 100,
} as const

// ============================================
// ESTADOS DE SALA
// ============================================
export const ROOM_STATUS_LABELS: Record<string, string> = {
  active: 'Activa',
  full: 'Completa',
  in_progress: 'En partida',
  completed: 'Finalizada',
  cancelled: 'Cancelada',
} as const

export const ROOM_STATUS_COLORS: Record<string, string> = {
  active: 'green',
  full: 'yellow',
  in_progress: 'blue',
  completed: 'gray',
  cancelled: 'red',
} as const

// ============================================
// ESTILOS DE JUEGO
// ============================================
export const GAME_STYLES: Record<string, { label: string; description: string }> = {
  casual: {
    label: 'Casual',
    description: 'Juego relajado, sin presión',
  },
  competitivo: {
    label: 'Competitivo',
    description: 'Busca ganar pero con buena onda',
  },
  hardcore: {
    label: 'Hardcore',
    description: 'Juego serio, meta y estrategia',
  },
} as const

// ============================================
// GÉNEROS DE JUEGOS
// ============================================
export const GAME_GENRES: Record<string, string> = {
  moba: 'MOBA',
  mmorpg: 'MMORPG',
  fps: 'FPS / Shooter',
  coop: 'Cooperativo',
  strategy: 'Estrategia',
  card_game: 'Juego de Cartas',
  tabletop: 'Mesa / Tablero',
} as const

// ============================================
// MENSAJES DE ERROR
// ============================================
export const ERROR_MESSAGES = {
  // Autenticación
  INVALID_CREDENTIALS: 'Email o contraseña incorrectos',
  EMAIL_ALREADY_EXISTS: 'Este email ya está registrado',
  WEAK_PASSWORD: 'La contraseña debe tener al menos 8 caracteres',
  INVALID_EMAIL: 'El formato del email no es válido',

  // Salas
  ROOM_NOT_FOUND: 'La sala no existe o ha sido eliminada',
  ROOM_FULL: 'La sala está completa',
  ROOM_PRIVATE: 'Esta sala es privada, necesitas una invitación',
  ALREADY_IN_ROOM: 'Ya estás en esta sala',
  NOT_IN_ROOM: 'No perteneces a esta sala',

  // Perfil
  USERNAME_TAKEN: 'Este nombre de usuario ya está en uso',
  INVALID_USERNAME: 'El nombre de usuario solo puede contener letras, números y guiones bajos',

  // Valoraciones
  CANNOT_RATE_SELF: 'No puedes valorarte a ti mismo',
  ALREADY_RATED: 'Ya has valorado a este usuario en esta partida',
  ROOM_NOT_COMPLETED: 'Solo puedes valorar después de finalizar la partida',

  // General
  NETWORK_ERROR: 'Error de conexión. Verifica tu conexión a internet',
  UNKNOWN_ERROR: 'Ha ocurrido un error inesperado',
} as const

// ============================================
// MENSAJES DE ÉXITO
// ============================================
export const SUCCESS_MESSAGES = {
  // Autenticación
  REGISTER_SUCCESS: 'Cuenta creada correctamente',
  LOGIN_SUCCESS: 'Sesión iniciada correctamente',
  LOGOUT_SUCCESS: 'Sesión cerrada correctamente',
  PASSWORD_RESET_SENT: 'Se ha enviado un email para restablecer tu contraseña',

  // Salas
  ROOM_CREATED: 'Sala creada correctamente',
  ROOM_JOINED: 'Te has unido a la sala',
  ROOM_LEFT: 'Has salido de la sala',
  ROOM_CLOSED: 'La sala ha sido cerrada',

  // Perfil
  PROFILE_UPDATED: 'Perfil actualizado correctamente',

  // Valoraciones
  RATING_SUBMITTED: 'Valoración enviada correctamente',
} as const

// ============================================
// LOCAL STORAGE KEYS
// ============================================
export const STORAGE_KEYS = {
  THEME: 'squadup_theme',
  LAST_SEARCH: 'squadup_last_search',
  SIDEBAR_COLLAPSED: 'squadup_sidebar_collapsed',
} as const
