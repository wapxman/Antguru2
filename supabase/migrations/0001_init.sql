-- ============================================================
-- Antguru2 — initial schema
-- Запускать в Supabase → SQL Editor → Run
-- ============================================================

-- ---------- ENUMS ----------
create type user_role as enum ('client', 'specialist', 'both');
create type lang_code as enum ('ru', 'uz');
create type order_status as enum ('open', 'in_progress', 'completed', 'cancelled');
create type response_status as enum ('pending', 'accepted', 'rejected');
create type price_unit as enum ('hour', 'service', 'day', 'sqm');

-- ---------- CITIES ----------
create table public.cities (
  id          serial primary key,
  slug        text unique not null,
  name_ru     text not null,
  name_uz     text not null,
  is_active   boolean not null default true,
  sort_order  int not null default 0
);

insert into public.cities (slug, name_ru, name_uz, sort_order) values
  ('tashkent',  'Ташкент',   'Toshkent',  1),
  ('samarkand', 'Самарканд', 'Samarqand', 2),
  ('bukhara',   'Бухара',    'Buxoro',    3),
  ('namangan',  'Наманган',  'Namangan',  4),
  ('andijan',   'Андижан',   'Andijon',   5),
  ('fergana',   'Фергана',   'Fargʻona', 6),
  ('nukus',     'Нукус',     'Nukus',     7),
  ('urgench',   'Ургенч',    'Urganch',   8);

-- ---------- CATEGORIES ----------
create table public.categories (
  id          serial primary key,
  parent_id   int references public.categories(id) on delete cascade,
  slug        text unique not null,
  name_ru     text not null,
  name_uz     text not null,
  icon        text,
  sort_order  int not null default 0,
  is_active   boolean not null default true
);

insert into public.categories (slug, name_ru, name_uz, icon, sort_order) values
  ('repair',   'Ремонт и строительство', 'Taʼmirlash va qurilish',   '🛠', 1),
  ('tutors',   'Репетиторы',             'Repetitorlar',             '📚', 2),
  ('beauty',   'Красота и здоровье',     'Goʻzallik va salomatlik', '💄', 3),
  ('it',       'IT и веб',               'IT va veb',                '💻', 4),
  ('auto',     'Авто услуги',            'Avto xizmatlari',          '🚗', 5),
  ('cleaning', 'Уборка и быт',           'Tozalash va maishiy',      '🏠', 6),
  ('events',   'Праздники',              'Bayramlar',                '🎉', 7),
  ('health',   'Здоровье',               'Salomatlik',               '🩺', 8);

-- ---------- PROFILES (extends auth.users) ----------
create table public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  full_name     text,
  avatar_url    text,
  role          user_role not null default 'client',
  language      lang_code not null default 'ru',
  city_id       int references public.cities(id),
  phone         text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index profiles_city_idx on public.profiles(city_id);

-- ---------- SPECIALISTS ----------
create table public.specialists (
  id                  uuid primary key references public.profiles(id) on delete cascade,
  bio_ru              text,
  bio_uz              text,
  experience_years    int default 0,
  is_verified         boolean not null default false,
  rating              numeric(3,2) not null default 0,
  reviews_count       int not null default 0,
  completed_orders    int not null default 0,
  response_time_min   int,
  created_at          timestamptz not null default now()
);

-- ---------- SPECIALIST <-> CATEGORIES ----------
create table public.specialist_categories (
  specialist_id  uuid references public.specialists(id) on delete cascade,
  category_id    int references public.categories(id) on delete cascade,
  price_from     bigint,
  price_to       bigint,
  currency       text not null default 'UZS',
  unit           price_unit not null default 'service',
  primary key (specialist_id, category_id)
);

-- ---------- SPECIALIST <-> CITIES ----------
create table public.specialist_cities (
  specialist_id  uuid references public.specialists(id) on delete cascade,
  city_id        int references public.cities(id) on delete cascade,
  primary key (specialist_id, city_id)
);

