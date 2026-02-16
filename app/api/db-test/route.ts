import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = createClient()
    
    // Test connection by fetching states
    const { data, error } = await supabase
      .from('states')
      .select('code, name_es')
      .limit(5)

    if (error) {
      return NextResponse.json({
        success: false,
        error: error.message,
        message: 'Error connecting to Supabase'
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Connected to Supabase!',
      data: data || [],
      count: data?.length || 0
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: String(error),
      message: 'Exception connecting to Supabase'
    })
  }
}
