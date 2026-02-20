/**
 * SQUAD UP - Exportaciones principales de componentes
 * ==============================
 *
 * Este archivo centraliza todas las exportaciones de componentes.
 * Permite importar desde una sola ruta:
 *
 * @example
 * ```tsx
 * // En lugar de:
 * import { Button } from './components/ui/Button'
 * import { Navbar } from './components/layout/Navbar'
 *
 * // Puedes hacer:
 * import { Button, Navbar } from './components'
 * ```
 *
 * @module components
 * @author Squad Up Team
 */

// Componentes de UI reutilizables (Button, Input, Card, Avatar, etc.)
export * from './ui'

// Componentes de layout (Navbar, GameSidebar, paneles de auth)
export * from './layout'

// Componentes de formularios (AuthPage, campos de formulario)
export * from './forms'

// Componentes de salas (RoomCard, RoomsList, RoomView, CreateRoomModal)
export * from './rooms'

// Componentes de chat (ChatPanel, RoomChat)
export * from './chat'

// Componentes comunes (Dashboard, LoadingScreen)
export * from './common'