-- ---------- ORDERS ----------
create table public.orders (
  id              uuid primary key default gen_random_uuid(),
  client_id       uuid not null references public.profiles(id) on delete cascade,
  category_id     int not null references public.categories(id),
  city_id         int not null references public.cities(id),
  title           text not null,
  description     text,
  budget_from     bigint,
  budget_to       bigint,
  status          order_status not null default 'open',
  desired_date    date,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index orders_status_idx on public.orders(status);
create index orders_city_cat_idx on public.orders(city_id, category_id);

-- ---------- ORDER RESPONSES ----------
create table public.order_responses (
  id              uuid primary key default gen_random_uuid(),
  order_id        uuid not null references public.orders(id) on delete cascade,
  specialist_id   uuid not null references public.specialists(id) on delete cascade,
  message         text,
  proposed_price  bigint,
  status          response_status not null default 'pending',
  created_at      timestamptz not null default now(),
  unique (order_id, specialist_id)
);

-- ---------- REVIEWS ----------
create table public.reviews (
  id              uuid primary key default gen_random_uuid(),
  order_id        uuid references public.orders(id) on delete set null,
  client_id       uuid not null references public.profiles(id) on delete cascade,
  specialist_id   uuid not null references public.specialists(id) on delete cascade,
  rating          int not null check (rating between 1 and 5),
  text            text,
  created_at      timestamptz not null default now()
);

create index reviews_specialist_idx on public.reviews(specialist_id);

-- ---------- PORTFOLIO ----------
create table public.portfolio_items (
  id              uuid primary key default gen_random_uuid(),
  specialist_id   uuid not null references public.specialists(id) on delete cascade,
  title           text,
  description     text,
  image_url       text not null,
  sort_order      int not null default 0,
  created_at      timestamptz not null default now()
);

-- ============================================================
-- TRIGGERS
-- ============================================================

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, phone)
  values (new.id, new.phone)
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- updated_at auto
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_touch before update on public.profiles
  for each row execute function public.touch_updated_at();

create trigger orders_touch before update on public.orders
  for each row execute function public.touch_updated_at();

-- Recalculate specialist rating on review insert/update/delete
create or replace function public.recalc_specialist_rating()
returns trigger language plpgsql as $$
declare
  sid uuid;
begin
  sid := coalesce(new.specialist_id, old.specialist_id);
  update public.specialists s set
    rating = coalesce(
      (select round(avg(rating)::numeric, 2) from public.reviews where specialist_id = sid), 0
    ),
    reviews_count = (select count(*) from public.reviews where specialist_id = sid)
  where s.id = sid;
  return null;
end;
$$;

create trigger reviews_rating_aiud
  after insert or update or delete on public.reviews
  for each row execute function public.recalc_specialist_rating();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table public.profiles              enable row level security;
alter table public.specialists           enable row level security;
alter table public.specialist_categories enable row level security;
alter table public.specialist_cities     enable row level security;
alter table public.orders                enable row level security;
alter table public.order_responses       enable row level security;
alter table public.reviews               enable row level security;
alter table public.portfolio_items       enable row level security;
alter table public.cities                enable row level security;
alter table public.categories            enable row level security;

-- cities & categories — read all
create policy "cities_read_all"     on public.cities     for select using (true);
create policy "categories_read_all" on public.categories for select using (true);

-- profiles
create policy "profiles_read_all"   on public.profiles for select using (true);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);

-- specialists (public)
create policy "specialists_read_all"   on public.specialists for select using (true);
create policy "specialists_upsert_own" on public.specialists for all
  using (auth.uid() = id) with check (auth.uid() = id);

create policy "spec_cats_read_all"  on public.specialist_categories for select using (true);
create policy "spec_cats_write_own" on public.specialist_categories for all
  using (auth.uid() = specialist_id) with check (auth.uid() = specialist_id);

create policy "spec_cities_read_all"  on public.specialist_cities for select using (true);
create policy "spec_cities_write_own" on public.specialist_cities for all
  using (auth.uid() = specialist_id) with check (auth.uid() = specialist_id);

-- orders
create policy "orders_read_all"    on public.orders for select using (true);
create policy "orders_insert_own"  on public.orders for insert with check (auth.uid() = client_id);
create policy "orders_update_own"  on public.orders for update using (auth.uid() = client_id);
create policy "orders_delete_own"  on public.orders for delete using (auth.uid() = client_id);

-- order responses
create policy "responses_read_participants" on public.order_responses for select
  using (
    auth.uid() = specialist_id
    or auth.uid() in (select client_id from public.orders where id = order_id)
  );
create policy "responses_insert_specialist" on public.order_responses for insert
  with check (auth.uid() = specialist_id);
create policy "responses_update_specialist" on public.order_responses for update
  using (auth.uid() = specialist_id);

-- reviews
create policy "reviews_read_all"   on public.reviews for select using (true);
create policy "reviews_insert_own" on public.reviews for insert with check (auth.uid() = client_id);
create policy "reviews_update_own" on public.reviews for update using (auth.uid() = client_id);

-- portfolio
create policy "portfolio_read_all" on public.portfolio_items for select using (true);
create policy "portfolio_write_own" on public.portfolio_items for all
  using (auth.uid() = specialist_id) with check (auth.uid() = specialist_id);
