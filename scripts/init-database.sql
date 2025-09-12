-- Initialize SEOControl Database
-- This script sets up the initial database structure

-- Enable foreign key constraints for SQLite
PRAGMA foreign_keys = ON;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_email ON User(email);
CREATE INDEX IF NOT EXISTS idx_site_user_id ON Site(userId);
CREATE INDEX IF NOT EXISTS idx_audit_site_id ON Audit(siteId);
CREATE INDEX IF NOT EXISTS idx_keyword_site_id ON Keyword(siteId);
CREATE INDEX IF NOT EXISTS idx_report_site_id ON Report(siteId);

-- Insert initial system data
INSERT OR IGNORE INTO User (id, email, name, role, plan, createdAt, updatedAt) 
VALUES ('system', 'system@seocontrol.com', 'System', 'ADMIN', 'ENTERPRISE', datetime('now'), datetime('now'));
