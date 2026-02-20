/**
 * SQUAD UP - Constantes de la aplicación
 * ==============================
 *
 * Este archivo centraliza todas las constantes y valores de configuración
 * utilizados en toda la aplicación. Centralizar estos valores facilita:
 * - Mantenimiento: Cambios en un solo lugar
 * - Consistencia: Mismos valores en toda la app
 * - Documentación: Propósito claro de cada valor
 *
 * CATEGORÍAS:
 * - APP_CONFIG: Configuración general de la aplicación
 * - LIMITS: Límites y restricciones (salas, mensajes, perfiles)
 * - ROOM_STATUS_*: Etiquetas y colores para estados de sala
 * - GAME_STYLES/GENRES: Estilos y géneros de juegos
 * - MESSAGES: Mensajes de error y éxito para el usuario
 * - STORAGE_KEYS: Claves para localStorage
 *
 * @module constants
 * @author Squad Up Team
 */

// ============================================
// CONFIGURACIÓN GENERAL
// ============================================

/**
 * Configuración general de la aplicación
 * Valores globales que definen el comportamiento de Squad Up
 */
export const APP_CONFIG = {
  /** Nombre de la aplicación */
  NAME: 'Squad Up',
  /** Versión actual */
  VERSION: '1.0.0',
  /** Eslogan o descripción corta */
  DESCRIPTION: 'Encuentra tu equipo perfecto',
  /** Tamaño máximo de archivos a subir (5MB) */
  MAX_UPLOAD_SIZE: 5 * 1024 * 1024,
  /** Formatos de imagen soportados para avatares */
  SUPPORTED_IMAGE_FORMATS: ['image/jpeg', 'image/png', 'image/webp'],
} as const

// ============================================
// LÍMITES DE LA APLICACIÓN
// ============================================

/**
 * Límites y restricciones de la aplicación
 * Define los valores máximos y mínimos para diferentes entidades
 */
export const LIMITS = {
  // ===== SALAS =====
  /** Máximo de participantes por sala */
  MAX_PARTICIPANTS_PER_ROOM: 5,
  /** Mínimo de participantes para crear sala */
  MIN_PARTICIPANTS_PER_ROOM: 2,

  // ===== MENSAJES =====
  /** Longitud máxima de un mensaje de chat */
  MAX_MESSAGE_LENGTH: 500,
  /** Mensajes por página al paginar */
  MESSAGES_PER_PAGE: 50,

  // ===== PERFIL =====
  /** Longitud mínima del nombre de usuario */
  MIN_USERNAME_LENGTH: 3,
  /** Longitud máxima del nombre de usuario */
  MAX_USERNAME_LENGTH: 20,
  /** Longitud máxima de la biografía */
  MAX_BIO_LENGTH: 300,

  // ===== VALORACIONES =====
  /** Mínimo de estrellas (sistema de valoración) */
  MIN_RATING_STARS: 1,
  /** Máximo de estrellas (sistema de valoración) */
  MAX_RATING_STARS: 5,
  /** Longitud máxima del comentario de valoración */
  MAX_RATING_COMMENT_LENGTH: 200,

  // ===== BÚSQUEDA =====
  /** Salas por página al buscar */
  ROOMS_PER_PAGE: 20,
  /** Máximo de resultados de búsqueda */
  MAX_SEARCH_RESULTS: 100,
} as const

// ============================================
// ESTADOS DE SALA
// ============================================

/**
 * Etiquetas legibles para los estados de sala
 * Usadas en la UI para mostrar el estado actual
 */
export const ROOM_STATUS_LABELS: Record<string, string> = {
  active: 'Activa',           // Sala abierta, aceptando jugadores
  full: 'Completa',           // Sala llena, no acepta más
  in_progress: 'En partida',  // Partida en curso
  completed: 'Finalizada',    // Partida terminada
  cancelled: 'Cancelada',     // Sala cancelada
} as const

/**
 * Colores asociados a cada estado de sala
 * Usados para indicadores visuales (badges, iconos)
 */
export const ROOM_STATUS_COLORS: Record<string, string> = {
  active: 'green',      // Verde = disponible
  full: 'yellow',       // Amarillo = advertencia
  in_progress: 'blue',  // Azul = en curso
  completed: 'gray',    // Gris = finalizado
  cancelled: 'red',     // Rojo = cancelado
} as const

// ============================================
// ESTILOS DE JUEGO
// ============================================

/**
 * Estilos de juego disponibles
 * Define cómo le gusta jugar a un usuario
 */
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

/**
 * Géneros de juegos soportados
 * Etiquetas legibles para mostrar en la UI
 */
