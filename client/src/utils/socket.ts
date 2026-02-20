/**
 * SQUAD UP - Cliente Socket.io
 * ==============================
 *
 * Este archivo configura y exporta el cliente de Socket.io.
 * Socket.io proporciona comunicación bidireccional en tiempo real
 * entre el cliente y el servidor.
 *
 * USOS EN SQUAD UP:
 * - Chat global en tiempo real
 * - Chat de salas
 * - Notificaciones de usuarios uniéndose/saliendo
 *
 * FUNCIONAMIENTO:
 * 1. El cliente se conecta al servidor Socket.io
 * 2. Puede emitir eventos (socket.emit)
 * 3. Puede escuchar eventos del servidor (socket.on)
 *
 * SERVIDOR:
 * El servidor Socket.io corre en el backend (server/index.ts)
 * Por defecto en http://localhost:3001
 *
 * @module utils/socket
 * @author Squad Up Team
 */

import { io } from 'socket.io-client'

// URL del servidor Socket.io
// En desarrollo: localhost:3001
// En producción: URL del servidor desplegado
const SOCKET_URL = 'http://localhost:3001'

// Cliente de Socket.io configurado
// Se conecta automáticamente al importar este módulo
const socket = io(SOCKET_URL)

export default socket
