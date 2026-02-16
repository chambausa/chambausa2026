"""
Script para generar contenido optimizado con Claude AI
Basado en el análisis de keywords con alto potencial SEO.
"""
import os
import sys
from dotenv import load_dotenv
from anthropic import Anthropic

load_dotenv()

def generate_license_content(trade, state, keyword_data):
    """
    Genera contenido optimizado para una licencia específica.
    
    Args:
        trade: electricista, hvac, cosmetologia, plomero, cdl
        state: TX, CA, FL, etc.
        keyword_data: dict con info del keyword objetivo
    """
    client = Anthropic(api_key=os.getenv('ANTHROPIC_API_KEY'))
    
    keyword = keyword_data.get('keyword', f'licencia de {trade} en {state}')
    intent = keyword_data.get('intent', 'informacional')
    
    prompt = f"""
Eres un experto en SEO para licencias profesionales en USA. Genera contenido optimizado en ESPAÑOL para:

TEMA: {keyword}
INTENCIÓN DE BÚSQUEDA: {intent}
OFICIO: {trade}
ESTADO: {state}

El contenido debe:
1. Ser único y no copiado de otras fuentes
2. Incluir la palabra clave principal de forma natural
3. Responder a la intención del usuario
4. Incluir CTAs para captura de leads
5. Estructura H2/H3 para SEO

Genera:
1. Meta title (60 chars max) - incl{keyword}
2. Meta description (160 chars max) - compelling
3. H1: Título optimizado
4. Introducción (2-3 párrafos)
5. Secciones H2:
   - Requisitos
   - Proceso/Pasos
   - Costos
   - Escuelas/Formación
   - Preguntas Frecuentes (5 preguntas)
6. CTA final para lead

Formato JSON:
{{
  "meta_title": "...",
  "meta_description": "...",
  "h1": "...",
  "intro": "...",
  "secciones": [
    {{"titulo": "Requisitos", "contenido": "..."}},
    {{"titulo": "Pasos para obtener la licencia", "contenido": "..."}},
    {{"titulo": "Costos estimados", "contenido": "..."}},
    {{"titulo": "Escuelas y programas", "contenido": "..."}}
  ],
  "faqs": [
    {{"pregunta": "...", "respuesta": "..."}}
  ],
  "cta": "..."
}}
"""

def generate_faq_page(topic, keywords):
    """
    Genera página FAQ para temas genéricos (ej: TDLR, CSLB)
    """
    client = Anthropic(api_key=os.getenv('ANTHROPIC_API_KEY'))
    
    prompt = f"""
Genera contenido FAQ completo en ESPAÑOL sobre: {topic}

Palabras clave relacionadas: {', '.join(keywords)}

Estructura:
1. Introducción sobre el tema
2. 10 FAQs con respuestas detalladas
3. CTA para lead

Formato JSON:
{{
  "meta_title": "...",
  "meta_description": "...",
  "h1": "...",
  "intro": "...",
  "faqs": [
    {{"pregunta": "...", "respuesta": "..."}}
  ],
  "cta": "..."
}}
"""

# Keywords prioritarios para generar contenido
PRIORITY_KEYWORDS = {
    # Alta prioridad - pages que no existen pero tienen tráfico
    "tdlr_que_es": {
        "topic": "TDLR Texas",
        "keywords": ["tdlr que es", "que significa tdlr", "tdlr en español", "tdlr texas gov"],
        "type": "faq"
    },
    "licencia_cosmetologia_general": {
        "topic": "Licencia de Cosmetología USA",
        "keywords": ["licencia de cosmetología", "licencia de estética", "requisitos cosmetología"],
        "type": "license",
        "trade": "cosmetologia"
    },
    "cosmetologia_california": {
        "topic": "Licencia Cosmetología California",
        "keywords": ["licencia cosmetología california", "cosmetología california requisitos"],
        "type": "license",
        "trade": "cosmetologia",
        "state": "CA"
    },
    "cosmetologia_new_york": {
        "topic": "Licencia Cosmetología New York",
        "keywords": ["licencia cosmetología new york", "esteticista new york requisitos"],
        "type": "license",
        "trade": "cosmetologia",
        "state": "NY"
    },
    "plomeria_general": {
        "topic": "Licencia de Plomería USA",
        "keywords": ["licencia de plomería", "plomero con licencia", "requisitos plomería"],
        "type": "license",
        "trade": "plomero"
    },
    "plomeria_texas": {
        "topic": "Licencia Plomería Texas",
        "keywords": ["licencia plomero texas", "plomería texas requisitos"],
        "type": "license",
        "trade": "plomero",
        "state": "TX"
    },
    "plomeria_florida": {
        "topic": "Licencia Plomería Florida",
        "keywords": ["licencia plomero florida", "plomería florida requisitos"],
        "type": "license",
        "trade": "plomero",
        "state": "FL"
    },
    "cdl_general": {
        "topic": "Licencia CDL USA",
        "keywords": ["licencia cdl", "cdl que es", "licencia comercial"],
        "type": "license",
        "trade": "cdl"
    },
    "cdl_texas": {
        "topic": "Licencia CDL Texas",
        "keywords": ["licencia cdl texas", "cdl texas requisitos"],
        "type": "license",
        "trade": "cdl",
        "state": "TX"
    },
    "cdl_florida": {
        "topic": "Licencia CDL Florida",
        "keywords": ["licencia cdl florida", "cdl florida requisitos"],
        "type": "license",
        "trade": "cdl",
        "state": "FL"
    },
}

def main():
    print("=" * 60)
    print("GENERACIÓN DE CONTENIDO CON CLAUDE AI")
    print("=" * 60)
    print()
    
    if not os.getenv('ANTHROPIC_API_KEY'):
        print("ERROR: ANTHROPIC_API_KEY no configurada")
        sys.exit(1)
    
    client = Anthropic(api_key=os.getenv('ANTHROPIC_API_KEY'))
    
    print("Keywords prioritarios para generar:")
    for key, data in PRIORITY_KEYWORDS.items():
        print(f"  - {key}: {data['topic']}")
    
    print(f"\nTotal: {len(PRIORITY_KEYWORDS)} piezas de contenido")
    print("\nEste script genera contenido y lo guarda para revisión.")
    print("Luego se puede migrar a Supabase una vez aprobado.")
    
    # Ejemplo de generación
    print("\n" + "=" * 60)
    print("EJEMPLO: Generando página FAQ TDLR")
    print("=" * 60)
    
    response = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=2000,
        messages=[{
            "role": "user",
            "content": """Genera 5 FAQs sobre TDLR Texas en español:

1. ¿Qué es TDLR?
2. ¿Para qué sirve?
3. ¿Cómo solicito una licencia?
4. ¿Cuánto cuesta?
5. ¿Cuánto tiempo tarda?

Responde de forma clara y concisa."""
        }]
    )
    
    print(response.content[0].text)

if __name__ == '__main__':
    main()
