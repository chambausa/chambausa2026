// Types generated from Supabase schema
// Run: npm run db:generate

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      trades: {
        Row: {
          id: string
          slug: string
          name_es: string
          name_en: string
          avg_salary: number | null
          salary_unit: string | null
          description_md: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['trades']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['trades']['Insert']>
      }
      states: {
        Row: {
          id: string
          code: string
          name_es: string
          name_en: string
          region: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['states']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['states']['Insert']>
      }
      requirements: {
        Row: {
          id: string
          trade_id: string
          state_id: string
          age_min: number | null
          hours_required: number | null
          fees_exam: number | null
          fees_license: number | null
          documents_required: string[] | null
          renewal_period_years: number | null
          source_url: string | null
          source_updated_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['requirements']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['requirements']['Insert']>
      }
      schools: {
        Row: {
          id: string
          slug: string
          name: string
          city: string
          state_id: string
          phone: string | null
          website: string | null
          is_bilingual: boolean | null
          accreditation: string | null
          description_md: string | null
          rating_google: number | null
          lat: number | null
          lng: number | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['schools']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['schools']['Insert']>
      }
      programs: {
        Row: {
          id: string
          school_id: string
          trade_id: string
          name: string
          duration_months: number | null
          cost: number | null
          modality: string | null
          hours: number | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['programs']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['programs']['Insert']>
      }
      license_pages: {
        Row: {
          id: string
          slug: string
          trade_id: string
          state_id: string
          meta_title: string | null
          meta_description: string | null
          content_md: string | null
          last_updated: string | null
          is_published: boolean | null
          views: number | null
          clicks: number | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['license_pages']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['license_pages']['Insert']>
      }
      leads: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          state_id: string | null
          trade_id: string | null
          source_page: string | null
          status: string | null
          crm_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['leads']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['leads']['Insert']>
      }
    }
  }
}

// Helper types
export type Trade = Database['public']['Tables']['trades']['Row']
export type State = Database['public']['Tables']['states']['Row']
export type Requirement = Database['public']['Tables']['requirements']['Row']
export type School = Database['public']['Tables']['schools']['Row']
export type Program = Database['public']['Tables']['programs']['Row']
export type LicensePage = Database['public']['Tables']['license_pages']['Row']
export type Lead = Database['public']['Tables']['leads']['Row']

// Joined types
export interface LicensePageWithDetails extends LicensePage {
  trade: Trade
  state: State
  requirements: Requirement
  schools: (School & { programs: Program[] })[]
}

export interface SchoolWithDetails extends School {
  programs: Program[]
  state: State
  trade: Trade
}
