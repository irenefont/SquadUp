/**
 * SQUAD UP - Utilidades
 * ==============================
 *
 * Este archivo contiene funciones helper reutilizables que se utilizan
 * en toda la aplicación. Son funciones puras que no tienen efectos secundarios.
 *
 * CATEGORÍAS:
 * - Formateo de fechas: formatRelativeTime, formatDate
 * - Manipulación de texto: truncate
 * - Generación de códigos: generateInviteCode
 * - Validación básica: isValidEmail, isValidUsername
 * - Utilidades de UI: debounce, getStarsArray
 * - Portapapeles: copyToClipboard
 * - Formateo de números: formatNumber
 *
 * @module utils/helpers
 * @author Squad Up Team
 */

/**
 * Formatea una fecha a formato relativo
 * Convierte una fecha en texto legible como "hace 5 min", "hace 2h", etc.
 *
 * @param date - Fecha a formatear (string ISO o Date)
 * @returns Texto con formato relativo en español
 *
 * @example
 * ```tsx
 * formatRelativeTime('2024-01-15T10:00:00Z') // "hace 5 min" (si son las 10:05)
 * formatRelativeTime(new Date()) // "ahora mismo"
 * formatRelativeTime('2024-01-01T10:00:00Z') // "hace 15 días"
 * ```
 */
export function formatRelativeTime(date: string | Date): string {
  const now = new Date()
  const past = new Date(date)
  const diffMs = now.getTime() - past.getTime()
  const diffSecs = Math.floor(diffMs / 1000)
  const diffMins = Math.floor(diffSecs / 60)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffSecs < 60) return 'ahora mismo'
  if (diffMins < 60) return `hace ${diffMins} min`
  if (diffHours < 24) return `hace ${diffHours}h`
  if (diffDays < 7) return `hace ${diffDays} días`

  return past.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
  })
}

/**
 * Formatea una fecha completa
 * Retorna la fecha en formato legible con hora incluida
 *
 * @param date - Fecha a formatear (string ISO o Date)
 * @returns Fecha formateada en español (ej: "15 de enero de 2024, 10:30")
 *
 * @example
 * ```tsx
 * formatDate('2024-01-15T10:30:00Z')
 * // "15 de enero de 2024, 10:30"
 * ```
 */
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Trunca un texto con ellipsis
 * Si el texto excede maxLength, lo corta y añade "..."
 *
 * @param text - Texto a truncar
 * @param maxLength - Longitud máxima permitida
 * @returns Texto truncado si es necesario, o el original si cabe
 *
 * @example
 * ```tsx
 * truncate('Hola mundo', 5) // "Ho..."
 * truncate('Hola', 10) // "Hola" (sin cambios)
 * ```
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength - 3) + '...'
}

/**
 * Genera un código de invitación aleatorio
 * Útil para salas privadas que requieren código para unirse
 *
 * @returns Código de 6 caracteres alfanuméricos (ej: "A3B7X9")
 *
 * @example
 * ```tsx
 * const code = generateInviteCode()
 * console.log(code) // "K8M2P4"
 * ```
 */
export function generateInviteCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = ''
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

/**
 * Valida si un string tiene formato de email válido
 * Usa una regex simple pero efectiva para la mayoría de casos
 *
 * @param email - String a validar
 * @returns true si el formato es válido, false si no
 *
 * @example
 * ```tsx
 * isValidEmail('test@example.com') // true
 * isValidEmail('invalid-email') // false
 * isValidEmail('user@domain') // false
 * ```
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Valida si un username tiene formato válido
 * Solo permite letras, números y guiones bajos
 * Longitud entre 3 y 20 caracteres
 *
 * @param username - String a validar
 * @returns true si el formato es válido, false si no
 *
 * @example
 * ```tsx
 * isValidUsername('player_123') // true
 * isValidUsername('ab') // false (muy corto)
 * isValidUsername('user@name') // false (@ no permitido)
 * ```
 */
export function isValidUsername(username: string): boolean {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/
  return usernameRegex.test(username)
}

/**
 * Crea una función debounced
 * Retrasa la ejecución hasta que pase el tiempo especificado sin llamadas
 * Útil para búsquedas, resize, etc.
 *
 * @template T - Tipo de la función a debouncear
 * @param func - Función a ejecutar después del delay
 * @param wait - Tiempo de espera en milisegundos
 * @returns Función debounced que retrasa la ejecución
 *
 * @example
 * ```tsx
 * const debouncedSearch = debounce((query) => {
 *   fetchResults(query)
 * }, 300)
 *
 * // Solo se ejecutará 300ms después del último keystroke
 * input.onChange = (e) => debouncedSearch(e.target.value)
 * ```
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Genera un array de estados de estrellas para visualización
 * Convierte un rating numérico en un array de 5 elementos
 *
 * @param rating - Rating numérico (0.0 - 5.0)
 * @returns Array de 5 elementos: 'full', 'half' o 'empty'
 *
 * @example
 * ```tsx
 * getStarsArray(4.5) // ['full', 'full', 'full', 'full', 'half']
 * getStarsArray(3) // ['full', 'full', 'full', 'empty', 'empty']
 * getStarsArray(2.3) // ['full', 'full', 'empty', 'empty', 'empty']
 * ```
 */
export function getStarsArray(rating: number): ('full' | 'half' | 'empty')[] {
  const stars: ('full' | 'half' | 'empty')[] = []
  const fullStars = Math.floor(rating)
  const hasHalf = rating % 1 >= 0.5

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push('full')
    } else if (i === fullStars && hasHalf) {
      stars.push('half')
    } else {
      stars.push('empty')
    }
  }

  return stars
}

/**
 * Copia texto al portapapeles del sistema
 * Usa la API moderna del navegador
 *
 * @param text - Texto a copiar
 * @returns Promise que resuelve a true si se copió correctamente
 *
 * @example
 * ```tsx
 * const success = await copyToClipboard('CÓDIGO123')
 * if (success) {
 *   toast.success('Código copiado al portapapeles')
 * }
 * ```
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

/**
 * Formatea un número con separador de miles
 * Usa el formato local de España
 *
 * @param num - Número a formatear
 * @returns String con el número formateado
 *
 * @example
 * ```tsx
 * formatNumber(1500) // "1.500"
 * formatNumber(1000000) // "1.000.000"
 * ```
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('es-ES')
}
