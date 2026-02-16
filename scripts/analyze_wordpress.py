"""
Script para analizar el export de WordPress - solo guarda CSV sin output problematico.
"""
import xml.etree.ElementTree as ET
import csv
import sys

NAMESPACES = {
    'wp': 'http://wordpress.org/export/1.2/',
    'content': 'http://purl.org/rss/1.0/modules/content/',
    'dc': 'http://purl.org/dc/elements/1.1/',
}

def extract_all(xml_file):
    tree = ET.parse(xml_file)
    root = tree.getroot()
    channel = root.find('channel')
    items = channel.findall('item')
    
    licenses = []
    
    for item in items:
        post_type = item.find('wp:post_type', NAMESPACES)
        if post_type is None or post_type.text != 'licencias':
            continue
            
        title = item.find('title').text if item.find('title') is not None else ''
        slug = item.find('wp:post_name', NAMESPACES).text if item.find('wp:post_name', NAMESPACES) is not None else ''
        post_id = item.find('wp:post_id', NAMESPACES).text if item.find('wp:post_id', NAMESPACES) is not None else ''
        
        # Extraer contenido HTML completo
        content_encoded = item.find('content:encoded', NAMESPACES)
        content = content_encoded.text if content_encoded is not None else ''
        
        # Extraer postmeta
        postmeta = {}
        for meta in item.findall('wp:postmeta', NAMESPACES):
            key = meta.find('wp:meta_key', NAMESPACES)
            value = meta.find('wp:meta_value', NAMESPACES)
            if key is not None and value is not None and key.text:
                postmeta[key.text] = value.text
        
        # Extraer categorias
        cats = []
        for cat in item.findall('category'):
            if cat.text:
                cats.append(cat.text)
        
        license_data = {
            'id': post_id,
            'title': title,
            'slug': slug,
            'content': content,
            'categories': ' | '.join(cats),
            **postmeta
        }
        licenses.append(license_data)
    
    return licenses

def main():
    xml_file = 'analiticas/chambaenusa.WordPress.2026-01-28.xml'
    licenses = extract_all(xml_file)
    
    print(f"Encontradas {len(licenses)} licencias")
    
    if licenses:
        # Obtener todos los campos posibles
        all_fields = set()
        for lic in licenses:
            all_fields.update(lic.keys())
        all_fields = ['id', 'title', 'slug', 'categories', 'content'] + sorted([f for f in all_fields if f not in ['id', 'title', 'slug', 'categories', 'content']])
        
        # Guardar a CSV
        with open('analiticas/wordpress_licencias_full.csv', 'w', newline='', encoding='utf-8-sig') as f:
            writer = csv.DictWriter(f, fieldnames=all_fields)
            writer.writeheader()
            writer.writerows(licenses)
        
        print(f"Guardado: analiticas/wordpress_licencias_full.csv")
        print(f"Campos: {len(all_fields)}")
        print(f"Ejemplo - Titulo licencia 1: {licenses[0]['title'][:50]}...")

if __name__ == '__main__':
    main()
