// Tipos para el sistema de contenido JSON de licencias

export interface LicenseJSON {
  _meta: MetaInfo;
  page_seo: PageSEO;
  hero: HeroSection;
  callout_espanol?: AIContent;
  autoridad_reguladora: AuthorityInfo;
  roadmap: Roadmap;
  calculadora_inversion: CostCalculator;
  renovacion: Renovation;
  reciprocidad: Reciprocity;
  salarios: Salaries;
  faqs: FAQSection;
  escuelas?: SchoolsSection;
  enlaces_utiles: UsefulLinks;
}

export interface FAQSection {
  ai_generated?: string;
  items: FAQItemJSON[];
}

export interface FAQItemJSON {
  pregunta: string;
  respuesta: string;
  source?: string;
  seo_note?: string;
}

export interface MetaInfo {
  schema_version: string;
  page_id: string;
  oficio: string;
  estado: string;
  last_verified: string;
  verified_by: string;
  notes?: string;
}

export interface PageSEO {
  title: string;
  meta_description: string;
  slug: string;
  canonical_url: string;
  h1: string;
  schema_types: string[];
  keywords_primary: string[];
  keywords_secondary: string[];
  keywords_long_tail: string[];
  keywords_from_gsc?: {
    queries: { q: string; impressions: number }[];
  };
}

export interface HeroSection {
  ai_generated: boolean;
  badge: string;
  headline: string;
  subheadline: string;
  key_stats: KeyStat[];
  cta_primary: { text: string; anchor: string };
  cta_secondary: { text: string; anchor: string };
}

export interface KeyStat {
  label: string;
  value: string;
  detail: string;
  source: string;
  source_name: string;
}

export interface AIContent {
  ai_generated: boolean;
  type: string;
  icon?: string;
  title: string;
  content: string;
  source: string;
  source_name: string;
}

export interface AuthorityInfo {
  ai_generated: boolean;
  nombre: string;
  programa: string;
  nota_consolidacion?: string;
  direccion: {
    calle: string;
    ciudad: string;
    estado: string;
    cp: string;
    mailing?: string;
  };
  telefono: {
    local?: string;
    toll_free?: string;
    tdd?: string;
  };
  email?: string;
  web: string;
  verificar_licencia?: string;
  source: string;
}

export interface Roadmap {
  _description?: string;
  ai_generated: boolean;
  layout: 'grid' | 'timeline';
  nota_general?: string;
  tipos: LicenseType[];
}

export interface LicenseType {
  id: string;
  titulo_en: string;
  titulo_es: string;
  es_principal: boolean;
  color_badge: string;
  descripcion_corta: string;
  scope_of_work?: string;
  requisitos?: {
    edad_minima?: number;
    educacion_previa?: string;
    horas_escuela?: number;
    horas_alternativa?: string;
    horas_online_max?: number;
    horas_online_nota?: string;
    escuela_aprobada?: string;
    // Generic fields for other trades
    experiencia?: string;
    licencia_previa?: string;
    examen_medico?: string;
    examen?: string;
  };
  examen?: {
    partes: number;
    parte_1?: ExamPart;
    parte_2?: ExamPart;
    administrador: string;
    telefono_psi?: string;
    url_psi?: string;
    retakes?: string;
    source: string;
    // Generic fields for simpler exam structures
    nombre?: string;
    idiomas?: string[];
  };
  costos?: {
    aplicacion_licencia?: number;
    examen_escrito?: number;
    examen_practico?: number;
    total_examenes_y_licencia?: number;
    renovacion_cada_2_años?: number;
    ce_horas_cada_2_años?: number;
  };
  como_aplicar?: {
    metodo?: string;
    url?: string;
    tiempo_procesamiento?: string;
    pasos?: string[];
  };
  combinaciones?: string[];
  nota?: string;
  horas_escuela?: number;
  source?: string;
}

