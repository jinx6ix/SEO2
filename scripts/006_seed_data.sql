-- Insert demo data (this will only work after users sign up through Supabase Auth)
-- This is just a reference for the data structure

-- Example profile data (will be created automatically via trigger)
-- insert into public.profiles (id, full_name, role, plan) values
-- ('user-uuid-here', 'Demo User', 'USER', 'PRO');

-- Example sites data
-- insert into public.sites (name, url, description, user_id) values
-- ('My Business Website', 'https://mybusiness.com', 'Main business website', 'user-uuid-here'),
-- ('E-commerce Store', 'https://mystore.com', 'Online store', 'user-uuid-here');

-- Note: Actual seed data should be inserted after user authentication
-- through the application interface or via authenticated API calls
