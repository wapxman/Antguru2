# ТЗ: Главная страница Antguru2 v1

> Зафиксированное техническое задание на главную страницу. Реализовано: см. структуру `src/modules/home/` и `src/app/[locale]/page.tsx`.

## Цель

Посетитель за **3 секунды** понимает, что это маркетплейс мастеров Узбекистана. За **10 секунд** — либо начинает поиск, либо знает, какая категория ему подходит. Платформа новая → доверие критично, поэтому социальные доказательства встроены прямо в первый экран.

## Аудитория

| Кто | Что хочет | Что делает страница |
|---|---|---|
| **Клиент** (приоритет 1) | Найти мастера | Hero → Search → Categories → TopMasters |
| **Мастер** (приоритет 2) | Понять, стоит ли регистрироваться | Отдельная секция «Зарабатывайте на Antguru» |

Mobile-first. Большинство пользователей с телефонов в регионах с медленным 4G.

## Структура (8 секций)

| # | Секция | Файл | Зачем |
|---|---|---|---|
| 1 | Header | `modules/layout/Header.tsx` | Навигация, лого, город, язык, CTA |
| 2 | Hero | `modules/home/Hero.tsx` | H1 + поиск из 2 полей + популярные теги + trust-строка |
| 3 | Categories | `modules/catalog/CategoriesGrid.tsx` | 8 iOS-иконок + кол-во мастеров |
| 4 | How it works | `modules/home/HowItWorks.tsx` | 3 шага: задача → отклики → выбор |
| 5 | Top masters | `modules/home/TopMasters.tsx` | 6 карточек с моками. Горизонтальный скролл на mobile |
| 6 | For specialists | `modules/home/ForSpecialists.tsx` | Тёмный блок с CTA для исполнителей |
| 7 | FAQ | `modules/home/Faq.tsx` | 5 вопросов, native `<details>` accordion |
| 8 | Footer | `modules/layout/Footer.tsx` | 4 колонки + контакты |
| ⊕ | Sticky CTA | `modules/layout/MobileStickyCta.tsx` | Фиксированный блок снизу на mobile |

## Дизайн-принципы (Apple-tier)

- Системный шрифт (SF Pro / Segoe UI / Roboto) — никаких внешних файлов
- Заголовки: `tracking-tight font-bold text-gray-900`
- Карточки: `rounded-2xl border-gray-100`, hover: подъём `-translate-y-0.5` + тень
- Анимации: `transition-all duration-200`
- Категории и step-icons: цветные градиенты iOS, белый глиф, верхняя гланцовка, цветная тень
- Brand-зелёный `#10b981` — только акценты (CTA, точка в логотипе)

## i18n

- Все строки в `messages/ru.json` и `messages/uz.json`
- Mock-данные мастеров содержат `category_ru` + `category_uz` (выбираются по `useLocale()`)
- Цены: формат `Intl.NumberFormat('ru-RU')` + единица `сум`/`soʻm` из перевода
- Заголовки в i18n коротко переведены — без машинного перевода

## SEO

- `<title>` + `description` в `layout.tsx`
- OpenGraph + Twitter Card мета
- `hreflang` через `metadata.alternates.languages`
- JSON-LD `WebSite` + `SearchAction` инлайн в `page.tsx`
- Семантика: `<main>`, `<section>`, h1 → h2 → h3 иерархия

## Производительность

- Главная — 6.53 KB (после Apple-icons), First Load JS — 119 KB
- Все ниже-the-fold секции рендерятся статически (SSG)
- Никаких внешних шрифтов, никаких больших картинок
- Lucide-иконки tree-shaken (импортированы пофамильно)

## Out of scope (явно отложено)

- ❌ Реальные данные мастеров — нужен модуль каталога
- ❌ Поиск работает только на UI — форма ведёт в `/c/[slug]?q=...&city=...` (роут не построен)
- ❌ Dark mode — отдельная задача
- ❌ Анимации появления при скролле (Intersection Observer)
- ❌ Карта Узбекистана с городами
- ❌ Раздел блога / статей

## Готовность к расширению

- `CategoryDef.imageUrl` — приоритетней `icon`. Когда админка загрузит SVG — отрисуется он
- `MasterMock` → `Master` — структура полей совпадает с будущей таблицей `specialists` в БД
- `mastersCount` в `CATEGORIES` — мок, замена на `SELECT count(*)` через серверный компонент

## Бюджеты, которые соблюдены

| Параметр | Бюджет | Факт |
|---|---|---|
| JS на главной | ≤10 KB | 6.53 KB |
| First Load JS | ≤200 KB | 119 KB |
| Новые npm-зависимости | 0 | 0 |
| Внешние шрифты | 0 | 0 |
