/**
 * SQUAD UP - Cliente Supabase
 * ==============================
 *
 * Este archivo configura y exporta el cliente de Supabase.
 * Supabase es el backend-as-a-service que proporciona:
 * - Autenticación (Supabase Auth)
 * - Base de datos (PostgreSQL)
 * - Tiempo real (Realtime subscriptions)
 * - Almacenamiento (Storage)
 *
 * CONFIGURACIÓN:
 * Las credenciales se obtienen de variables de entorno:
 * - VITE_SUPABASE_URL: URL del proyecto Supabase
 * - VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY: Clave pública (anon key)
 *
 * SEGURIDAD:
 * La clave pública es segura para usar en el cliente porque
 * la seguridad se controla mediante Row Level Security (RLS)
 * en la base de datos.
 *
 * @module utils/supabase
 * @author Squad Up Team
 */

import { createClient } from '@supabase/supabase-js';

// URL del proyecto Supabase (desde variables de entorno)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

// Clave pública para acceso desde el cliente
// NOTA: Esta clave es segura para exponer - la seguridad está en RLS
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

// Cliente de Supabase configurado y listo para usar
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase
        