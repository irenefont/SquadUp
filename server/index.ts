/**
 * SQUAD UP - Servidor WebSocket con Socket.io
 *
 * Este servidor maneja la comunicación en tiempo real para el chat.
 * Utiliza Socket.io sobre un servidor HTTP de Node.js con Express.
 *
 * ARQUITECTURA:
 * ┌─────────────────────────────────────────────────────────────┐
 * │  Express App (HTTP)                                         │
 * │  ├── Rutas REST (futuro: autenticación, API)               │
 * │  └── Middleware (CORS, JSON, Logger)                       │
 * │                                                             │
 * │  HTTP Server (Node.js)                                     │
 * │  └── Maneja conexiones HTTP básicas                        │
 * │                                                             │
 * │  Socket.io Server                                          │
 * │  └── Maneja conexiones WebSocket en tiempo real            │
 * │      ├── Evento: connection (nuevo cliente)                │
 * │      ├── Evento: message (recibir mensajes)                │
 * │      └── io.emit() (reenviar a todos)                      │
 * └─────────────────────────────────────────────────────────────┘
 */

import express from 'express';
import cors from 'cors';
import logger from 'morgan';

import { Server } from "socket.io"
import { createServer } from "node:http"

const app = express();

// Crear servidor HTTP nativo de Node.js
// Socket.io necesita un servidor HTTP para funcionar
const server = createServer(app);

/**
 * CONFIGURACIÓN DE SOCKET.IO
 *
 * CORS EN SOCKET.IO (¡DIFERENTE AL CORS DE EXPRESS!)
 * ─────────────────────────────────────────────────────
 *
 * ¿Qué es CORS?
 * CORS (Cross-Origin Resource Sharing) es un mecanismo de seguridad
 * del navegador que bloquea peticiones desde un origen (dominio/puerto)
 * diferente al del servidor.
 *
 * Ejemplo del problema:
 * - Frontend corre en: http://localhost:5173 (Vite)
 * - Backend corre en:  http://localhost:3001 (Express)
 * - Son ORÍGENES DIFERENTES → El navegador bloquea la conexión
 *
 * ¿Por qué Socket.io necesita su propio CORS?
 * - app.use(cors()) → Solo afecta a las rutas HTTP de Express
 * - Socket.io usa WebSocket, que es un protocolo DIFERENTE
 * - Por eso configuramos CORS dentro de new Server()
 *
 * Configuración:
 * - origin: URL del frontend que puede conectarse
 * - methods: Métodos HTTP permitidos (WebSocket usa GET para handshake,
 *            y POST para polling de respaldo)
 */
const io = new Server(server, {
  cors: {
    // URL del frontend (Vite corre en puerto 5173 por defecto)
    origin: "http://localhost:5173",

    // Métodos HTTP permitidos para el handshake inicial de WebSocket
    // GET: Establecer conexión WebSocket
    // POST: Polling de respaldo (si WebSocket no está disponible)
    methods: ["GET", "POST"]
  },

  /**
   * RECUPERACIÓN DE ESTADO DE CONEXIÓN
   *
   * Permite que clientes que se desconectan temporalmente (ej: pierden WiFi)
   * recuperen los mensajes que se perdieron durante la desconexión.
   *
   * - maxDisconnectionDuration: Tiempo máximo para recuperar (2 min)
   * - Si vuelven a conectar antes de 2 min, reciben mensajes perdidos
   */
  connectionStateRecovery: {
    maxDisconnectionDuration: 2 * 60 * 1000, // 2 minutos en milisegundos
  }
});

/**
 * CORS DE EXPRESS
 * Este CORS es para las rutas HTTP normales (GET /, POST /api/*, etc.)
 * NO afecta a las conexiones WebSocket de Socket.io
 */
app.use(cors());
app.use(express.json());
app.use(logger('dev'));

/**
 * MANEJO DE CONEXIONES SOCKET.IO
 *
 * io.on("connection", callback) → Se ejecuta CADA VEZ que un cliente se conecta
 * El callback recibe el objeto `socket` que representa la conexión con ese cliente.
 *
 * EVENTOS:
 * - socket.on(evento, callback) → Escuchar eventos de ESTE cliente
 * - socket.emit(evento, datos)  → Enviar evento SOLO a este cliente
 * - io.emit(evento, datos)      → Enviar evento a TODOS los clientes
 * - socket.broadcast.emit()     → Enviar a todos EXCEPTO a este cliente
 */
io.on("connection", (socket) => {
  console.log("Cliente conectado:", socket.id);

  /**
   * RECIBIR Y REENVIAR MENSAJES (CHAT GLOBAL)
   *
   * Flujo:
   * 1. Cliente A envía: socket.emit('message', datos)
   * 2. Servidor recibe: socket.on('message', callback)
   * 3. Servidor reenvía: io.emit('message', datos)
   * 4. Todos los clientes reciben: socket.on('message', callback)
   *
   * Usamos io.emit() para que TODOS los clientes reciban el mensaje,
   * incluyendo al que lo envió.
   */
  
  // ===== CHAT GLOBAL =====
  socket.on("message", (message) => {
    console.log("Mensaje recibido:", message);

    // Reenviar el mensaje a TODOS los clientes conectados
    io.emit("message", message);
  });

  // ===== CHAT DE SALA =====
  socket.on("join-room", (roomId) => {
      socket.join(roomId)
      console.log(`Cliente ${socket.id} se unió a la sala ${roomId}`);
  });

  socket.on("room-message", ({ roomId, message }) => {
      console.log(`Mensaje recibido en sala ${roomId}:`, message);
      io.to(roomId).emit("room-message", message)
  });

  socket.on("leave-room", (roomId) => {
      socket.leave(roomId)
      console.log(`Cliente ${socket.id} dejó la sala ${roomId}`);
    })
});

const PORT = process.env.PORT || 3001;

// Ruta de prueba para verificar que el servidor está funcionando
app.get('/', (_req, res) => {
  res.send('Servidor Express + TS funcionando');
});

// Iniciar el servidor
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});