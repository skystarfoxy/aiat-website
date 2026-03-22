-- ==========================================
-- 8. TABELA NEWSLETTER_SUBSCRIBERS
-- ==========================================
create table if not exists public.newsletter_subscribers (
  id uuid default gen_random_uuid() primary key,
  email varchar not null unique,
  status varchar default 'active',
  created_at timestamp with time zone default now()
);

-- Activează securitatea
alter table public.newsletter_subscribers enable row level security;

-- Șterge politici vechi dacă există
drop policy if exists "Anyone can subscribe to newsletter." on public.newsletter_subscribers;
drop policy if exists "Admins can view newsletter subscribers." on public.newsletter_subscribers;
drop policy if exists "Admins can delete subscribers." on public.newsletter_subscribers;

-- Creare politici noi
create policy "Anyone can subscribe to newsletter." 
  on public.newsletter_subscribers for insert 
  with check ( true );

create policy "Admins can view newsletter subscribers." 
  on public.newsletter_subscribers for select 
  using ( auth.role() = 'authenticated' );

create policy "Admins can delete subscribers." 
  on public.newsletter_subscribers for delete 
  using ( auth.role() = 'authenticated' );
