-- ==========================================
-- 8. TABELA NEWSLETTER_SUBSCRIBERS
-- ==========================================
create table if not exists public.newsletter_subscribers (
  id uuid default gen_random_uuid() primary key,
  email varchar not null unique,
  status varchar default 'active', -- 'active', 'unsubscribed'
  created_at timestamp with time zone default now()
);

-- Activează securitatea
alter table public.newsletter_subscribers enable row level security;

-- Permite oricui să se aboneze (INSERT public)
create policy "Anyone can subscribe to newsletter." 
  on public.newsletter_subscribers for insert 
  with check ( true );

-- Permite doar administratorilor să vadă lista de abonați
create policy "Admins can view newsletter subscribers." 
  on public.newsletter_subscribers for select 
  using ( auth.role() = 'authenticated' );

-- Permite administratorilor să șteargă abonați
create policy "Admins can delete subscribers." 
  on public.newsletter_subscribers for delete 
  using ( auth.role() = 'authenticated' );
