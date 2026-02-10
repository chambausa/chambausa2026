import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('es-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('es-US').format(num)
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function getTradeNameBySlug(slug: string): string {
  const tradeNames: Record<string, string> = {
    'electricista': 'Electricista',
    'cdl': 'Licencia CDL',
    'cosmetologia': 'Cosmetología',
    'plomero': 'Plomero',
    'hvac': 'Técnico HVAC',
  }
  return tradeNames[slug] || slug
}

export function getStateNameByCode(code: string): string {
  const stateNames: Record<string, string> = {
    'TX': 'Texas',
    'CA': 'California',
    'FL': 'Florida',
    'NY': 'New York',
    'AZ': 'Arizona',
    'PA': 'Pennsylvania',
    'CO': 'Colorado',
    'NV': 'Nevada',
    'GA': 'Georgia',
    'NM': 'Nuevo México',
    'IL': 'Illinois',
    'WA': 'Washington',
    'MN': 'Minnesota',
    'OR': 'Oregon',
  }
  return stateNames[code] || code
}
