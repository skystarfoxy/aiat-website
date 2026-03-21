-- Supabase SQL Schema for AI Transilvania CMS
-- Rulează acest script în SQL Editor din consola Supabase.

-- ==========================================
-- 1. TABELA POSTS (PENTRU ARTICOLE DE BLOG)
-- ==========================================
create table if not exists public.posts (
  id uuid default gen_random_uuid() primary key,
  title varchar not null,
  slug varchar not null unique,
  content text not null,
  cover_image varchar,
  published_at timestamp with time zone default now(),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Activează securitatea (Row Level Security)
alter table public.posts enable row level security;

-- Permite citirea tuturor utilizatorilor publici
create policy "Public posts are viewable by everyone." 
  on public.posts for select 
  using ( true );

-- Permite modificarea doar pentru utilizatorii autentificați (Admini)
create policy "Admins can insert posts." 
  on public.posts for insert 
  with check ( auth.role() = 'authenticated' );

create policy "Admins can update posts." 
  on public.posts for update 
  using ( auth.role() = 'authenticated' );

create policy "Admins can delete posts." 
  on public.posts for delete 
  using ( auth.role() = 'authenticated' );

-- ==========================================
-- 2. TABELA SITE_CONTENT (PENTRU TEXTE SITE)
-- ==========================================
create table if not exists public.site_content (
  id uuid default gen_random_uuid() primary key,
  section_key varchar not null unique,
  content_value text not null,
  description text,
  updated_at timestamp with time zone default now()
);

-- Activează securitatea
alter table public.site_content enable row level security;

-- Oricine poate citi textele site-ului
create policy "Site content is viewable by everyone." 
  on public.site_content for select 
  using ( true );

-- Doar adminii pot modifica textele
create policy "Admins can insert site content." 
  on public.site_content for insert 
  with check ( auth.role() = 'authenticated' );

create policy "Admins can update site content." 
  on public.site_content for update 
  using ( auth.role() = 'authenticated' );

create policy "Admins can delete site content." 
  on public.site_content for delete 
  using ( auth.role() = 'authenticated' );

-- ==========================================
-- 3. INSERĂRI INIȚIALE (DEFAULT CONTENT)
-- ==========================================
insert into public.site_content (section_key, content_value, description)
values
  ('hero_title', 'Inteligența artificială în slujba Transilvaniei și a lumii', 'Titlul principal din secțiunea Hero (Acasă)'),
  ('hero_subtitle', 'Asociație de cercetare, educație și inovație în AI — fondată în Dumbrăveni, Jud. Sibiu, cu impact regional și european.', 'Subtitlul din secțiunea Hero (Acasă)'),
  ('about_title', 'Despre AI Transilvania', 'Titlul secțiunii Despre (Acasă)'),
  ('about_description', 'O organizație fondată de oameni care cred că inteligența artificială poate transforma societatea — în mod responsabil, inclusiv și durabil.', 'Descrierea asociației din secțiunea Despre')
on conflict (section_key) do nothing;
