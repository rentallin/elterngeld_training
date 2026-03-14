-- ═══════════════════════════════════════════════════════════════════
-- ELTERNGELD-TRAINING — Supabase Datenbankschema v2
-- Einmal ausführen im Supabase SQL-Editor
-- ═══════════════════════════════════════════════════════════════════

-- 1. PROFILES
create table if not exists public.profiles (
  id         uuid references auth.users(id) on delete cascade primary key,
  email      text,
  name       text not null,
  avatar     text not null default 'XX',
  role       text not null default 'employee' check (role in ('employee', 'admin')),
  created_at timestamptz default now()
);
alter table public.profiles enable row level security;

-- 2. HELPER: is_admin() — security definer bypasses RLS, verhindert Rekursion
create or replace function public.is_admin()
returns boolean language sql security definer stable as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

-- 3. POLICIES: profiles
drop policy if exists "own profile read" on public.profiles;
drop policy if exists "admin read all profiles" on public.profiles;
drop policy if exists "own profile insert" on public.profiles;
drop policy if exists "own profile update" on public.profiles;
drop policy if exists "admin update all profiles" on public.profiles;
drop policy if exists "profiles: own read" on public.profiles;
drop policy if exists "profiles: admin read all" on public.profiles;
drop policy if exists "profiles: own insert" on public.profiles;
drop policy if exists "profiles: own update" on public.profiles;
drop policy if exists "profiles: admin all" on public.profiles;

create policy "profiles: own read"    on public.profiles for select using (auth.uid() = id);
create policy "profiles: admin read"  on public.profiles for select using (public.is_admin());
create policy "profiles: own insert"  on public.profiles for insert with check (auth.uid() = id);
create policy "profiles: own update"  on public.profiles for update using (auth.uid() = id)
  with check (role = (select role from public.profiles where id = auth.uid()));
create policy "profiles: admin all"   on public.profiles for all using (public.is_admin());

-- 4. TRIGGER: Profil bei Sign-Up anlegen (mit E-Mail)
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
declare
  v_name   text := coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1));
  v_avatar text := coalesce(new.raw_user_meta_data->>'avatar', upper(left(split_part(new.email, '@', 1), 2)));
  v_role   text := coalesce(new.raw_user_meta_data->>'role', 'employee');
begin
  insert into public.profiles (id, email, name, avatar, role)
  values (new.id, new.email, v_name, v_avatar, v_role)
  on conflict (id) do update set email = excluded.email;
  return new;
end;
$$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 5. PROGRESS
create table if not exists public.progress (
  id                uuid default gen_random_uuid() primary key,
  user_id           uuid references public.profiles(id) on delete cascade not null,
  lesson_id         text not null,
  quiz_score        integer,
  assessment_passed boolean default false,
  completed         boolean default false,
  completed_at      timestamptz,
  updated_at        timestamptz default now(),
  unique(user_id, lesson_id)
);
alter table public.progress enable row level security;

drop policy if exists "own progress all" on public.progress;
drop policy if exists "admin read all progress" on public.progress;
drop policy if exists "progress: own all" on public.progress;
drop policy if exists "progress: admin read" on public.progress;

create policy "progress: own all"  on public.progress for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "progress: admin read" on public.progress for select
  using (public.is_admin());

-- 6. KNOWLEDGE BASE
create table if not exists public.knowledge_base (
  id         uuid default gen_random_uuid() primary key,
  title      text not null,
  content    text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table public.knowledge_base enable row level security;

drop policy if exists "authenticated read knowledge_base" on public.knowledge_base;
drop policy if exists "admin manage knowledge_base" on public.knowledge_base;

create policy "knowledge_base: read"  on public.knowledge_base for select using (auth.role() = 'authenticated');
create policy "knowledge_base: admin" on public.knowledge_base for all
  using (public.is_admin()) with check (public.is_admin());

-- 7. INDIZES
create index if not exists progress_user_idx      on public.progress(user_id);
create index if not exists progress_lesson_idx    on public.progress(lesson_id);
create index if not exists progress_completed_idx on public.progress(completed);
create index if not exists profiles_role_idx      on public.profiles(role);

-- ═══════════════════════════════════════════════════════════════════
-- NACH DEM AUSFÜHREN: Ersten Admin anlegen
-- 1. Dashboard → Authentication → Users → Add user (E-Mail + Passwort)
-- 2. UUID kopieren, dann ausführen:
--    UPDATE public.profiles SET name='Admin', avatar='AD', role='admin'
--    WHERE id='HIER-UUID';
-- 3. Optional: Authentication → Settings → Confirm email → DEAKTIVIEREN
-- ═══════════════════════════════════════════════════════════════════
