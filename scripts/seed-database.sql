-- Create SQL script to seed the database instead of using Prisma
-- Create demo users (these will be created through Supabase Auth)
-- Insert demo profiles
INSERT INTO profiles (id, email, full_name, role, plan) VALUES
  ('00000000-0000-0000-0000-000000000001', 'admin@seocontrol.com', 'Admin User', 'ADMIN', 'ENTERPRISE'),
  ('00000000-0000-0000-0000-000000000002', 'demo@example.com', 'Demo User', 'USER', 'PRO')
ON CONFLICT (id) DO NOTHING;

-- Insert demo sites
INSERT INTO sites (id, name, url, description, user_id) VALUES
  ('site-1', 'My Business Website', 'https://mybusiness.com', 'Main business website', '00000000-0000-0000-0000-000000000002'),
  ('site-2', 'E-commerce Store', 'https://mystore.com', 'Online store', '00000000-0000-0000-0000-000000000002')
ON CONFLICT (id) DO NOTHING;

-- Insert demo audits
INSERT INTO audits (site_id, user_id, status, score, issues, recommendations) VALUES
  ('site-1', '00000000-0000-0000-0000-000000000002', 'COMPLETED', 85, 
   '{"critical": 2, "warning": 5, "info": 8}',
   '{"Meta descriptions": "Add missing meta descriptions to 3 pages", "Image alt text": "Add alt text to 12 images", "Page speed": "Optimize images to improve loading time"}'
  )
ON CONFLICT DO NOTHING;

-- Insert demo keywords
INSERT INTO keywords (keyword, site_id, user_id, position, volume, difficulty) VALUES
  ('seo tools', 'site-1', '00000000-0000-0000-0000-000000000002', 15, 8100, 65),
  ('website audit', 'site-1', '00000000-0000-0000-0000-000000000002', 8, 2400, 45),
  ('keyword tracking', 'site-1', '00000000-0000-0000-0000-000000000002', 23, 1600, 55)
ON CONFLICT DO NOTHING;

-- Insert demo reports
INSERT INTO reports (title, type, site_id, user_id, data) VALUES
  ('Monthly SEO Report - January 2024', 'SEO_AUDIT', 'site-1', '00000000-0000-0000-0000-000000000002',
   '{"summary": "Overall SEO performance improved by 12%", "metrics": {"organicTraffic": 15420, "avgPosition": 18.5, "totalKeywords": 156}}'
  )
ON CONFLICT DO NOTHING;
