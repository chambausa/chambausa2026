// Simple JSON loader that works in Next.js
// Uses dynamic import to avoid issues with static analysis

export async function loadLicenseJSON(slug: string): Promise<Record<string, unknown> | null> {
  try {
    // Map of available JSON files
    const jsonFiles: Record<string, () => Promise<{ default: Record<string, unknown> }>> = {
      'cosmetologia-texas': () => import('@/archivos_json/cosmetologia-texas.json'),
      'cosmetologia-california': () => import('@/archivos_json/cosmetologia-california.json'),
      'cosmetologia-florida': () => import('@/archivos_json/cosmetologia-florida.json'),
      'cosmetologia-new-york': () => import('@/archivos_json/cosmetologia-new-york.json'),
      'cdl-california': () => import('@/archivos_json/cdl-california.json'),
      'electricista-texas': () => import('@/archivos_json/electricista-texas.json'),
      'electricista-california': () => import('@/archivos_json/electricista-california.json'),
      'electricista-florida': () => import('@/archivos_json/electricista-florida.json'),
      'electricista-newyork': () => import('@/archivos_json/electricista-newyork.json'),
      'electricista-new-york': () => import('@/archivos_json/electricista-newyork.json'),
      'electricista-arizona': () => import('@/archivos_json/electricista-arizona.json'),
    }

    // Try exact match first
    if (jsonFiles[slug]) {
      const mod = await jsonFiles[slug]()
      return mod.default as Record<string, unknown>
    }

    // Try without "licencia-" prefix
    const slugWithoutPrefix = slug.replace(/^licencia-/, '')
    if (jsonFiles[slugWithoutPrefix]) {
      const mod = await jsonFiles[slugWithoutPrefix]()
      return mod.default as Record<string, unknown>
    }

    return null
  } catch (error) {
    console.error('Error loading JSON:', error)
    return null
  }
}
