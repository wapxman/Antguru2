'use client';
import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Star } from 'lucide-react';
import { CITIES } from '@/modules/cities/data';

export function Hero() {
  const t = useTranslations('Home');
  const locale = useLocale();
  const router = useRouter();
  const [q, setQ] = useState('');
  const [city, setCity] = useState(CITIES[0].slug);

  const popular = [
    t('popular1'),
    t('popular2'),
    t('popular3'),
    t('popular4'),
    t('popular5')
  ];

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;
    // Catalog page is next module — for now navigate to /search query string
    router.push(`/${locale}/search?q=${encodeURIComponent(query)}&city=${city}`);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/60 via-white to-white">
      {/* Subtle background blobs */}
      <div
        aria-hidden
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brand-100/40 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute top-32 -left-32 w-80 h-80 rounded-full bg-blue-100/40 blur-3xl pointer-events-none"
      />

      <div className="container mx-auto pt-12 pb-14 md:pt-20 md:pb-20 relative">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-5">
            {t('heroTitle')}
          </h1>
          <p className="text-base md:text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            {t('heroSubtitle')}
          </p>

          {/* Search form: 2 fields + button. Stacks on mobile. */}
          <form
            onSubmit={onSubmit}
            className="bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 p-2 max-w-2xl mx-auto flex flex-col sm:flex-row gap-2"
          >
            <div className="flex-1 flex items-center gap-2 px-3 min-w-0">
              <Search className="w-5 h-5 text-gray-400 shrink-0" />
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t('heroSearchWhat')}
                className="w-full py-3 outline-none text-base bg-transparent placeholder:text-gray-400"
              />
            </div>
            <div className="flex items-center gap-2 px-3 sm:border-l sm:border-gray-100 shrink-0">
              <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="py-3 outline-none text-base bg-transparent appearance-none pr-6 cursor-pointer"
              >
                {CITIES.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {locale === 'uz' ? c.name_uz : c.name_ru}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="bg-brand-500 hover:bg-brand-600 active:scale-[0.98] text-white font-semibold px-6 py-3 rounded-xl transition-all shrink-0"
            >
              {t('heroSubmit')}
            </button>
          </form>

          {/* Popular tags */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm">
            <span className="text-gray-500">{t('popularLabel')}</span>
            {popular.map((tag) => (
              <button
                key={tag}
                onClick={() => setQ(tag)}
                className="px-3 py-1 rounded-full bg-white border border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Trust strip */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-600">
            <span className="font-medium text-gray-900">
              {t('trustMasters', { count: '5 000' })}
            </span>
            <span className="hidden sm:inline text-gray-300">·</span>
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              {t('trustRating', { rating: '4.8' })}
            </span>
            <span className="hidden sm:inline text-gray-300">·</span>
            <span>{t('trustOrders', { count: '12 000' })}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
