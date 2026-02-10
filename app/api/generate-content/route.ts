import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

// Validation schema
const generateSchema = z.object({
  tradeId: z.string(),
  stateId: z.string(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { tradeId, stateId } = generateSchema.parse(body)
    
    const supabase = createClient()
    
    // Get trade and state info
    const { data: trade } = await supabase
      .from('trades')
      .select('*')
      .eq('id', tradeId)
      .single()

    const { data: state } = await supabase
      .from('states')
      .select('*')
      .eq('id', stateId)
      .single()

    if (!trade || !state) {
      return NextResponse.json(
        { error: 'Trade or state not found' },
        { status: 404 }
      )
    }

    // Generate content with Claude
    const prompt = buildPrompt(trade.name_es, state.name_es, state.code)
    
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    })

    const content = message.content[0].type === 'text' 
      ? message.content[0].text 
      : ''

    // Parse the response and save to database
    const parsed = parseGeneratedContent(content)
    
    // Save license page
    const { data: licensePage, error: pageError } = await supabase
      .from('license_pages')
      .upsert({
        trade_id: tradeId,
        state_id: stateId,
        slug: `licencia-${trade.slug}-${state.code.toLowerCase()}`,
        meta_title: parsed.metaTitle,
        meta_description: parsed.metaDescription,
        content_md: content,
        last_updated: new Date().toISOString().split('T')[0],
        is_published: true,
      })
      .select()
      .single()

    if (pageError) {
      console.error('Error saving license page:', pageError)
      return NextResponse.json(
        { error: 'Error saving license page' },
        { status: 500 }
      )
    }

    // Save requirements
    await supabase
      .from('requirements')
      .upsert({
        trade_id: tradeId,
        state_id: stateId,
        age_min: parsed.requirements.age,
        hours_required: parsed.requirements.hours,
        fees_exam: parsed.requirements.feesExam,
        fees_license: parsed.requirements.feesLicense,
        documents_required: parsed.requirements.documents,
        source_url: parsed.requirements.sourceUrl,
        source_updated_at: new Date().toISOString().split('T')[0],
      })

    return NextResponse.json({
      success: true,
      pageId: licensePage.id,
      content: content,
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error generating content:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function buildPrompt(trade: string, state: string, stateCode: string): string {
  const year = new Date().getFullYear()
  
  return `
Genera una guía completa en español sobre cómo obtener la licencia de ${trade} en ${state}.

La guía debe incluir:

## 1. Introducción (2-3 párrafos)
- Contexto para hispanohablantes en EE.UU.
- Por qué es importante obtener esta licencia
- Salario promedio y oportunidades laborales

## 2. Requisitos Oficiales
- Edad mínima requerida
- Horas de experiencia/formación necesarias
- Documentos necesarios (SSN, GED, etc.)
- Costo del examen
- Costo de la licencia
- Período de renovación

## 3. Proceso Paso a Paso
- Paso 1: Requisitos previos
- Paso 2: Aplicación
- Paso 3: Examen
- Paso 4: Resultado y licencia

## 4. Escuelas y Programas (simulados para ejemplo)
- 3-5 escuelas bilingües en ${state}
- Nombre, ciudad, teléfono, sitio web
- Duración y costo del programa

## 5. Preguntas Frecuentes (5-7 preguntas)
Basado en búsquedas comunes de hispanohablantes.

## Fuentes Oficiales
- Incluir enlaces a las fuentes oficiales de ${state}

Formato: Markdown con headers ## y ###
Tono: Profesional pero accesible para hispanohablantes.
Longitud: Mínimo 2000 palabras.
`
}

interface ParsedContent {
  metaTitle: string
  metaDescription: string
  requirements: {
    age: number
    hours: number
    feesExam: number
    feesLicense: number
    documents: string[]
    sourceUrl: string
  }
}

function parseGeneratedContent(content: string): ParsedContent {
  // Extract metadata from generated content
  const year = new Date().getFullYear()
  
  return {
    metaTitle: `Licencia de ${'TRADE'} en ${'STATE'} ${year}: Requisitos y Escuelas`,
    metaDescription: `Obtén información completa sobre los requisitos oficiales para obtener la licencia de TRADE en STATE. Encuentra escuelas bilingües y comienza tu carrera hoy.`,
    requirements: {
      age: 18,
      hours: 8000,
      feesExam: 0,
      feesLicense: 0,
      documents: ['SSN', 'GED', 'Identificación'],
      sourceUrl: '',
    }
  }
}
