-- ==========================================
-- TABELA SITE_CONTENT
-- ==========================================
create table if not exists public.site_content (
  id uuid default gen_random_uuid() primary key,
  section_key varchar not null unique,
  content_value text not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.site_content enable row level security;

create policy "Site content is viewable by everyone." 
  on public.site_content for select using ( true );

create policy "Admins can manage site content." 
  on public.site_content using ( auth.role() = 'authenticated' );

-- Seeding initial content
insert into public.site_content (section_key, content_value) values
  ('hero_title', 'Inteligență Artificială pentru Transilvania'),
  ('hero_subtitle', 'Cercetare, educație și inovație din inima României spre orizontul european.'),
  ('about_title', 'Despre AI Transilvania'),
  ('about_description', 'O organizație dedicată promovării AI în mod responsabil și durabil.')
on conflict (section_key) do nothing;
