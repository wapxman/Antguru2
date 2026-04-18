# Antguru2

Аналог **Profi.ru** для Узбекистана — маркетплейс услуг (RU/UZ).

📖 Доки:
- **[SETUP.md](./SETUP.md)** — настройка Supabase и SMS-провайдера
- **[DEPLOY.md](./DEPLOY.md)** — деплой на Vercel

## Стек

- **Next.js 14** (App Router) + **TypeScript**
- **TailwindCSS**
- **Supabase** — БД + Auth (телефон + OTP) + Storage
- **next-intl** — двуязычный интерфейс (RU/UZ)
- **lucide-react** — иконки

## Структура проекта (модульная)

```
src/
├── app/
│   └── [locale]/
│       ├── layout.tsx
│       ├── page.tsx              # главная
│       └── auth/
│           ├── login/page.tsx    # ввод телефона
│           └── verify/page.tsx   # OTP-код
├── modules/
│   ├── auth/                     # регистрация по телефону
│   ├── catalog/                  # категории
│   ├── cities/                   # выбор города
│   ├── home/                     # секции главной
│   ├── i18n/                     # переключатель языка
│   └── layout/                   # Header, Footer
├── lib/
│   ├── supabase/                 # client + server
│   └── utils/
├── i18n/                         # конфиг next-intl
├── messages/                     # ru.json, uz.json
└── middleware.ts                 # routing локалей

supabase/
└── migrations/
    └── 0001_init.sql             # все таблицы + RLS + триггеры
```

## Локальный запуск

```bash
cp .env.example .env.local
# впиши ключи Supabase
npm install
npm run dev
```

Откроется http://localhost:3000 → редирект на `/ru`.

## Принцип масштабирования

Каждая фича = отдельная папка в `src/modules/`. Новые модули (orders, chat, payments, reviews) добавляются без переписывания старого.
