/**
 * SQUAD UP - Componente CreateRoomModal
 * Modal para crear una nueva sala de juego
 */

import { useState } from 'react'
import { XIcon, GamepadIcon, UsersIcon } from '../ui/Icons'
import { GAMES, RANKS, ROLES } from '../../data/mockData'

interface CreateRoomModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (roomData: CreateRoomData) => void
}

export interface CreateRoomData {
  title: string
  game: string
  description: string
  maxPlayers: number
  rank: string
  roles: string[]
}

export function CreateRoomModal({ isOpen, onClose, onSubmit }: CreateRoomModalProps) {
  const [formData, setFormData] = useState<CreateRoomData>({
    title: '',
    game: '',
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

    if (!formData.game) {
      newErrors.game = 'Selecciona un juego'
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
        game: '',
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-lg mx-4 bg-[#1e1e26] rounded-2xl shadow-[0px_8px_20px_0px_rgba(0,0,0,0.3)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2d2d3a]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#6c5ce7]/20 rounded-lg">
              <GamepadIcon size={24} className="text-[#6c5ce7]" />
            </div>
            <h2 className="text-xl font-bold text-white">Crear Nueva Sala</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[#121218] transition-colors"
          >
            <XIcon size={20} className="text-[#b2bec3] hover:text-white" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Título */}
          <div>
            <label className="block text-sm font-medium text-[#b2bec3] mb-2">
              Título de la sala *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Ej: Busco team para ranked"
              className={`w-full px-4 py-3 bg-[#121218] text-white rounded-xl border-2 transition-colors focus:outline-none ${
                errors.title
                  ? 'border-[#e74c3c]'
                  : 'border-transparent focus:border-[#6c5ce7]'
              }`}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-[#e74c3c]">{errors.title}</p>
            )}
          </div>

          {/* Juego */}
          <div>
            <label className="block text-sm font-medium text-[#b2bec3] mb-2">
              Juego *
            </label>
            <div className="grid grid-cols-2 gap-3">
              {GAMES.map((game) => (
                <button
                  key={game.id}
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, game: game.id }))
                    if (errors.game) setErrors((prev) => ({ ...prev, game: undefined }))
                  }}
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                    formData.game === game.id
                      ? 'border-[#6c5ce7] bg-[#6c5ce7]/10'
                      : 'border-[#2d2d3a] hover:border-[#6c5ce7]/50'
                  }`}
                >
                  <img src={game.image} alt={game.name} className="w-8 h-8 object-contain" />
                  <span className="text-sm text-white font-medium">{game.name}</span>
                </button>
              ))}
            </div>
            {errors.game && (
              <p className="mt-1 text-sm text-[#e74c3c]">{errors.game}</p>
            )}
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-[#b2bec3] mb-2">
              Descripción
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe qué tipo de jugadores buscas..."
              rows={3}
              className="w-full px-4 py-3 bg-[#121218] text-white rounded-xl border-2 border-transparent focus:border-[#6c5ce7] focus:outline-none resize-none transition-colors"
            />
          </div>

          {/* Rango y Max Players en fila */}
          <div className="grid grid-cols-2 gap-4">
            {/* Rango */}
            <div>
              <label className="block text-sm font-medium text-[#b2bec3] mb-2">
                Rango mínimo
              </label>
              <select
                name="rank"
                value={formData.rank}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[#121218] text-white rounded-xl border-2 border-transparent focus:border-[#6c5ce7] focus:outline-none cursor-pointer"
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
              <label className="block text-sm font-medium text-[#b2bec3] mb-2">
                <div className="flex items-center gap-2">
                  <UsersIcon size={16} />
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
                className={`w-full px-4 py-3 bg-[#121218] text-white rounded-xl border-2 transition-colors focus:outline-none ${
                  errors.maxPlayers
                    ? 'border-[#e74c3c]'
                    : 'border-transparent focus:border-[#6c5ce7]'
                }`}
              />
              {errors.maxPlayers && (
                <p className="mt-1 text-sm text-[#e74c3c]">{errors.maxPlayers}</p>
              )}
            </div>
          </div>

          {/* Roles */}
          <div>
            <label className="block text-sm font-medium text-[#b2bec3] mb-2">
              Roles buscados
            </label>
            <div className="flex flex-wrap gap-2">
              {ROLES.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => handleRoleToggle(role)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
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
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-transparent border border-[#2d2d3a] text-white rounded-xl font-medium hover:bg-[#121218] transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-[#6c5ce7] text-white rounded-xl font-semibold hover:bg-[rgba(108,92,231,0.8)] transition-colors"
            >
              Crear Sala
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
