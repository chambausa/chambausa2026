"""
Script de migracion: WordPress XML -> Supabase
"""
import xml.etree.ElementTree as ET
import os
import sys
import re
from dotenv import load_dotenv
from supabase import create_client

load_dotenv()

NAMESPACES = {
    'wp': 'http://wordpress.org/export/1.2/',
    'content': 'http://purl.org/rss/1.0/modules/content/',
}

# Mapeo mejorado con variaciones
TRADE_MAP = {
    'electricista': 'electricista',
    'hvac': 'hvac',
    'cosmetologia': 'cosmetologia',
    'cosmetolog': 'cosmetologia',
    'plomeria': 'plomero',
    'plomero': 'plomero',
    'cdl': 'cdl',
}

STATE_MAP = {
    'texas': 'TX',
    'california': 'CA',
    'florida': 'FL',
    'new york': 'NY',
    'nueva york': 'NY',
    'nueva-york': 'NY',
    'arizona': 'AZ',
    'pennsylvania': 'PA',
    'colorado': 'CO',
    'nevada': 'NV',
    'georgia': 'GA',
    'nuevo mexico': 'NM',
    'nuevo-méxico': 'NM',
    'illinois': 'IL',
    'washington': 'WA',
    'minnesota': 'MN',
    'oregon': 'OR',
    'new hampshire': 'NH',
    'minnesota': 'MN',
}

def parse_xml(xml_file):
    tree = ET.parse(xml_file)
    root = tree.getroot()
    channel = root.find('channel')
    items = channel.findall('item')
    
    licenses = []
    for item in items:
        post_type = item.find('wp:post_type', NAMESPACES)
        if post_type is None or post_type.text != 'licencias':
            continue
        
        title = item.find('title').text or ''
        slug_el = item.find('wp:post_name', NAMESPACES)
        slug = slug_el.text if slug_el is not None else ''
        post_id_el = item.find('wp:post_id', NAMESPACES)
        post_id = post_id_el.text if post_id_el is not None else ''
        
        content_enc = item.find('content:encoded', NAMESPACES)
        content = content_enc.text if content_enc is not None else ''
        
        postmeta = {}
        for meta in item.findall('wp:postmeta', NAMESPACES):
            key = meta.find('wp:meta_key', NAMESPACES)
            value = meta.find('wp:meta_value', NAMESPACES)
            if key is not None and value is not None and key.text:
                postmeta[key.text] = value.text
        
        licenses.append({
            'wp_id': post_id,
            'title': title,
            'slug': slug,
            'content': content,
            'meta': postmeta,
        })
    
    return licenses

def detect_trade_state(lic):
    title = lic['title'].lower()
    
    # Detectar oficio - buscar cualquier coincidencia
    trade = None
    for key in TRADE_MAP:
        if key in title:
            trade = TRADE_MAP[key]
            break
    
    # Detectar estado
    state = None
    for key in STATE_MAP:
        if key in title:
            state = STATE_MAP[key]
            break
    
    return trade, state

def init_supabase():
    url = os.getenv('NEXT_PUBLIC_SUPABASE_URL')
    key = os.getenv('SUPABASE_SERVICE_ROLE_KEY')
    if not url or not key:
        print("ERROR: Faltan credenciales Supabase")
        sys.exit(1)
    return create_client(url, key)

def migrate(supabase, licenses):
    trades_result = supabase.table('trades').select('id, slug').execute()
    states_result = supabase.table('states').select('id, code').execute()
    
    trades_map = {t['slug']: t['id'] for t in trades_result.data}
    states_map = {s['code']: s['id'] for s in states_result.data}
    
    migrated = 0
    skipped = []
    
    for lic in licenses:
        trade, state = detect_trade_state(lic)
        
        if not trade:
            skipped.append(f"Sin oficio: {lic['title'][:40]}")
            continue
        if not state:
            skipped.append(f"Sin estado: {lic['title'][:40]}")
            continue
        
        trade_id = trades_map.get(trade)
        state_id = states_map.get(state)
        
        if not trade_id or not state_id:
            skipped.append(f"DB faltante: {lic['title'][:40]}")
            continue
        
        content_clean = re.sub(r'<!--[^>]+-->', '', lic['content'])
        content_clean = re.sub(r'<[^>]+>', '', content_clean)[:5000]
        
        data = {
            'slug': lic['slug'],
            'trade_id': trade_id,
            'state_id': state_id,
            'meta_title': lic['title'][:60],
            'meta_description': lic['title'][:160],
            'content_md': content_clean,
            'last_updated': '2025-09-01',
            'is_published': True,
        }
        
        try:
            supabase.table('license_pages').upsert(data).execute()
            print(f"  [OK] {state}/{trade}: {lic['title'][:35]}")
            migrated += 1
        except Exception as e:
            print(f"  [ERROR] {e}")
    
    return migrated, skipped

def main():
    print("=" * 50)
    print("MIGRACION WORDPRESS -> SUPABASE")
    print("=" * 50)
    
    xml_file = 'analiticas/chambaenusa.WordPress.2026-01-28.xml'
    licenses = parse_xml(xml_file)
    print(f"Licencias encontradas: {len(licenses)}")
    
    supabase = init_supabase()
    migrated, skipped = migrate(supabase, licenses)
    
    print(f"\nTotal migradas: {migrated}")
    print(f"Omitidas: {len(skipped)}")
    
    if skipped:
        print("\nOmitidas:")
        for s in skipped[:10]:
            print(f"  - {s}")

if __name__ == '__main__':
    main()
