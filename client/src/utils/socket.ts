/**
 * Conexión al servidor WebSocket
 */
import { io } from 'socket.io-client'

// URL del servidor (ajusta el puerto si es diferente)
const SOCKET_URL = 'http://localhost:3001'

// Crear conexión
const socket = io(SOCKET_URL)

export default socket
