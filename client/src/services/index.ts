/**
 * SQUAD UP - Servicios
 * ====================
 *
 * Este directorio contiene todos los servicios para interactuar con Supabase.
 *
 * ARQUITECTURA:
 * Los servicios actúan como capa de abstracción entre los componentes React
 * y la base de datos Supabase. Cada servicio maneja un dominio específico.
 *
 * SERVICIOS DISPONIBLES:
 *
 * 1. auth.service.ts - Autenticación de usuarios
 *    - signInWithGoogle(), signUpWithEmail(), signInWithEmail()
 *    - signOut(), getSession(), getUser()
 *    - onAuthStateChange()
 *
 * 2. room.service.ts - Gestión de salas de juego
 *    - getRooms(), getRoomById()
 *    - createRoom(), deleteRoom()
 *    - joinRoom(), leaveRoom()
 *    - updateRoomStatus(), subscribeToRooms()
 *
 * 3. chat.service.ts - Chat de salas con persistencia
 *    - getMessages(), sendMessage()
 *    - sendSystemMessage(), subscribeToMessages()
 *
 * 4. game.service.ts - Catálogo de juegos
 *    - getGames(), getGameBySlug(), getGameById()
 *
 * PATRONES DE USO:
 *
 * // 1. Obtener datos al montar componente
 * useEffect(() => {
 *   const loadData = async () => {
 *     const rooms = await getRooms({ status: 'active' })
 *     setRooms(rooms)
 *   }
 *   loadData()
 * }, [])
 *
 * // 2. Suscribirse a cambios en tiempo real
 * useEffect(() => {
 *   const unsubscribe = subscribeToRooms(() => loadRooms())
 *   return () => unsubscribe()
 * }, [])
 *
 * // 3. Acciones de usuario
 * const handleJoin = async () => {
 *   const result = await joinRoom(roomId, userId)
 *   if (result.success) {
 *     // Actualizar UI
 *   } else {
 *     alert(result.error)
 *   }
 * }
 *
 * TIPOS EXPORTADOS:
 * - RoomWithData, RoomPlayer (room.service)
 * - MessageWithData (chat.service)
 * - GameWithDetails (game.service)
 *
 * @module services
 */

// Re-exportar todo desde los servicios individuales
export * from './room.service'
export * from './chat.service'
export * from './game.service'
