#!/usr/bin/env python3
"""
Script para analizar el export XML de WordPress
Analiza estructura, custom fields y genera estadísticas
"""

import xml.etree.ElementTree as ET
from collections import defaultdict
from pathlib import Path
import json
from typing import Dict, List, Any

def analyze_wordpress_export(xml_path: str) -> Dict[str, Any]:
    """Analiza el export XML de WordPress"""
    
    tree = ET.parse(xml_path)
    root = tree.getroot()
    
    # Namespaces
    ns = {
        'content': 'http://purl.org/rss/1.0/modules/content/',
        'wp': 'http://wordpress.org/export/1.2/',
        'dc': 'http://purl.org/dc/elements/1.1/'
    }
    
    pages_data = []
    custom_fields_found = set()
    categories_found = defaultdict(set)
    
    for item in root.findall('.//item'):
        post_type = item.find('wp:post_type', ns)
        if post_type is None:
            continue
            
        page = {
            'title': item.find('title').text or '',
            'link': item.find('link').text or '',
            'slug': item.find('wp:post_name', ns).text or '',
            'type': post_type.text,
            'status': item.find('wp:status', ns).text or 'draft',
            'date': item.find('wp:post_date', ns).text or '',
            'categories': [],
        }
        
        # Extraer categorías
        for cat in item.findall('category'):
            domain = cat.get('domain', '')
            nicename = cat.get('nicename', '')
            cat_text = cat.text or ''
            page['categories'].append({
                'domain': domain,
                'nicename': nicename,
                'name': cat_text
            })
            if domain:
                categories_found[domain].add(cat_text)
        
        # Extraer custom fields
        for meta in item.findall('.//wp:postmeta', ns):
            key = meta.find('wp:meta_key', ns)
            value = meta.find('wp:meta_value', ns)
            if key is not None and value is not None:
                custom_fields_found.add(key.text)
                page[key.text] = value.text or ''
        
        pages_data.append(page)
    
    # Generar estadísticas
    stats = {
        'total_items': len(pages_data),
        'by_type': defaultdict(int),
        'by_status': defaultdict(int),
        'custom_fields': sorted(list(custom_fields_found)),
        'categories': dict(categories_found),
        'pages': pages_data[:50]  # Primeros 50 para revisión
    }
    
    for page in pages_data:
        stats['by_type'][page['type']] += 1
        stats['by_status'][page['status']] += 1
    
    return stats

def analyze_analytics(csv_path: str) -> Dict[str, Dict]:
    """Analiza el CSV de analytics"""
    import csv
    
    analytics = {}
    with open(csv_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            url = row.get('Páginas principales', '')
            slug = extract_slug_from_url(url)
            if slug:
                analytics[slug] = {
                    'impressions': int(row.get('Clics', '0').replace(',', '')) or int(row.get('Impresiones', '0').replace(',', '')),
                    'clicks': int(row.get('Clics', '0').replace(',', '')),
                    'ctr': row.get('CTR', '0%'),
                    'position': float(row.get('Posición', '50'))
                }
    
    return analytics

def extract_slug_from_url(url: str) -> str:
    """Extrae el slug de una URL"""
    if not url:
        return ''
    # Remover dominio y trailing slash
    slug = url.replace('https://chambaenusa.com/', '').rstrip('/')
    return slug

def calculate_priority(analytics_row: Dict, content_quality: int = 50) -> float:
    """Calcula score de prioridad (0-100)"""
    impressions = analytics_row.get('impressions', 0)
    clicks = analytics_row.get('clicks', 0)
    ctr_str = analytics_row.get('ctr', '0%')
    position = analytics_row.get('position', 50)
    
    # Parse CTR
    try:
        ctr = float(ctr_str.replace('%', '').replace(',', '.'))
    except:
        ctr = 0
    
    # Score calculation
    score = 0
    score += min(impressions / 100, 30)  # Hasta 30 puntos
    score += min(clicks * 2, 25)         # Hasta 25 puntos
    score += min(ctr * 10, 25)          # Hasta 25 puntos
    score += max(0, (15 - position))    # Hasta 30 puntos
    
    return min(score, 100)

def main():
    """Función principal"""
    xml_path = 'analiticas/chambaenusa.WordPress.2026-01-28.xml'
    analytics_path = 'analiticas/Páginas.csv'
    
    print("=" * 60)
    print("ANÁLISIS DE WORDPRESS - CHAMBAENUSA")
    print("=" * 60)
    
    # Analizar XML
    print("\n📊 Analizando export XML...")
    stats = analyze_wordpress_export(xml_path)
    
    print(f"\n📈 ESTADÍSTICAS GENERALES:")
    print(f"   Total items: {stats['total_items']}")
    print(f"\n   Por tipo:")
    for ptype, count in stats['by_type'].items():
        print(f"      - {ptype}: {count}")
    print(f"\n   Por estado:")
    for status, count in stats['by_status'].items():
        print(f"      - {status}: {count}")
    
    print(f"\n🔧 Custom Fields encontrados ({len(stats['custom_fields'])}):")
    for cf in stats['custom_fields']:
        print(f"      - {cf}")
    
    print(f"\n📁 Taxonomías:")
    for tax, values in stats['categories'].items():
        print(f"   {tax}: {len(values)} valores")
    
    # Analizar analytics
    print("\n📊 Analizando datos de Analytics...")
    analytics = analyze_analytics(analytics_path)
    print(f"   URLs analizadas: {len(analytics)}")
    
    # Top páginas por rendimiento
    print("\n🏆 TOP 10 PÁGINAS POR RENDIMIENTO:")
    print("-" * 80)
    
    sorted_pages = sorted(
        [(slug, data) for slug, data in analytics.items()],
        key=lambda x: calculate_priority(x[1]),
        reverse=True
    )[:10]
    
    for i, (slug, data) in enumerate(sorted_pages, 1):
        score = calculate_priority(data)
        print(f"{i:2}. {slug}")
        print(f"    Impresiones: {data['impressions']} | Clicks: {data['clicks']} | CTR: {data['ctr']} | Pos: {data['position']}")
        print(f"    Score: {score:.1f}/100")
    
    # Guardar resultados
    output = {
        'xml_stats': stats,
        'analytics_summary': {
            'total_urls': len(analytics),
            'top_pages': sorted_pages[:20]
        },
        'generated_at': str(__import__('datetime').datetime.now())
    }
    
    with open('scripts/output/wordpress_analysis.json', 'w') as f:
        json.dump(output, f, indent=2, default=str)
    
    print(f"\n✅ Análisis guardado en scripts/output/wordpress_analysis.json")

if __name__ == '__main__':
    main()
