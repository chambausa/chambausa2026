import { createClient } from '@/lib/supabase/server'
import type { LicensePageWithDetails, SchoolWithDetails } from '@/types/database.types'

export async function getLicensePageBySlug(slug: string): Promise<LicensePageWithDetails | null> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('license_pages')
    .select(`
      *,
      trade:trades(*),
      state:states(*),
      requirements(*)
    `)
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (error) return null

  // Get schools for this license
  const { data: schools } = await supabase
    .from('schools')
    .select(`
      *,
      programs(*)
    `)
    .eq('state_id', data.state_id)

  return {
    ...data,
    schools: schools || [],
  } as LicensePageWithDetails
}

export async function getSchoolBySlug(slug: string): Promise<SchoolWithDetails | null> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('schools')
    .select(`
      *,
      state:states(*),
      programs(*)
    `)
    .eq('slug', slug)
    .single()

  if (error) return null

  return data as SchoolWithDetails
}

export async function getAllPublishedPages() {
  // Use static client to avoid "cookies() called outside request scope" error
  // This function is only used at build time / revalidation
  const { createStaticClient } = await import('@/lib/supabase/server')
  const supabase = createStaticClient()

  const { data, error } = await supabase
    .from('license_pages')
    .select('slug, updated_at')
    .eq('is_published', true)

  if (error) return []

  return data
}

export async function getTrades() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('trades')
    .select('*')
    .order('name_es')

  if (error) return []

  return data
}

export async function getStates() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('states')
    .select('*')
    .order('name_es')

  if (error) return []

  return data
}

export async function getFeaturedLicenses() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('license_pages')
    .select(`
      *,
      trade:trades(name_es, slug),
      state:states(name_es, code)
    `)
    .eq('is_published', true)
    .order('views', { ascending: false })
    .limit(10)

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

  const { data, error } = await queryBuilder.limit(20)

  if (error) return []

  return data
}
