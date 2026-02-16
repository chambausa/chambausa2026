import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { Resend } from 'resend'
import { z } from 'zod'

// Validation schema
const leadSchema = z.object({
  name: z.string().min(2, 'Nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  pageId: z.string().optional(),
  tradeId: z.string().optional(),
  stateId: z.string().optional(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate input
    const validatedData = leadSchema.parse(body)
    
    const supabase = createClient()
    const resend = new Resend(process.env.RESEND_API_KEY)
    
    // Save lead to database
    const { data: lead, error } = await supabase
      .from('leads')
      .insert({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone || null,
        page_id: validatedData.pageId || null,
        trade_id: validatedData.tradeId || null,
        state_id: validatedData.stateId || null,
        status: 'new',
        source_page: validatedData.pageId || null,
      })
      .select()
      .single()

    if (error) {
      console.error('Error saving lead:', error)
      return NextResponse.json(
        { error: 'Error al guardar el lead' },
        { status: 500 }
      )
    }

    // Send confirmation email
    await resend.emails.send({
      from: 'ChambaEnUSA <noreply@chambaenusa.com>',
      to: validatedData.email,
      subject: 'Gracias por tu interés en ChambaEnUSA',
      html: `
        <h1>¡Hola ${validatedData.name}!</h1>
        <p>Hemos recibido tu solicitud de información sobre licencias de oficios.</p>
        <p>Un asesor te contactará pronto para ayudarte a comenzar tu carrera.</p>
        <p>Si tienes preguntas urgentes, no dudes en responder a este email.</p>
        <p>Saludos,<br>El equipo de ChambaEnUSA</p>
      `,
    })

    // Optional: Send notification to admin
    if (process.env.ADMIN_EMAIL) {
      await resend.emails.send({
        from: 'ChambaEnUSA <noreply@chambaenusa.com>',
        to: process.env.ADMIN_EMAIL,
        subject: 'Nuevo lead en ChambaEnUSA',
        html: `
          <h2>Nuevo lead registrado</h2>
          <p><strong>Nombre:</strong> ${validatedData.name}</p>
          <p><strong>Email:</strong> ${validatedData.email}</p>
          <p><strong>Teléfono:</strong> ${validatedData.phone || 'No proporcionado'}</p>
          <p><strong>Página:</strong> ${validatedData.pageId || 'N/A'}</p>
        `,
      })
    }

    return NextResponse.json({ 
      success: true, 
      leadId: lead.id 
    })
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: error.errors },
        { status: 400 }
      )
    }
    
    console.error('Error processing lead:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
