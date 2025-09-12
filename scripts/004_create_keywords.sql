-- Create keywords table
create table if not exists public.keywords (
  id uuid primary key default gen_random_uuid(),
  keyword text not null,
  site_id uuid not null references public.sites(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  position integer,
  volume integer,
  difficulty integer,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.keywords enable row level security;

-- RLS policies for keywords
create policy "keywords_select_own"
  on public.keywords for select
  using (auth.uid() = user_id);

create policy "keywords_insert_own"
  on public.keywords for insert
  with check (auth.uid() = user_id);

create policy "keywords_update_own"
  on public.keywords for update
  using (auth.uid() = user_id);

create policy "keywords_delete_own"
  on public.keywords for delete
  using (auth.uid() = user_id);

-- Admin can view all keywords
create policy "keywords_select_admin"
  on public.keywords for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'ADMIN'
    )
  );

-- Create indexes
create index if not exists keywords_site_id_idx on public.keywords(site_id);
create index if not exists keywords_user_id_idx on public.keywords(user_id);
create index if not exists keywords_keyword_idx on public.keywords(keyword);
