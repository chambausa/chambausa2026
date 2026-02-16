// JSON content registry - imports all JSON files
// This approach works better with Next.js than fs.readFileSync

import cosmetologiaTexas from '@/archivos_json/cosmetologia-texas.json'

export interface LicenseJSONContent {
  _meta: {
    schema_version: string
    page_id: string
    oficio: string
    estado: string
    last_verified: string
    verified_by: string
    notes?: string
  }
  page_seo: {
    title: string
    meta_description: string
    slug: string
    canonical_url: string
    h1: string
    schema_types: string[]
    keywords_primary: string[]
    keywords_secondary: string[]
    keywords_long_tail: string[]
    keywords_from_gsc?: {
      queries: { q: string; impressions: number }[]
    }
  }
  hero: {
    ai_generated: boolean
    badge: string
    headline: string
    subheadline: string
    key_stats: {
      label: string
      value: string
      detail: string
      source: string
      source_name: string
    }[]
    cta_primary: { text: string; anchor: string }
    cta_secondary: { text: string; anchor: string }
  }
  callout_espanol?: {
    ai_generated: boolean
    type: string
    icon?: string
    title: string
    content: string
    source: string
    source_name: string
  }
  autoridad_reguladora: {
    ai_generated: boolean
    nombre: string
    programa: string
    nota_consolidacion?: string
    direccion: {
      calle: string
      ciudad: string
      estado: string
      cp: string
      mailing?: string
    }
    telefono: {
      local?: string
      toll_free?: string
      tdd?: string
    }
    email?: string
    web: string
    verificar_licencia?: string
    source: string
  }
  roadmap: {
    _description?: string
    ai_generated: boolean
    layout: 'grid' | 'timeline'
    nota_general?: string
    tipos: {
      id: string
      titulo_en: string
      titulo_es: string
      es_principal: boolean
      color_badge: string
      descripcion_corta: string
      scope_of_work?: string
      requisitos?: {
        edad_minima: number
        educacion_previa: string
        horas_escuela: number
        horas_alternativa?: string
        horas_online_max?: number
        horas_online_nota?: string
        escuela_aprobada: string
      }
      examen?: {
        partes: number
        parte_1?: {
          nombre: string
          formato: string
          costo?: number
          idiomas?: string[]
          puntaje_minimo: string
          cuando_tomarlo: string
          contenido_principal?: string[]
          ubicaciones?: string
          e_exam?: string
        }
        parte_2?: {
          nombre: string
          formato: string
          costo?: number
          puntaje_minimo: string
          cuando_tomarlo: string
          ubicaciones?: string
          que_llevar?: string[]
          nota_licencia_temporal?: string
          idioma_nota?: string
        }
        administrador: string
        telefono_psi?: string
        url_psi?: string
        retakes?: string
        source: string
      }
      costos?: {
        aplicacion_licencia?: number
        examen_escrito?: number
        examen_practico?: number
        total_examenes_y_licencia?: number
        renovacion_cada_2_años?: number
        ce_horas_cada_2_años?: number
      }
      como_aplicar?: {
        metodo?: string
        url?: string
        tiempo_procesamiento?: string
        pasos?: string[]
      }
      combinaciones?: string[]
      nota?: string
      horas_escuela?: number
      source?: string
    }[]
  }
  calculadora_inversion: {
    ai_generated: boolean
    _description?: string
    escenarios: {
      id: string
      licencia: string
      inversion: {
        escuela_rango: string
        escuela_nota?: string
        examen_escrito?: number
        examen_practico?: number
        kit_herramientas?: string
        kit_nota?: string
        aplicacion_licencia?: number
        total_minimo: string
        total_maximo: string
      }
      tiempo: string
      salario_esperado: {
        empleada_salon?: string
        con_experiencia?: string
        independiente_booth_rental?: string
        nota?: string
        empleada?: string
        med_spa_especialista?: string
      }
      roi_nota?: string
    }[]
  }
  renovacion: {
    ai_generated: boolean
    frecuencia: string
    metodo: string
    url_renovacion: string
    costo_renovacion: number
    ce_requerida: {
      menos_15_años_licencia: {
        horas_totales: number
        desglose: string[]
      }
      mas_15_años_licencia?: {
        horas_totales: number
        desglose: string[]
        cambio?: string
      }
      costo_cursos_ce_online: string
      url_proveedores: string
    }
    consecuencias_no_renovar: {
      [key: string]: string
    }
    nota_tdlr: string
    source: string
  }
  reciprocidad: {
    ai_generated: boolean
    disponible: boolean
    nombre_proceso: string
    requisitos: string[]
    nota: string
    url: string
    experiencia_como_horas: string
    source: string
  }
  salarios: {
    ai_generated: boolean
    nota_importante: string
    nacional_2024: {
      mediana: string
      por_hora_mediana: string
      percentil_10: string
      percentil_90: string
      crecimiento_proyectado: string
      source: string
    }
    texas?: {
      promedio_anual: string
      promedio_hora: string
      top_earners: string
      source: string
    }
    por_ciudad_texas?: {
      ciudad: string
      salario_medio: string
      top_earners?: string
      source: string
    }[]
    ingresos_reales?: {
      ai_generated: boolean
      nota: string
      factores_adicionales: string[]
      estimado_realistico: {
        recien_licenciada: string
        [key: string]: string
      }
    }
  }
  faqs: {
    question: string
    answer: string
    category?: string
  }[]
  enlaces_utiles: {
    ai_generated: boolean
    enlaces: {
      categoria: string
      enlaces: {
        titulo: string
        url: string
        descripcion?: string
      }[]
    }[]
  }
}

// Registry of all JSON content
export const jsonContentRegistry: Record<string, LicenseJSONContent> = {
  'cosmetologia-texas': cosmetologiaTexas as unknown as LicenseJSONContent,
}

// Helper to get JSON content by slug (with or without "licencia-" prefix)
export function getJSONContent(slug: string | undefined): LicenseJSONContent | null {
  if (!slug) return null
  
  // Try exact match
  if (jsonContentRegistry[slug]) {
    return jsonContentRegistry[slug]
  }
  
  // Try without "licencia-" prefix
  const slugWithoutPrefix = slug.replace(/^licencia-/, '')
  if (jsonContentRegistry[slugWithoutPrefix]) {
    return jsonContentRegistry[slugWithoutPrefix]
  }
  
  return null
}