export interface ExamPart {
  nombre: string;
  formato: string;
  costo?: number;
  idiomas?: string[];
  puntaje_minimo: string;
  cuando_tomarlo: string;
  contenido_principal?: string[];
  ubicaciones?: string;
  e_exam?: string;
  que_llevar?: string[];
  nota_licencia_temporal?: string;
  idioma_nota?: string;
}

export interface CostCalculator {
  ai_generated: boolean;
  _description?: string;
  escenarios: CostScenario[];
}

export interface CostScenario {
  id: string;
  licencia: string;
  inversion: {
    escuela_rango?: string;
    escuela_nota?: string;
    examen_escrito?: number | string;
    examen_practico?: number | string;
    kit_herramientas?: string;
    kit_nota?: string;
    aplicacion_licencia?: number | string;
    total_minimo?: string;
    total_maximo?: string;
    // Generic
    examen_medico_dl51?: string;
    licencia_clp_dmv?: string;
    escuela_manejo?: string;
    examenes_endosos?: string;
    matricula_escuela?: string;
    kit_libros?: string;
    licencia_aprendiz_4_anos?: string;
    kit_herramientas_basico?: string;
    libros_codigo?: string;
    curso_preparacion_examen?: string;
    examen_journeyman?: string;
    licencia_journeyman?: string;
    total_estimado?: string;
  };
  tiempo: string;
  salario_esperado?: {
    empleada_salon?: string;
    con_experiencia?: string;
    independiente_booth_rental?: string;
    nota?: string;
    empleada?: string;
    med_spa_especialista?: string;
  };
  nota?: string;
  roi_nota?: string;
}

export interface Renovation {
  ai_generated: boolean;
  frecuencia: string;
  metodo: string;
  url_renovacion?: string;
  costo_renovacion: number;
  ce_requerida: {
    menos_15_años_licencia?: {
      horas_totales: number;
      desglose: string[];
    };
    mas_15_años_licencia?: {
      horas_totales: number;
      desglose: string[];
      cambio?: string;
    };
    // Generic
    horas_totales?: number;
    temas?: string[];
    nota?: string;

    costo_cursos_ce_online?: string;
    url_proveedores?: string;
  };
  consecuencias_no_renovar?: {
    [key: string]: string;
  };
  nota_tdlr?: string;
  source?: string;
}

export interface Reciprocity {
  ai_generated: boolean;
  disponible: boolean;
  nombre_proceso: string;
  requisitos: string[];
  nota: string;
  url: string;
  experiencia_como_horas: string;
  source: string;
}

export interface Salaries {
  ai_generated: boolean;
  nota_importante: string;
  nacional_2024: {
    mediana: string;
    por_hora_mediana?: string;
    percentil_10?: string;
    percentil_90?: string;
    crecimiento_proyectado?: string;
    source?: string;
    top_earners?: string;
  };
  texas?: {
    promedio_anual: string;
    promedio_hora: string;
    top_earners: string;
    source: string;
  };
  por_ciudad_texas?: {
    ciudad: string;
    salario_medio: string;
    top_earners?: string;
    source: string;
  }[];
  ingresos_reales?: {
    ai_generated?: boolean;
    nota?: string;
    factores_adicionales?: string[];
    estimado_realista?: {
      recien_licenciada?: string;
      '3_5_años_experiencia'?: string;
      especialista_o_independiente?: string;
      dueña_salon?: string;
    };
  };
}

export interface FAQ {
  question: string;
  answer: string;
  category?: string;
}

export interface UsefulLinks {
  ai_generated: boolean;
  enlaces: {
    categoria: string;
    enlaces: {
      titulo: string;
      url: string;
      descripcion?: string;
    }[];
  }[];
}

export interface SchoolsSection {
  ai_generated: boolean;
  items: SchoolJSON[];
}

export interface SchoolJSON {
  id: string;
  name: string;
  city: string;
  phone?: string;
  website?: string;
  is_bilingual: boolean;
  programs: ProgramJSON[];
}

export interface ProgramJSON {
  id: string;
  name: string;
  duration_months?: number;
  cost?: number;
  modality?: string;
}

