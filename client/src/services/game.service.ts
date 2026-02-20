/**
 * SQUAD UP - Servicio de Juegos
 * ==============================
 *
 * Este servicio gestiona el catálogo de juegos disponibles en la plataforma.
 *
 * RESPONSABILIDADES:
 * - Obtener lista de juegos disponibles
 * - Obtener juegos con sus roles y rangos
 * - Buscar juegos por slug o ID
 *
 * TABLAS DE BASE DE DATOS UTILIZADAS:
 * - games: Catálogo principal de juegos
 * - game_roles: Roles disponibles por juego (ej: Top, Mid, Jungle en LoL)
 * - game_ranks: Rangos disponibles por juego (ej: Bronce, Plata, Oro en LoL)
 *
 * EJEMPLO DE USO:
 * ```tsx
 * import { getGames, getGameBySlug } from './services/game.service'
 *
 * // Obtener todos los juegos
 * const games = await getGames()
 *
 * // Buscar un juego específico
 * const lol = await getGameBySlug('league-of-legends')
 * console.log(lol?.roles) // [{ name: 'Top' }, { name: 'Mid' }, ...]
 * console.log(lol?.ranks) // [{ name: 'Bronce', tier: 1 }, ...]
 * ```
 *
 * @module services/game.service
 * @author Squad Up Team
 */

import supabase from '../utils/supabase'
import type { Game, GameRole, GameRank } from '../types'

/**
 * Juego con sus roles y rangos incluidos
 * Extiende la interfaz Game base con las relaciones
 */
export interface GameWithDetails extends Game {
  /** Roles disponibles para este juego */
  roles?: GameRole[]
  /** Rangos disponibles para este juego, ordenados por tier */
  ranks?: GameRank[]
}

/**
 * Obtiene todos los juegos disponibles en la plataforma
 *
 * Incluye los roles y rangos disponibles para cada juego.
 * Los rangos vienen ordenados por tier (de menor a mayor).
 *
 * @returns Array de juegos con sus detalles, vacío si hay error
 *
 * @example
 * ```tsx
 * const games = await getGames()
 *
 * games.forEach(game => {
 *   console.log(`${game.name} (${game.genre})`)
 *   console.log(`  Max players: ${game.max_players}`)
 *   console.log(`  Roles: ${game.roles?.map(r => r.name).join(', ')}`)
 * })
 * ```
 */
export async function getGames(): Promise<GameWithDetails[]> {
  try {
    // Query con JOINs a game_roles y game_ranks
    const { data: games, error } = await supabase
      .from('games')
      .select(`
        id,
        name,
        slug,
        icon_url,
        genre,
        max_players,
        has_roles,
        has_ranks,
        game_roles (
          id,
          game_id,
          name,
          icon
        ),
        game_ranks (
          id,
          game_id,
          name,
          tier,
          icon
        )
      `)
      .is('deleted_at', null) // Excluir juegos eliminados
      .order('name') // Ordenar alfabéticamente

    if (error) {
      console.error('Error al obtener juegos:', error)
      return []
    }

    // Mapear y ordenar rangos por tier
    return (games || []).map(game => ({
      id: game.id,
      name: game.name,
      slug: game.slug,
      icon_url: game.icon_url || undefined,
      genre: game.genre as Game['genre'],
      max_players: game.max_players,
      has_roles: game.has_roles,
      has_ranks: game.has_ranks,
      roles: game.game_roles || [],
      // Ordenar rangos por tier (de menor a mayor)
      ranks: (game.game_ranks || []).sort((a, b) => a.tier - b.tier)
    }))
  } catch (error) {
    console.error('Error inesperado al obtener juegos:', error)
    return []
  }
}

/**
 * Obtiene un juego por su slug (identificador URL amigable)
 *
 * El slug es una versión del nombre en minúsculas con guiones:
 * - "League of Legends" → "league-of-legends"
 * - "World of Warcraft" → "world-of-warcraft"
 *
 * @param slug - Slug del juego a buscar
 * @returns El juego con sus detalles, o null si no existe
 *
 * @example
 * ```tsx
 * const game = await getGameBySlug('valorant')
 * if (game) {
 *   console.log(`Encontrado: ${game.name}`)
 * }
 * ```
 */
export async function getGameBySlug(slug: string): Promise<GameWithDetails | null> {
  try {
    const { data: game, error } = await supabase
      .from('games')
      .select(`
        id,
        name,
        slug,
        icon_url,
        genre,
        max_players,
        has_roles,
        has_ranks,
        game_roles (
          id,
          game_id,
          name,
          icon
        ),
        game_ranks (
          id,
          game_id,
          name,
          tier,
          icon
        )
      `)
      .eq('slug', slug)
      .is('deleted_at', null)
      .single()

    if (error || !game) {
      console.error('Error al obtener juego:', error)
      return null
    }

    return {
      id: game.id,
      name: game.name,
      slug: game.slug,
      icon_url: game.icon_url || undefined,
      genre: game.genre as Game['genre'],
      max_players: game.max_players,
      has_roles: game.has_roles,
      has_ranks: game.has_ranks,
      roles: game.game_roles || [],
      ranks: (game.game_ranks || []).sort((a, b) => a.tier - b.tier)
    }
  } catch (error) {
    console.error('Error inesperado al obtener juego:', error)
    return null
  }
}

/**
 * Obtiene un juego por su UUID
 *
 * @param id - UUID del juego a buscar
 * @returns El juego con sus detalles, o null si no existe
 *
 * @example
 * ```tsx
 * const game = await getGameById('d5432591-2266-4b5e-ba86-aa3943f671df')
 * console.log(game?.name) // "League of Legends"
 * ```
 */
export async function getGameById(id: string): Promise<GameWithDetails | null> {
  try {
    const { data: game, error } = await supabase
      .from('games')
      .select(`
        id,
        name,
        slug,
        icon_url,
        genre,
        max_players,
        has_roles,
        has_ranks,
        game_roles (
          id,
          game_id,
          name,
          icon
        ),
        game_ranks (
          id,
          game_id,
          name,
          tier,
          icon
        )
      `)
      .eq('id', id)
      .is('deleted_at', null)
      .single()

    if (error || !game) {
      console.error('Error al obtener juego:', error)
      return null
    }

    return {
      id: game.id,
      name: game.name,
      slug: game.slug,
      icon_url: game.icon_url || undefined,
      genre: game.genre as Game['genre'],
      max_players: game.max_players,
      has_roles: game.has_roles,
      has_ranks: game.has_ranks,
      roles: game.game_roles || [],
      ranks: (game.game_ranks || []).sort((a, b) => a.tier - b.tier)
    }
  } catch (error) {
    console.error('Error inesperado al obtener juego:', error)
    return null
  }
}
