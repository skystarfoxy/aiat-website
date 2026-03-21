-- ==========================================
-- 4. TABELA TEAM_MEMBERS
-- ==========================================
create table if not exists public.team_members (
  id uuid default gen_random_uuid() primary key,
  name varchar not null,
  role varchar not null,
  bio text,
  image_url varchar,
  linkedin_url varchar,
  order_index integer default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.team_members enable row level security;

create policy "Team members are viewable by everyone." 
  on public.team_members for select using ( true );

create policy "Admins can insert team members." 
  on public.team_members for insert with check ( auth.role() = 'authenticated' );

create policy "Admins can update team members." 
  on public.team_members for update using ( auth.role() = 'authenticated' );

create policy "Admins can delete team members." 
  on public.team_members for delete using ( auth.role() = 'authenticated' );

-- ==========================================
-- 5. TABELA EVENTS
-- ==========================================
create table if not exists public.events (
  id uuid default gen_random_uuid() primary key,
  date_text varchar not null,
  date_value timestamp with time zone default now(),
  title varchar not null,
  description text not null,
  type varchar not null,
  link_url varchar,
  status varchar default 'past', -- 'past' sau 'upcoming'
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.events enable row level security;

create policy "Events are viewable by everyone." 
  on public.events for select using ( true );

create policy "Admins can insert events." 
  on public.events for insert with check ( auth.role() = 'authenticated' );

create policy "Admins can update events." 
  on public.events for update using ( auth.role() = 'authenticated' );

create policy "Admins can delete events." 
  on public.events for delete using ( auth.role() = 'authenticated' );
