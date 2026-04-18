# Деплой Antguru2 на Vercel

Пошаговый гайд.

## Перед началом проверь

- ✅ Репозиторий https://github.com/wapxman/Antguru2 на месте
- ✅ Supabase настроен (URL + anon key, Phone provider, Test OTP)
- ✅ Сборка локально проходит (я проверил: 6 страниц × RU/UZ собираются без ошибок)

## Шаг 1 — Аккаунт Vercel (1 мин)

1. Зайди на https://vercel.com
2. **Sign Up → Continue with GitHub** (рекомендую GitHub-вход, чтобы репозитории подхватились автоматически)
3. Разреши доступ Vercel к `wapxman/Antguru2` (можно ко всем репо или точечно только к этому)

## Шаг 2 — Импорт проекта (1 мин)

1. В дашборде Vercel: **Add New → Project**
2. Найди в списке `Antguru2` → **Import**
3. **Framework Preset:** Next.js (определится автоматически)
4. **Root Directory:** `./` (по умолчанию)
5. **Build Command, Output Directory, Install Command** — ничего не меняй, всё авто

## Шаг 3 — Environment Variables (КРИТИЧНО!)

На той же странице импорта разверни **Environment Variables** и добавь две переменные:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://gbykhwznmyzvqbhwyoig.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | (твой anon ключ, я его не храню в репе) |

⚠️ Без этих переменных сборка пройдёт, но сайт упадёт при попытке войти.

## Шаг 4 — Deploy

Нажми **Deploy**. Через ~1–2 минуты получишь ссылку вида:
```
https://antguru2-xxxxx.vercel.app
```

## Шаг 5 — Добавь URL в Supabase (важно!)

После первого деплоя, скопируй свой Vercel-URL и добавь его в Supabase:

1. Открой https://supabase.com/dashboard/project/gbykhwznmyzvqbhwyoig/auth/url-configuration
2. **Site URL:** впиши свой Vercel-домен (без `/` в конце), например `https://antguru2-xxxxx.vercel.app`
3. **Redirect URLs:** добавь все эти:
   ```
   https://antguru2-xxxxx.vercel.app/**
   http://localhost:3000/**
   ```
4. **Save**

Это нужно, чтобы Supabase принимал сессии с твоего домена.

## Шаг 6 — (Позже) Подключи свой домен antguru.uz

1. Vercel → Project Settings → **Domains** → Add `antguru.uz`
2. Vercel покажет DNS-записи (A/CNAME), которые нужно внести у регистратора
3. После пропагации (10 мин — 24 ч) — домен заработает
4. Не забудь обновить **Site URL** в Supabase на `https://antguru.uz`

## Автодеплой

После первого деплоя любой `git push` в ветку `main` → автоматический редеплой за ~1 мин. PR-ветки получат preview-домены.

## Проверка после деплоя

1. Открой `https://antguru2-xxxxx.vercel.app` → должен перекинуть на `/ru`
2. Нажми **Войти** → введи тестовый номер `+998 90 123 45 67`
3. На странице кода введи `123456`
4. Должен перекинуть обратно на главную (значит сессия создана)
5. Проверь в Supabase: https://supabase.com/dashboard/project/gbykhwznmyzvqbhwyoig/auth/users — должен появиться пользователь с твоим номером

## Частые проблемы

**«Invalid login credentials» при OTP** — телефон не в Test Phone Numbers, или код не совпадает. Проверь в Supabase → Auth → Phone.

**Белый экран на домене** — не выставлены ENV-переменные. Settings → Environment Variables, добавь и нажми **Redeploy**.

**500 в проде** — посмотри Vercel → Deployments → Latest → **Runtime Logs**, там полный stack-trace.
