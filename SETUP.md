# Установка и настройка Antguru2

Этот документ описывает, что нужно сделать **тебе** перед запуском проекта.

## 1. Supabase — обязательно

1. Зайди на https://supabase.com → **New Project**
2. Имя: `antguru2`, регион ближе всего: `Frankfurt (eu-central-1)`
3. Сохрани **Database Password** в надёжном месте
4. После создания зайди в **Settings → API**, скопируй и пришли мне:
   - `Project URL` (например, `https://abcd1234.supabase.co`)
   - `anon public` ключ
   
   ⚠️ `service_role` ключ **никому не присылай**, он только для серверных скриптов.

5. Открой **SQL Editor → New query**, скопируй всё из `supabase/migrations/0001_init.sql` и нажми **Run**.

6. **Authentication → Providers → Phone**: включи провайдера.

## 2. SMS-провайдер для OTP

Варианты для Узбекистана:

| Провайдер | Тариф (ориентир) | Сайт |
|-----------|------------------|------|
| **Eskiz.uz** ⭐ | ~80–120 сум за SMS | https://eskiz.uz |
| Playmobile | ~100 сум за SMS | https://playmobile.uz |
| OSON SMS | по запросу | https://osonsms.uz |

### Что нужно сделать (Eskiz.uz):

1. Зарегистрируйся, пройди модерацию (2–3 рабочих дня)
2. Получи `email` + `password` для API
3. Зарегистрируй **шаблон сообщения**, например:
   ```
   Antguru: kod tasdiqlash {CODE}. Hech kimga aytmang.
   ```
4. Пришли мне `email`, `password` и текст одобренного шаблона.

📌 Я подключу SMS через **Supabase Auth Hooks (Send SMS Hook)** — Edge Function в `supabase/functions/send-sms/`.

### Тест без SMS-провайдера

Пока провайдера нет — в Supabase: **Authentication → Providers → Phone → Test OTP**:
- Добавь свой номер `+998XXXXXXXXX`
- Задай фиксированный код, например `123456`
- Можно тестировать логин без реальных SMS

## 3. Vercel — для деплоя (необязательно сейчас)

1. Создай аккаунт на https://vercel.com
2. Подключи репозиторий `Antguru2`
3. В **Environment Variables** добавь:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy.

## 4. Брендинг (можно позже)

- Логотип SVG — пока используется текстовый
- Основной цвет — пока зелёный `#10b981` (`tailwind.config.ts` → `brand`)

## 5. Локально запустить

```bash
cp .env.example .env.local
# вставь туда свои ключи Supabase
npm install
npm run dev
```

Откроется http://localhost:3000 → авто-редирект на `/ru`.

---

## План: что я (Claude) сделаю дальше

- [ ] Подключу Eskiz.uz SMS через Supabase Edge Function (когда дашь данные)
- [ ] Onboarding специалиста (выбор категорий, цен, городов)
- [ ] Каталог `/c/[slug]` со списком мастеров + фильтры
- [ ] Публичный профиль мастера
- [ ] Создание заявки клиентом (форма-визард)
- [ ] Лента заявок для мастера
- [ ] Чат между клиентом и мастером (Supabase Realtime)
- [ ] Отзывы и рейтинг (триггер пересчёта уже есть в SQL)
- [ ] Личный кабинет
- [ ] Платежи (Click / Payme / Uzum)
- [ ] Админ-панель (модерация мастеров)
