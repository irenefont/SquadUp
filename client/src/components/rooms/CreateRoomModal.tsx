/**
 * SQUAD UP - Componente CreateRoomModal
 * Modal para crear una nueva sala de juego
 */

import { useState } from 'react'
import { XIcon, GamepadIcon, UsersIcon } from '../ui/Icons'
import { RANKS, ROLES } from '../../data/mockData'
import { type GameWithDetails } from '../../services/game.service'

// Mapa de slug a imagen local
const GAME_IMAGES: Record<string, string> = {
  'league-of-legends': '/lol_logo.png',
  'valorant': '/valorant_logo.png',
  'world-of-warcraft': '/wow_logo.png',
  'apex-legends': '/apex_logo.png',
}

interface CreateRoomModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (roomData: CreateRoomData) => void
  games: GameWithDetails[]
}

export interface CreateRoomData {
  title: string
  gameId: string
  description: string
  maxPlayers: number
  rank: string
  roles: string[]
}

export function CreateRoomModal({ isOpen, onClose, onSubmit, games }: CreateRoomModalProps) {
  const [formData, setFormData] = useState<CreateRoomData>({
    title: '',
    gameId: '',
    description: '',
    maxPlayers: 5,
    rank: 'Sin rango',
    roles: [],
  })

  const [errors, setErrors] = useState<Partial<Record<keyof CreateRoomData, string>>>({})

  if (!isOpen) return null

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Limpiar error del campo al modificar
    if (errors[name as keyof CreateRoomData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleRoleToggle = (role: string) => {
    setFormData((prev) => ({
      ...prev,
      roles: prev.roles.includes(role)
        ? prev.roles.filter((r) => r !== role)
        : [...prev.roles, role],
    }))
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CreateRoomData, string>> = {}

    if (!formData.title.trim()) {
      newErrors.title = 'El título es obligatorio'
    }

    if (!formData.gameId) {
      newErrors.gameId = 'Selecciona un juego'
    }

    if (formData.maxPlayers < 2 || formData.maxPlayers > 5) {
      newErrors.maxPlayers = 'Mínimo 2, máximo 5 jugadores'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      onSubmit(formData)
      // Reset form
      setFormData({
        title: '',
        gameId: '',
        description: '',
        maxPlayers: 5,
        rank: 'Sin rango',
        roles: [],
      })
      onClose()
    }
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-md mx-4 bg-[#1e1e26] rounded-xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#2d2d3a]">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-[#6c5ce7]/20 rounded-lg">
              <GamepadIcon size={18} className="text-[#6c5ce7]" />
            </div>
            <h2 className="text-base font-semibold text-white">Crear Nueva Sala</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/5 transition-colors"
          >
            <XIcon size={16} className="text-[#b2bec3]" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          {/* Título */}
          <div>
            <label className="block text-xs font-medium text-[#b2bec3] mb-1.5">
              Título de la sala *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Ej: Busco team para ranked"
              className={`w-full px-3 py-2 bg-[#121218] text-white text-sm rounded-lg border transition-colors focus:outline-none ${
                errors.title
                  ? 'border-[#e74c3c]'
                  : 'border-transparent focus:border-[#6c5ce7]'
              }`}
            />
            {errors.title && (
              <p className="mt-1 text-xs text-[#e74c3c]">{errors.title}</p>
            )}
          </div>

          {/* Juego */}
          <div>
            <label className="block text-xs font-medium text-[#b2bec3] mb-1.5">
              Juego *
            </label>
            <div className="grid grid-cols-2 gap-2">
              {games.map((game) => {
                const gameImage = game.slug ? GAME_IMAGES[game.slug] : null
                return (
                  <button
                    key={game.id}
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, gameId: game.id }))
                      if (errors.gameId) setErrors((prev) => ({ ...prev, gameId: undefined }))
                    }}
                    className={`flex items-center gap-2 p-2 rounded-lg border transition-all ${
                      formData.gameId === game.id
                        ? 'border-[#6c5ce7] bg-[#6c5ce7]/10'
                        : 'border-[#2d2d3a] hover:border-[#6c5ce7]/50'
                    }`}
                  >
                    {gameImage && (
                      <img src={gameImage} alt={game.name} className="w-6 h-6 object-contain" />
                    )}
                    <span className="text-xs text-white font-medium">{game.name}</span>
                  </button>
                )
              })}
            </div>
            {errors.gameId && (
              <p className="mt-1 text-xs text-[#e74c3c]">{errors.gameId}</p>
            )}
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-xs font-medium text-[#b2bec3] mb-1.5">
              Descripción
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe qué tipo de jugadores buscas..."
              rows={2}
              className="w-full px-3 py-2 bg-[#121218] text-white text-sm rounded-lg border border-transparent focus:border-[#6c5ce7] focus:outline-none resize-none transition-colors"
            />
          </div>

          {/* Rango y Max Players en fila */}
          <div className="grid grid-cols-2 gap-3">
            {/* Rango */}
            <div>
              <label className="block text-xs font-medium text-[#b2bec3] mb-1.5">
                Rango mínimo
              </label>
              <select
                name="rank"
                value={formData.rank}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-[#121218] text-white text-sm rounded-lg border border-transparent focus:border-[#6c5ce7] focus:outline-none cursor-pointer"
              >
                {RANKS.map((rank) => (
                  <option key={rank} value={rank}>
                    {rank}
                  </option>
                ))}
              </select>
            </div>

            {/* Max Jugadores */}
            <div>
              <label className="block text-xs font-medium text-[#b2bec3] mb-1.5">
                <div className="flex items-center gap-1">
                  <UsersIcon size={12} />
                  <span>Máx. jugadores</span>
                </div>
              </label>
              <input
                type="number"
                name="maxPlayers"
                value={formData.maxPlayers}
                onChange={handleInputChange}
                min={2}
                max={10}
                className={`w-full px-3 py-2 bg-[#121218] text-white text-sm rounded-lg border transition-colors focus:outline-none ${
                  errors.maxPlayers
                    ? 'border-[#e74c3c]'
                    : 'border-transparent focus:border-[#6c5ce7]'
                }`}
              />
              {errors.maxPlayers && (
                <p className="mt-1 text-xs text-[#e74c3c]">{errors.maxPlayers}</p>
              )}
            </div>
          </div>

          {/* Roles */}
          <div>
            <label className="block text-xs font-medium text-[#b2bec3] mb-1.5">
              Roles buscados
            </label>
            <div className="flex flex-wrap gap-1.5">
              {ROLES.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => handleRoleToggle(role)}
                  className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                    formData.roles.includes(role)
                      ? 'bg-[#6c5ce7] text-white'
                      : 'bg-[#121218] text-[#b2bec3] hover:text-white'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* Botones */}
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-3 py-2 bg-transparent border border-[#2d2d3a] text-white text-sm rounded-lg font-medium hover:bg-white/5 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-3 py-2 bg-[#6c5ce7] text-white text-sm rounded-lg font-semibold hover:bg-[#5b4cdb] transition-colors"
            >
              Crear Sala
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
