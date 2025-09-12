-- Create reports table
create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  type text not null check (type in ('SEO_AUDIT', 'KEYWORD_ANALYSIS', 'COMPETITOR_ANALYSIS', 'PERFORMANCE')),
  site_id uuid not null references public.sites(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  data jsonb not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.reports enable row level security;

-- RLS policies for reports
create policy "reports_select_own"
  on public.reports for select
  using (auth.uid() = user_id);

create policy "reports_insert_own"
  on public.reports for insert
  with check (auth.uid() = user_id);

create policy "reports_update_own"
  on public.reports for update
  using (auth.uid() = user_id);

create policy "reports_delete_own"
  on public.reports for delete
  using (auth.uid() = user_id);

-- Admin can view all reports
create policy "reports_select_admin"
  on public.reports for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'ADMIN'
    )
  );

-- Create indexes
create index if not exists reports_site_id_idx on public.reports(site_id);
create index if not exists reports_user_id_idx on public.reports(user_id);
create index if not exists reports_type_idx on public.reports(type);
