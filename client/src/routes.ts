/**
 * Squad Up - Definición de Rutas y Endpoints
 *
 * Este archivo centraliza todas las rutas del frontend.
 * Arquitectura: MVC (Model-View-Controller)
 */

// ============================================
// RUTAS DEL FRONTEND (React Router)
// ============================================
export const ROUTES = {
  // Rutas públicas
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',

  // Rutas protegidas (requieren autenticación)
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  PROFILE_EDIT: '/profile/edit',

  // Salas de juego
  ROOMS: '/rooms',
  ROOM_CREATE: '/rooms/create',
  ROOM_DETAIL: '/rooms/:roomId',
  ROOM_CHAT: '/rooms/:roomId/chat',

  // Búsqueda
  SEARCH: '/search',

  // Valoraciones
  RATINGS: '/ratings',
  USER_RATINGS: '/ratings/:userId',

  // Misc
  NOT_FOUND: '*',
} as const

// ============================================
// ENDPOINTS DE LA API (Backend)
// ============================================
export const API_ENDPOINTS = {
  // Autenticación
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
    ME: '/api/auth/me',
  },

  // Perfiles de usuario
  PROFILES: {
    BASE: '/api/profiles',
    BY_ID: (id: string) => `/api/profiles/${id}`,
    ME: '/api/profiles/me',
  },

  // Salas de juego
  ROOMS: {
    BASE: '/api/rooms',
    BY_ID: (id: string) => `/api/rooms/${id}`,
    JOIN: (id: string) => `/api/rooms/${id}/join`,
    LEAVE: (id: string) => `/api/rooms/${id}/leave`,
    CLOSE: (id: string) => `/api/rooms/${id}/close`,
    PARTICIPANTS: (id: string) => `/api/rooms/${id}/participants`,
  },

  // Búsqueda
  SEARCH: {
    ROOMS: '/api/search/rooms',
  },

  // Chat
  CHAT: {
    MESSAGES: (roomId: string) => `/api/rooms/${roomId}/messages`,
  },

  // Valoraciones
  RATINGS: {
    BASE: '/api/ratings',
    BY_ROOM: (roomId: string) => `/api/ratings/room/${roomId}`,
    BY_USER: (userId: string) => `/api/ratings/user/${userId}`,
  },

  // Juegos
  GAMES: {
    BASE: '/api/games',
    BY_ID: (id: string) => `/api/games/${id}`,
  },
} as const

// ============================================
// UTILIDADES PARA RUTAS
// ============================================

/**
 * Genera la ruta detallada de una sala con el ID
 */
export const getRoomRoute = (roomId: string): string =>
  ROUTES.ROOM_DETAIL.replace(':roomId', roomId)

/**
 * Genera la ruta del chat de una sala
 */
export const getRoomChatRoute = (roomId: string): string =>
  ROUTES.ROOM_CHAT.replace(':roomId', roomId)

/**
 * Genera la ruta de valoraciones de un usuario
 */
export const getUserRatingsRoute = (userId: string): string =>
  ROUTES.USER_RATINGS.replace(':userId', userId)

/**
 * Verifica si una ruta requiere autenticación
 */
export const isProtectedRoute = (path: string): boolean => {
  const protectedRoutes = [
    ROUTES.DASHBOARD,
    ROUTES.PROFILE,
    ROUTES.PROFILE_EDIT,
    ROUTES.ROOM_CREATE,
    ROUTES.ROOM_CHAT,
    ROUTES.RATINGS,
  ]

  return protectedRoutes.some(route => {
    const regex = new RegExp('^' + route.replace(/:\w+/g, '[^/]+') + '$')
    return regex.test(path)
  })
}
