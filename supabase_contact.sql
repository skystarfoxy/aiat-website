-- ==========================================
-- 7. TABELA CONTACT_MESSAGES
-- ==========================================
create table if not exists public.contact_messages (
  id uuid default gen_random_uuid() primary key,
  name varchar not null,
  email varchar not null,
  organization varchar,
  reason varchar,
  message text not null,
  is_read boolean default false,
  created_at timestamp with time zone default now()
);

-- Activează securitatea
alter table public.contact_messages enable row level security;

-- Șterge politici vechi dacă există (pentru a evita erori la re-rulare)
drop policy if exists "Anyone can insert contact messages." on public.contact_messages;
drop policy if exists "Admins can view contact messages." on public.contact_messages;
drop policy if exists "Admins can update contact messages." on public.contact_messages;
drop policy if exists "Admins can delete contact messages." on public.contact_messages;

-- Creare politici noi
create policy "Anyone can insert contact messages." 
  on public.contact_messages for insert 
  with check ( true );

create policy "Admins can view contact messages." 
  on public.contact_messages for select 
  using ( auth.role() = 'authenticated' );

create policy "Admins can update contact messages." 
  on public.contact_messages for update 
  using ( auth.role() = 'authenticated' );

create policy "Admins can delete contact messages." 
  on public.contact_messages for delete 
  using ( auth.role() = 'authenticated' );
