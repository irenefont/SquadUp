/**
 * SQUAD UP - Definición de Rutas y Endpoints
 * ==============================
 *
 * Este archivo centraliza todas las rutas del frontend y los endpoints
 * de la API. Facilita el mantenimiento y evita strings mágicos.
 *
 * CATEGORÍAS:
 * - ROUTES: Rutas del frontend (React Router)
 * - API_ENDPOINTS: Endpoints del backend
 *
 * ARQUITECTURA: MVC (Model-View-Controller)
 *
 * @module routes
 * @author Squad Up Team
 */

// ============================================
// RUTAS DEL FRONTEND (React Router)
// ============================================

/**
 * Rutas de la aplicación frontend
 * Usadas con React Router para navegación
 */
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

/**
 * Endpoints de la API del backend
 * Funciones factory para generar URLs dinámicas
 */
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
 * @param roomId - ID de la sala
 * @returns Ruta completa (ej: '/rooms/abc-123')
 */
export const getRoomRoute = (roomId: string): string =>
  ROUTES.ROOM_DETAIL.replace(':roomId', roomId)

/**
 * Genera la ruta del chat de una sala
 * @param roomId - ID de la sala
 * @returns Ruta del chat (ej: '/rooms/abc-123/chat')
 */
export const getRoomChatRoute = (roomId: string): string =>
  ROUTES.ROOM_CHAT.replace(':roomId', roomId)

/**
 * Genera la ruta de valoraciones de un usuario
 * @param userId - ID del usuario
 * @returns Ruta de valoraciones (ej: '/ratings/abc-123')
 */
export const getUserRatingsRoute = (userId: string): string =>
  ROUTES.USER_RATINGS.replace(':userId', userId)

/**
 * Verifica si una ruta requiere autenticación
 * Útil para proteger rutas y redirigir a login si es necesario
 *
 * @param path - Ruta a verificar
 * @returns true si requiere autenticación, false si es pública
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
