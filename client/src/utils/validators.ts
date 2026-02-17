/**
 * Squad Up - Validadores
 *
 * Funciones de validación para formularios
 */

import { LIMITS } from '../constants'

export interface ValidationResult {
  isValid: boolean
  error?: string
}

/**
 * Valida un nombre de usuario
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
 * Valida el contenido de un mensaje
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
 * Valida una biografía
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