export const GAME_GENRES: Record<string, string> = {
  moba: 'MOBA',              // Multiplayer Online Battle Arena
  mmorpg: 'MMORPG',          // Massively Multiplayer Online RPG
  fps: 'FPS / Shooter',      // First Person Shooter
  coop: 'Cooperativo',       // Juegos cooperativos
  strategy: 'Estrategia',    // Juegos de estrategia
  card_game: 'Juego de Cartas', // TCG, CCG
  tabletop: 'Mesa / Tablero',   // D&D, Warhammer
} as const

// ============================================
// MENSAJES DE ERROR
// ============================================

/**
 * Mensajes de error para mostrar al usuario
 * Organizados por categoría para fácil mantenimiento
 */
export const ERROR_MESSAGES = {
  // ===== AUTENTICACIÓN =====
  /** Credenciales inválidas */
  INVALID_CREDENTIALS: 'Email o contraseña incorrectos',
  /** Email ya registrado */
  EMAIL_ALREADY_EXISTS: 'Este email ya está registrado',
  /** Contraseña muy corta */
  WEAK_PASSWORD: 'La contraseña debe tener al menos 8 caracteres',
  /** Formato de email inválido */
  INVALID_EMAIL: 'El formato del email no es válido',

  // ===== SALAS =====
  /** Sala no encontrada */
  ROOM_NOT_FOUND: 'La sala no existe o ha sido eliminada',
  /** Sala llena */
  ROOM_FULL: 'La sala está completa',
  /** Sala privada sin invitación */
  ROOM_PRIVATE: 'Esta sala es privada, necesitas una invitación',
  /** Usuario ya está en la sala */
  ALREADY_IN_ROOM: 'Ya estás en esta sala',
  /** Usuario no está en la sala */
  NOT_IN_ROOM: 'No perteneces a esta sala',

  // ===== PERFIL =====
  /** Username ya existe */
  USERNAME_TAKEN: 'Este nombre de usuario ya está en uso',
  /** Formato de username inválido */
  INVALID_USERNAME: 'El nombre de usuario solo puede contener letras, números y guiones bajos',

  // ===== VALORACIONES =====
  /** Intento de auto-valorarse */
  CANNOT_RATE_SELF: 'No puedes valorarte a ti mismo',
  /** Ya valoró en esta partida */
  ALREADY_RATED: 'Ya has valorado a este usuario en esta partida',
  /** Sala no finalizada */
  ROOM_NOT_COMPLETED: 'Solo puedes valorar después de finalizar la partida',

  // ===== GENERAL =====
  /** Error de red */
  NETWORK_ERROR: 'Error de conexión. Verifica tu conexión a internet',
  /** Error genérico */
  UNKNOWN_ERROR: 'Ha ocurrido un error inesperado',
} as const

// ============================================
// MENSAJES DE ÉXITO
// ============================================

/**
 * Mensajes de éxito para mostrar al usuario
 * Usados en toasts, alertas y confirmaciones
 */
export const SUCCESS_MESSAGES = {
  // ===== AUTENTICACIÓN =====
  /** Registro exitoso */
  REGISTER_SUCCESS: 'Cuenta creada correctamente',
  /** Login exitoso */
  LOGIN_SUCCESS: 'Sesión iniciada correctamente',
  /** Logout exitoso */
  LOGOUT_SUCCESS: 'Sesión cerrada correctamente',
  /** Email de recuperación enviado */
  PASSWORD_RESET_SENT: 'Se ha enviado un email para restablecer tu contraseña',

  // ===== SALAS =====
  /** Sala creada */
  ROOM_CREATED: 'Sala creada correctamente',
  /** Unido a sala */
  ROOM_JOINED: 'Te has unido a la sala',
  /** Salió de sala */
  ROOM_LEFT: 'Has salido de la sala',
  /** Sala cerrada */
  ROOM_CLOSED: 'La sala ha sido cerrada',

  // ===== PERFIL =====
  /** Perfil actualizado */
  PROFILE_UPDATED: 'Perfil actualizado correctamente',

  // ===== VALORACIONES =====
  /** Valoración enviada */
  RATING_SUBMITTED: 'Valoración enviada correctamente',
} as const

// ============================================
// LOCAL STORAGE KEYS
// ============================================

/**
 * Claves para almacenamiento en localStorage
 * Prefijadas con 'squadup_' para evitar colisiones
 */
export const STORAGE_KEYS = {
  /** Preferencia de tema (light/dark) */
  THEME: 'squadup_theme',
  /** Última búsqueda realizada */
  LAST_SEARCH: 'squadup_last_search',
  /** Estado del sidebar (colapsado/expandido) */
  SIDEBAR_COLLAPSED: 'squadup_sidebar_collapsed',
} as const
