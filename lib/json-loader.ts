// Simple JSON loader that works in Next.js
// Uses dynamic import to avoid issues with static analysis

export async function loadLicenseJSON(slug: string): Promise<Record<string, unknown> | null> {
  try {
    // Map of available JSON files
    const jsonFiles: Record<string, () => Promise<{ default: Record<string, unknown> }>> = {
      'cosmetologia-texas': () => import('@/archivos_json/cosmetologia-texas.json'),
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
