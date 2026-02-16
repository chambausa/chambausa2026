import { createClient } from '@/lib/supabase/server'
import type { LicensePageWithDetails, SchoolWithDetails } from '@/types/database.types'

const DB_TIMEOUT_MS = 1500

async function withTimeout<T>(promise: PromiseLike<T>, fallback: T): Promise<T> {
  try {
    return await Promise.race<T>([
      promise,
      new Promise<T>((resolve) => setTimeout(() => resolve(fallback), DB_TIMEOUT_MS)),
    ])
  } catch {
    return fallback
  }
}

export async function getLicensePageBySlug(slug: string): Promise<LicensePageWithDetails | null> {
  const supabase = createClient()

  const { data, error } = await withTimeout(
    supabase
      .from('license_pages')
      .select(`
        *,
        trade:trades(*),
        state:states(*),
        requirements(*)
      `)
      .eq('slug', slug)
      .eq('is_published', true)
      .single(),
    { data: null, error: { message: 'timeout' } } as any
  )

  if (error) return null

  // Get schools for this license
  const { data: schools } = await withTimeout(
    supabase
      .from('schools')
      .select(`
        *,
        programs(*)
      `)
      .eq('state_id', data.state_id),
    { data: [] } as any
  )

  return {
    ...data,
    schools: schools || [],
  } as LicensePageWithDetails
}

export async function getSchoolBySlug(slug: string): Promise<SchoolWithDetails | null> {
  const supabase = createClient()

  const { data, error } = await withTimeout(
    supabase
      .from('schools')
      .select(`
        *,
        state:states(*),
        programs(*)
      `)
      .eq('slug', slug)
      .single(),
    { data: null, error: { message: 'timeout' } } as any
  )

  if (error) return null

  return data as SchoolWithDetails
}

export async function getAllPublishedPages() {
  // Use static client to avoid "cookies() called outside request scope" error
  // This function is only used at build time / revalidation
  const { createStaticClient } = await import('@/lib/supabase/server')
  const supabase = createStaticClient()

  const { data, error } = await withTimeout(
    supabase
      .from('license_pages')
      .select('slug, updated_at')
      .eq('is_published', true),
    { data: [], error: { message: 'timeout' } } as any
  )

  if (error) return []

  return data
}

export async function getTrades() {
  const supabase = createClient()

  const { data, error } = await withTimeout(
    supabase
      .from('trades')
      .select('*')
      .order('name_es'),
    { data: [], error: { message: 'timeout' } } as any
  )

  if (error) return []

  return data
}

export async function getStates() {
  const supabase = createClient()

  const { data, error } = await withTimeout(
    supabase
      .from('states')
      .select('*')
      .order('name_es'),
    { data: [], error: { message: 'timeout' } } as any
  )

  if (error) return []

  return data
}

export async function getFeaturedLicenses() {
  const supabase = createClient()

  const { data, error } = await withTimeout(
    supabase
      .from('license_pages')
      .select(`
        *,
        trade:trades(name_es, slug),
        state:states(name_es, code)
      `)
      .eq('is_published', true)
      .order('views', { ascending: false })
      .limit(10),
    { data: [], error: { message: 'timeout' } } as any
  )

  if (error) return []

  return data
}

export async function searchSchools(query: string, stateId?: string) {
  const supabase = createClient()

  let queryBuilder = supabase
    .from('schools')
    .select('*')
    .ilike('name', `%${query}%`)
    .eq('is_bilingual', true)

  if (stateId) {
    queryBuilder = queryBuilder.eq('state_id', stateId)
  }

  const { data, error } = await withTimeout(
    queryBuilder.limit(20),
    { data: [], error: { message: 'timeout' } } as any
  )

  if (error) return []

  return data
}
