# Antguru2

Аналог **Profi.ru** для Узбекистана — маркетплейс услуг (RU/UZ).

👉 **Перед запуском обязательно прочитай [SETUP.md](./SETUP.md)** — там список того, что нужно сделать тебе (Supabase, SMS-провайдер).

## Стек

- **Next.js 14** (App Router) + **TypeScript**
- **TailwindCSS** для стилей
- **Supabase** — БД + Auth (телефон + OTP) + Storage
- **next-intl** — двуязычный интерфейс (RU/UZ)
- **lucide-react** — иконки

## Структура проекта (модульная)

```
src/
├── app/
│   └── [locale]/                 # i18n routing
│       ├── layout.tsx
│       ├── page.tsx              # главная
│       └── auth/
│           ├── login/page.tsx    # ввод телефона
│           └── verify/page.tsx   # OTP-код
├── modules/                      # все фичи разнесены по модулям
│   ├── auth/                     # регистрация по телефону
│   ├── catalog/                  # категории услуг
│   ├── cities/                   # выбор города
│   ├── home/                     # секции главной (Hero, HowItWorks, Stats)
│   ├── i18n/                     # переключатель языка
│   └── layout/                   # Header, Footer
├── lib/
│   ├── supabase/                 # клиенты (browser + server)
│   └── utils/
├── i18n/                         # конфиг next-intl
├── messages/                     # ru.json, uz.json
└── middleware.ts                 # routing локалей

supabase/
└── migrations/
    └── 0001_init.sql             # все таблицы + RLS + триггеры
```

## Быстрый старт

```bash
cp .env.example .env.local
# впиши свои Supabase ключи
npm install
npm run dev
```

Откроется http://localhost:3000 → редирект на `/ru`.

## Принцип масштабирования

Каждая фича = отдельная папка в `src/modules/`. Внутри:
- `*.tsx` — React-компоненты
- `api.ts` — обращения к Supabase
- `*.ts` — утилиты, типы, данные

Так новые модули (orders, chat, payments, reviews) добавляются без переписывания старого.
