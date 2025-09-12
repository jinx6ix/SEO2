-- Create audits table
create table if not exists public.audits (
  id uuid primary key default gen_random_uuid(),
  site_id uuid not null references public.sites(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  status text default 'PENDING' check (status in ('PENDING', 'RUNNING', 'COMPLETED', 'FAILED')),
  score integer,
  issues jsonb,
  recommendations jsonb,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.audits enable row level security;

-- RLS policies for audits
create policy "audits_select_own"
  on public.audits for select
  using (auth.uid() = user_id);

create policy "audits_insert_own"
  on public.audits for insert
  with check (auth.uid() = user_id);

create policy "audits_update_own"
  on public.audits for update
  using (auth.uid() = user_id);

create policy "audits_delete_own"
  on public.audits for delete
  using (auth.uid() = user_id);

-- Admin can view all audits
create policy "audits_select_admin"
  on public.audits for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'ADMIN'
    )
  );

-- Create indexes
create index if not exists audits_site_id_idx on public.audits(site_id);
create index if not exists audits_user_id_idx on public.audits(user_id);
create index if not exists audits_status_idx on public.audits(status);
