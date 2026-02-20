/**
 * SQUAD UP - Validadores
 * ==============================
 *
 * Este archivo contiene funciones de validación para formularios.
 * Cada función retorna un objeto con isValid y un mensaje de error opcional.
 *
 * CARACTERÍSTICAS:
 * - Todas las funciones son puras (no tienen side effects)
 * - Retornan ValidationResult para consistencia
 * - Usan las constantes LIMITS para mantener coherencia
 *
 * @module utils/validators
 * @author Squad Up Team
 */

import { LIMITS } from '../constants'

/**
 * Resultado de una validación
 * Estructura consistente para todos los validadores
 */
export interface ValidationResult {
  /** Si el valor pasó la validación */
  isValid: boolean
  /** Mensaje de error si isValid es false */
  error?: string
}

/**
 * Valida un nombre de usuario
 * Requisitos: 3-20 caracteres, solo letras/números/guiones bajos
 *
 * @param value - Username a validar
 * @returns ValidationResult con isValid y error opcional
 *
 * @example
 * ```tsx
 * validateUsername('player_123') // { isValid: true }
 * validateUsername('ab') // { isValid: false, error: 'Mínimo 3 caracteres' }
 * ```
 */
export function validateUsername(value: string): ValidationResult {
  if (!value) {
    return { isValid: false, error: 'El nombre de usuario es obligatorio' }
  }

  if (value.length < LIMITS.MIN_USERNAME_LENGTH) {
    return {
      isValid: false,
      error: `Mínimo ${LIMITS.MIN_USERNAME_LENGTH} caracteres`,
    }
  }

  if (value.length > LIMITS.MAX_USERNAME_LENGTH) {
    return {
      isValid: false,
      error: `Máximo ${LIMITS.MAX_USERNAME_LENGTH} caracteres`,
    }
  }

  if (!/^[a-zA-Z0-9_]+$/.test(value)) {
    return {
      isValid: false,
      error: 'Solo letras, números y guiones bajos',
    }
  }

  return { isValid: true }
}

/**
 * Valida un email
 * Verifica que tenga formato de email válido
 *
 * @param value - Email a validar
 * @returns ValidationResult con isValid y error opcional
 *
 * @example
 * ```tsx
 * validateEmail('test@example.com') // { isValid: true }
 * validateEmail('invalid') // { isValid: false, error: 'Email no válido' }
 * ```
 */
export function validateEmail(value: string): ValidationResult {
  if (!value) {
    return { isValid: false, error: 'El email es obligatorio' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(value)) {
    return { isValid: false, error: 'Email no válido' }
  }

  return { isValid: true }
}

/**
 * Valida una contraseña
 * Requisito mínimo: 8 caracteres
 *
 * @param value - Contraseña a validar
 * @returns ValidationResult con isValid y error opcional
 *
 * @example
 * ```tsx
 * validatePassword('secure123') // { isValid: true }
 * validatePassword('short') // { isValid: false, error: 'Mínimo 8 caracteres' }
 * ```
 */
export function validatePassword(value: string): ValidationResult {
  if (!value) {
    return { isValid: false, error: 'La contraseña es obligatoria' }
  }

  if (value.length < 8) {
    return { isValid: false, error: 'Mínimo 8 caracteres' }
  }

  return { isValid: true }
}

/**
 * Valida el título de una sala
 * Requisitos: 5-100 caracteres, no vacío
 *
 * @param value - Título a validar
 * @returns ValidationResult con isValid y error opcional
 *
 * @example
 * ```tsx
 * validateRoomTitle('Busco team para ranked') // { isValid: true }
 * validateRoomTitle('Hola') // { isValid: false, error: 'Mínimo 5 caracteres' }
 * ```
 */
export function validateRoomTitle(value: string): ValidationResult {
  if (!value) {
    return { isValid: false, error: 'El título es obligatorio' }
  }

  if (value.length < 5) {
    return { isValid: false, error: 'Mínimo 5 caracteres' }
  }

  if (value.length > 100) {
    return { isValid: false, error: 'Máximo 100 caracteres' }
  }

  return { isValid: true }
}

/**
 * Valida el contenido de un mensaje de chat
 * Requisitos: no vacío, máximo 500 caracteres
 *
 * @param value - Mensaje a validar
 * @returns ValidationResult con isValid y error opcional
 *
 * @example
 * ```tsx
 * validateMessage('¡Hola equipo!') // { isValid: true }
 * validateMessage('   ') // { isValid: false, error: 'El mensaje no puede estar vacío' }
 * ```
 */
export function validateMessage(value: string): ValidationResult {
  if (!value.trim()) {
    return { isValid: false, error: 'El mensaje no puede estar vacío' }
  }

  if (value.length > LIMITS.MAX_MESSAGE_LENGTH) {
    return {
      isValid: false,
      error: `Máximo ${LIMITS.MAX_MESSAGE_LENGTH} caracteres`,
    }
  }

  return { isValid: true }
}

/**
 * Valida una biografía de perfil
 * Requisito: máximo 300 caracteres (opcional, puede estar vacía)
 *
 * @param value - Biografía a validar
 * @returns ValidationResult con isValid y error opcional
 *
 * @example
 * ```tsx
 * validateBio('Jugador casual de LoL') // { isValid: true }
 * validateBio('') // { isValid: true } (es opcional)
 * ```
 */
export function validateBio(value: string): ValidationResult {
  if (value.length > LIMITS.MAX_BIO_LENGTH) {
    return {
      isValid: false,
      error: `Máximo ${LIMITS.MAX_BIO_LENGTH} caracteres`,
    }
  }

  return { isValid: true }
}

/**
 * Valida un comentario de valoración
 * Requisito: máximo 200 caracteres (opcional, puede estar vacío)
 *
 * @param value - Comentario a validar
 * @returns ValidationResult con isValid y error opcional
 *
 * @example
 * ```tsx
 * validateRatingComment('Excelente jugador, muy comunicativo') // { isValid: true }
 * validateRatingComment('') // { isValid: true } (es opcional)
 * ```
 */
export function validateRatingComment(value: string): ValidationResult {
  if (value && value.length > LIMITS.MAX_RATING_COMMENT_LENGTH) {
    return {
      isValid: false,
      error: `Máximo ${LIMITS.MAX_RATING_COMMENT_LENGTH} caracteres`,
    }
  }

  return { isValid: true }
}
