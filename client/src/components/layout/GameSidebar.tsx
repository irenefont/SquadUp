/**
 * SQUAD UP - Componente GameSidebar
 * Barra lateral con lista de juegos - Carga desde la base de datos
 */

import { type GameWithDetails } from '../../services/game.service'

// Mapa de slug a imagen local
const GAME_IMAGES: Record<string, string> = {
  'league-of-legends': '/lol_logo.png',
  'valorant': '/valorant_logo.png',
  'world-of-warcraft': '/wow_logo.png',
  'apex-legends': '/apex_logo.png',
}

interface GameCardProps {
  game: GameWithDetails
  isSelected: boolean
  onClick: () => void
}

function GameCard({ game, isSelected, onClick }: GameCardProps) {
  const gameImage = game.slug ? GAME_IMAGES[game.slug] : null

  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-2 w-full h-12 px-2 rounded-lg cursor-pointer transition-all ${
        isSelected
          ? 'bg-[#6c5ce7]/20 border-l-4 border-[#00e0a6]'
          : 'bg-transparent hover:bg-white/5 border-l-4 border-transparent'
      }`}
    >
      {/* Imagen del juego */}
      <div className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center">
        {gameImage ? (
          <img src={gameImage} alt={game.name} className="w-full h-full object-contain" />
        ) : (
          <span className="text-lg font-bold text-[#6c5ce7]">{game.name[0]}</span>
        )}
      </div>
      {/* Nombre del juego */}
      <span
        className={`text-sm font-medium truncate ${
          isSelected ? 'text-[#00e0a6]' : 'text-[#b2bec3]'
        }`}
      >
        {game.name}
      </span>
    </div>
  )
}

interface GameSidebarProps {
  games: GameWithDetails[]
  selectedGameId?: string | null
  onGameSelect?: (gameId: string | null) => void
}

export function GameSidebar({ games, selectedGameId, onGameSelect }: GameSidebarProps) {
  const handleGameClick = (gameId: string) => {
    // Si ya está seleccionado, deseleccionar (mostrar todas las salas)
    if (selectedGameId === gameId) {
      onGameSelect?.(null)
    } else {
      onGameSelect?.(gameId)
    }
  }

  return (
    <div className="flex flex-col gap-1 h-full w-full p-2 bg-[#1e1e26] rounded-xl overflow-y-auto">
      {/* Opción "Todos los juegos" */}
      <div
        onClick={() => onGameSelect?.(null)}
        className={`flex items-center gap-2 w-full h-10 px-2 rounded-lg cursor-pointer transition-all ${
          !selectedGameId
            ? 'bg-[#6c5ce7]/20 text-[#6c5ce7]'
            : 'text-[#b2bec3] hover:bg-white/5'
        }`}
      >
        <span className="text-sm font-medium">Todos los juegos</span>
      </div>

      <div className="h-px bg-white/10 my-1" />

      {games.map((game) => (
        <GameCard
          key={game.id}
          game={game}
          isSelected={selectedGameId === game.id}
          onClick={() => handleGameClick(game.id)}
        />
      ))}
    </div>
  )
}
