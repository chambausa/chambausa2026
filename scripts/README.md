# Scripts de Migración - ChambaEnUSA

## Descripción

Colección de scripts para migrar contenido de WordPress a Next.js + Supabase con optimización IA.

## Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `analyze_wordpress_xml.py` | Analiza estructura del export XML y genera estadísticas |
| `migrate_wordpress.py` | Migra contenido a formato Next.js + Supabase |
| `generate_content_ai.py` | Genera contenido optimizado con Claude API |

## Instalación

```bash
# Crear entorno virtual
python -m venv venv
source venv/bin/activate  # Linux/Mac
# o
.\venv\Scripts\activate   # Windows

# Instalar dependencias
pip install -r scripts/requirements.txt

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus API keys
```

## Uso

### 1. Analizar Export XML

```bash
python scripts/analyze_wordpress_xml.py
```

Genera:
- `scripts/output/wordpress_analysis.json` - Análisis completo

### 2. Migrar Contenido

```bash
python scripts/migrate_wordpress.py
```

Genera:
- `scripts/output/migrated_pages.json` - Páginas migradas
- `scripts/output/redirects.json` - Redirects 301 (JSON)
- `scripts/output/_redirects` - Redirects para Netlify/Vercel

### 3. Generar Contenido con IA

```bash
python scripts/generate_content_ai.py
```

Requiere: `ANTHROPIC_API_KEY` configurado

## Configuración de Variables de Entorno

```env
# Requerido para generate_content_ai.py
ANTHROPIC_API_KEY=sk-ant-api03-xxx

# Opcional: Supabase para migración directa
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_KEY=your-service-key
```

## Flujo de Trabajo Recomendado

```
1. python analyze_wordpress_xml.py
   └─ Revisar estadísticas generadas

2. python migrate_wordpress.py
   └─ Generar redirects y contenido migrado

3. Revisar migracion/output/
   └─ Validar contenido antes de publicar

4. Configurar redirects en Vercel/Netlify
   └─ Usar archivo _redirects

5. Importar a Supabase (opcional)
   └─ Usar API de Supabase
```

## Formato de Salida

### migrated_pages.json
```json
[
  {
    "original_slug": "licencia-electricista-texas",
    "new_slug": "licencia-electricista-texas",
    "title": "Licencia de Electricista en Texas...",
    "meta_title": "Licencia de Electricista en Texas 2026...",
    "meta_description": "Guía completa para obtener...",
    "trade": "Electricista",
    "state": "Texas",
    "priority": 85,
    "content_length": 2500
  }
]
```

### redirects.json
```json
[
  {
    "source": "/licencia-electricista-texas/",
    "destination": "/licencia-electricista-texas/",
    "permanent": true
  }
]
```

## Notas

- Los scripts usan Python 3.9+
- Requiere export XML de WordPress válido
- Claude API key necesaria solo para generación IA
- Siempre hacer backup antes de migración en producción
