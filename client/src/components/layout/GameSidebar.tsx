/**
 * SQUAD UP - Componente GameSidebar
 * Barra lateral con lista de juegos - Fiel al Figma
 */

import { GAMES, type Game } from '../../data/mockData'

interface GameCardProps {
  game: Game
}

function GameCard({ game }: GameCardProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        height: 100,
        padding: 12,
        backgroundColor: 'rgba(18, 18, 24, 0.5)',
        borderLeft: '8px solid #6c5ce7',
        borderRadius: '0 12px 12px 0',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(18, 18, 24, 0.8)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(18, 18, 24, 0.5)'
      }}
    >
      {/* Imagen del juego - 64x64 */}
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 12,
          backgroundColor: '#d9d9d9',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 24,
        }}
      >
        🎮
      </div>
      {/* Nombre del juego */}
      <span
        style={{
          color: '#b2bec3',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600,
          fontSize: 16,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {game.name}
      </span>
    </div>
  )
}

export function GameSidebar() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        height: '100%',
        width: '100%',
        padding: 12,
        backgroundColor: '#1e1e26',
        borderRadius: 12,
        overflowY: 'auto',
      }}
    >
      {GAMES.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  )
}
