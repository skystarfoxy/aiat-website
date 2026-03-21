-- ==========================================
-- 6. TABELA PROJECTS
-- ==========================================
create table if not exists public.projects (
  id uuid default gen_random_uuid() primary key,
  title varchar not null,
  category varchar not null,
  description text not null,
  link_url varchar,
  status varchar default 'În desfășurare',
  icon_name varchar default 'Database',
  theme_color varchar default 'primary',
  order_index integer default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.projects enable row level security;

create policy "Projects are viewable by everyone." 
  on public.projects for select using ( true );

create policy "Admins can insert projects." 
  on public.projects for insert with check ( auth.role() = 'authenticated' );

create policy "Admins can update projects." 
  on public.projects for update using ( auth.role() = 'authenticated' );

create policy "Admins can delete projects." 
  on public.projects for delete using ( auth.role() = 'authenticated' );

-- ==========================================
-- INSERĂRI DATE (DUMMY DATA)
-- ==========================================

-- Echipă
INSERT INTO public.team_members (name, role, bio, order_index) VALUES 
('Radu Popescu', 'Președinte & Membru Fondator', 'Cercetător AI cu peste 10 ani de experiență în procesarea limbajului natural. Doctor în Informatică.', 1),
('Elena Ionescu', 'Vicepreședinte Educație', 'Fost cadru didactic universitar, pasionată de aducerea conceptelor STEM și AI în învățământul preuniversitar.', 2),
('Andrei Vasile', 'Director Cercetare', 'Machine Learning Engineer specializat pe computer vision aplicat în domeniul medical și imagistică.', 3)
ON CONFLICT DO NOTHING;

-- Proiecte
INSERT INTO public.projects (title, category, description, status, icon_name, theme_color, order_index) VALUES 
('RoNLP Open Dataset', 'Cercetare', 'Un corpus complet și open-source pentru antrenarea modelelor de procesare a limbajului natural în limba română.', 'În desfășurare', 'Database', 'primary', 1),
('AI în Educație', 'Educație', 'O curriculă introductivă și materiale didactice open-source pentru predarea conceptelor de bază ale inteligenței artificiale în licee.', 'Planificare', 'GraduationCap', 'accent', 2),
('MedAssist AI', 'Inovație', 'Sistem decizional bazat pe computer vision pentru diagnosticarea rapidă a afecțiunilor pe baza imagisticii medicale.', 'Cercetare', 'Stethoscope', 'violet', 3)
ON CONFLICT DO NOTHING;

-- Evenimente
INSERT INTO public.events (date_text, title, description, type, status) VALUES 
('Sep 2024', 'Înființarea Asociației', 'Grup de lucru cu specialiști din Transilvania pentru conturarea viziunii AI Transilvania.', 'fundare', 'past'),
('Nov 2024', 'Lansarea Oficială', 'Prima conferință deschisă la Sibiu, vizând potențialul AI în industriile locale.', 'lansare', 'past'),
('Q1 2025', 'Primul Hackathon Studențesc', 'Dezvoltarea de soluții AI pentru probleme comunitare — implicarea universităților.', 'concurs', 'upcoming')
ON CONFLICT DO NOTHING;
