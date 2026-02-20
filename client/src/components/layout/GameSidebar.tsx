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
      className='flex justify-start items-center w-full h-20 p-3 bg-[#121218]/50 hover:bg-[#121218]/80 border-l-8 border-[#6c5ce7] rounded-r-xl cursor-pointer transition-colors duration-200'
	>
      {/* Imagen del juego - 64x64 */}
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 12,
          backgroundColor: 'transparent',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 4,
          fontSize: 24,
          margin: 8,
        }}  
      >
        {game.image ? (<img src={game.image} alt={game.name} style={{ width: '100%', height: '100%' }} />) : (
          game.name[0]
        )}
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
