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
      'plomero-texas': () => import('@/archivos_json/plomero-texas.json'),
      'plomero-california': () => import('@/archivos_json/plomero-california.json'),
      'plomero-florida': () => import('@/archivos_json/plomero-florida.json'),
      'hvac-texas': () => import('@/archivos_json/hvac-texas.json'),
      'hvac-california': () => import('@/archivos_json/hvac-california.json'),
      'cdl-texas': () => import('@/archivos_json/cdl-texas.json'),
      'electricista-georgia': () => import('@/archivos_json/electricista-georgia.json'),
      'electricista-pennsylvania': () => import('@/archivos_json/electricista-pennsylvania.json'),
      'electricista-washington': () => import('@/archivos_json/electricista-washington.json'),
      'electricista-colorado': () => import('@/archivos_json/electricista-colorado.json'),
      'hvac-new-york': () => import('@/archivos_json/hvac-new-york.json'),
      'electricista-nevada': () => import('@/archivos_json/electricista-nevada.json'),
      'electricista-illinois': () => import('@/archivos_json/electricista-illinois.json'),
      'electricista-minnesota': () => import('@/archivos_json/electricista-minnesota.json'),
      'electricista-oregon': () => import('@/archivos_json/electricista-oregon.json'),
      'hvac-florida': () => import('@/archivos_json/hvac-florida.json'),
      'electricista-new-mexico': () => import('@/archivos_json/electricista-new-mexico.json'),
      'hvac-arizona': () => import('@/archivos_json/hvac-arizona.json'),
      'cdl-florida': () => import('@/archivos_json/cdl-florida.json'),
      'cdl-new-york': () => import('@/archivos_json/cdl-new-york.json'),
      'plomero-new-york': () => import('@/archivos_json/plomero-new-york.json'),
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
