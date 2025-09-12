-- Create sites table
create table if not exists public.sites (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  url text not null,
  description text,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.sites enable row level security;

-- RLS policies for sites
create policy "sites_select_own"
  on public.sites for select
  using (auth.uid() = user_id);

create policy "sites_insert_own"
  on public.sites for insert
  with check (auth.uid() = user_id);

create policy "sites_update_own"
  on public.sites for update
  using (auth.uid() = user_id);

create policy "sites_delete_own"
  on public.sites for delete
  using (auth.uid() = user_id);

-- Admin can view all sites
create policy "sites_select_admin"
  on public.sites for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'ADMIN'
    )
  );

-- Create indexes
create index if not exists sites_user_id_idx on public.sites(user_id);
create index if not exists sites_created_at_idx on public.sites(created_at);
