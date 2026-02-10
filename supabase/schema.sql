-- ChambaEnUSA Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Trades (Oficios)
CREATE TABLE trades (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name_es TEXT NOT NULL,
  name_en TEXT NOT NULL,
  avg_salary NUMERIC,
  salary_unit TEXT DEFAULT 'annual',
  description_md TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- States (Estados)
CREATE TABLE states (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  name_es TEXT NOT NULL,
  name_en TEXT NOT NULL,
  region TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Requirements (Requisitos oficiales)
CREATE TABLE requirements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trade_id UUID REFERENCES trades(id) ON DELETE CASCADE,
  state_id UUID REFERENCES states(id) ON DELETE CASCADE,
  age_min INTEGER,
  hours_required INTEGER,
  fees_exam NUMERIC,
  fees_license NUMERIC,
  documents_required TEXT[],
  renewal_period_years INTEGER,
  source_url TEXT,
  source_updated_at DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(trade_id, state_id)
);

-- Schools (Escuelas)
CREATE TABLE schools (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  city TEXT,
  state_id UUID REFERENCES states(id) ON DELETE CASCADE,
  phone TEXT,
  website TEXT,
  is_bilingual BOOLEAN DEFAULT TRUE,
  accreditation TEXT,
  description_md TEXT,
  rating_google NUMERIC,
  lat NUMERIC,
  lng NUMERIC,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Programs (Programas de estudio)
CREATE TABLE programs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  trade_id UUID REFERENCES trades(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  duration_months INTEGER,
  cost NUMERIC,
  modality TEXT DEFAULT 'presencial',
  hours INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- License Pages (Páginas generadas)
CREATE TABLE license_pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  trade_id UUID REFERENCES trades(id) ON DELETE CASCADE,
  state_id UUID REFERENCES states(id) ON DELETE CASCADE,
  meta_title TEXT,
  meta_description TEXT,
  content_md TEXT,
  last_updated DATE,
  is_published BOOLEAN DEFAULT TRUE,
  views INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(trade_id, state_id)
);

-- Leads (Captura de leads)
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  state_id UUID REFERENCES states(id) ON DELETE SET NULL,
  trade_id UUID REFERENCES trades(id) ON DELETE SET NULL,
  source_page TEXT,
  status TEXT DEFAULT 'new',
  crm_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_license_pages_slug ON license_pages(slug);
CREATE INDEX idx_license_pages_published ON license_pages(is_published, updated_at);
CREATE INDEX idx_schools_state ON schools(state_id);
CREATE INDEX idx_schools_bilingual ON schools(is_bilingual) WHERE is_bilingual = TRUE;
CREATE INDEX idx_programs_school ON programs(school_id);
CREATE INDEX idx_programs_trade ON programs(trade_id);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created ON leads(created_at DESC);
CREATE INDEX idx_trades_slug ON trades(slug);
CREATE INDEX idx_states_code ON states(code);

-- Row Level Security
ALTER TABLE license_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public can read license pages" ON license_pages
  FOR SELECT USING (is_published = true);

CREATE POLICY "Public can read schools" ON schools
  FOR SELECT USING (true);

-- Admin write access (configure with care)
CREATE POLICY "Admins can manage all" ON license_pages
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage all" ON schools
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage all" ON leads
  FOR ALL USING (auth.role() = 'authenticated');

-- Updated at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_trades_updated_at BEFORE UPDATE ON trades
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_states_updated_at BEFORE UPDATE ON states
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_requirements_updated_at BEFORE UPDATE ON requirements
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_schools_updated_at BEFORE UPDATE ON schools
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_programs_updated_at BEFORE UPDATE ON programs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_license_pages_updated_at BEFORE UPDATE ON license_pages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Seed data for trades
INSERT INTO trades (slug, name_es, name_en, avg_salary, description_md) VALUES
('electricista', 'Electricista', 'Electrician', 60000, NULL),
('cdl', 'Licencia CDL', 'CDL License', 55000, NULL),
('cosmetologia', 'Cosmetología', 'Cosmetology', 35000, NULL),
('hvac', 'Técnico HVAC', 'HVAC Technician', 50000, NULL),
('plomero', 'Plomero', 'Plumber', 55000, NULL)
ON CONFLICT (slug) DO NOTHING;

-- Seed data for states
INSERT INTO states (code, name_es, name_en, region) VALUES
('TX', 'Texas', 'Texas', 'southwest'),
('CA', 'California', 'California', 'west'),
('FL', 'Florida', 'Florida', 'southeast'),
('NY', 'New York', 'New York', 'northeast'),
('AZ', 'Arizona', 'Arizona', 'west'),
('PA', 'Pennsylvania', 'Pennsylvania', 'northeast'),
('CO', 'Colorado', 'Colorado', 'west'),
('NV', 'Nevada', 'Nevada', 'west'),
('GA', 'Georgia', 'Georgia', 'southeast'),
('NM', 'Nuevo México', 'New Mexico', 'southwest'),
('IL', 'Illinois', 'Illinois', 'midwest'),
('WA', 'Washington', 'Washington', 'west'),
('MN', 'Minnesota', 'Minnesota', 'midwest'),
('OR', 'Oregon', 'Oregon', 'west')
ON CONFLICT (code) DO NOTHING;
