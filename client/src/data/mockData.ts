/**
 * SQUAD UP - Datos de ejemplo
 * Videojuegos y salas de prueba para desarrollo
 */

export interface Game {
  id: number
  name: string
  image: string | null
}

export interface Room {
  id: number
  title: string
  host: string
  gameId?: number
}

export const GAMES: Game[] = [
  { id: 1, name: 'League of Legends', image: null },
  { id: 2, name: 'Valorant', image: null },
  { id: 3, name: 'World of Warcraft', image: null },
  { id: 4, name: 'Apex Legends', image: null },
]

export const ROOMS: Room[] = [
  { id: 1, title: 'BUSCO SUPPORT - Platino', host: 'Player1', gameId: 1 },
  { id: 2, title: 'Ranked Duo - Gold II', host: 'Player2', gameId: 1 },
  { id: 3, title: 'Busco ADC para ranked', host: 'Player3', gameId: 1 },
  { id: 4, title: 'Normal casual - Divertirse', host: 'Player4', gameId: 2 },
  { id: 5, title: 'Practicar en bot game', host: 'Player5', gameId: 1 },
]
