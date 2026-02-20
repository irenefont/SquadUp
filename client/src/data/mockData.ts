/**
 * SQUAD UP - Datos de ejemplo
 * Videojuegos y datos de referencia para desarrollo
 */

export interface Game {
  id: string
  name: string
  image: string | null
}

export interface Room {
  id: string
  title: string
  game: string
  description: string
  maxPlayers: number
  rank: string
  roles: string[]
  host: string
  hostEmail: string
  createdAt: Date
}

export const GAMES = [
  { id: 'lol', name: 'League of Legends', image: '/lol_logo.png' },
  { id: 'valorant', name: 'Valorant', image: '/valorant_logo.png' },
  { id: 'wow', name: 'World of Warcraft', image: '/wow_logo.png' },
  { id: 'apex', name: 'Apex Legends', image: '/apex_logo.png' },
]

// Rangos comunes para juegos competitivos
export const RANKS = [
  'Sin rango',
  'Hierro',
  'Bronce',
  'Plata',
  'Oro',
  'Platino',
  'Diamante',
  'Master',
  'Grandmaster',
  'Challenger',
]

// Roles comunes
export const ROLES = [
  'Top',
  'Jungle',
  'Mid',
  'ADC',
  'Support',
  'Tank',
  'DPS',
  'Healer',
  'Flex',
]
