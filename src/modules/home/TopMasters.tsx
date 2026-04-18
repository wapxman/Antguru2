'use client';
import { useTranslations, useLocale } from 'next-intl';
import { Star, MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { TOP_MASTERS, type MasterMock } from './topMastersData';

const fmt = new Intl.NumberFormat('ru-RU');

function MasterCard({ m, locale, t }: { m: MasterMock; locale: string; t: any }) {
  const category = locale === 'uz' ? m.category_uz : m.category_ru;
  const city = locale === 'uz' ? m.city_uz : m.city_ru;
  const currency = t('currency');
  return (
    <article className="snap-start shrink-0 w-[260px] sm:w-auto bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-start gap-3 mb-4">
        <div
          className={`relative w-12 h-12 rounded-full bg-gradient-to-b ${m.gradient} flex items-center justify-center overflow-hidden shrink-0`}
        >
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent" />
          <span className="text-white font-semibold relative z-10">{m.initials}</span>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-gray-900 text-base leading-tight truncate">
            {m.name}
          </h3>
          <p className="text-sm text-gray-600 truncate">{category}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 text-sm mb-2">
        <span className="flex items-center gap-1 font-medium text-gray-900">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          {m.rating.toFixed(1)}
        </span>
        <span className="text-gray-500">
          {t('masterReviews', { count: m.reviewsCount })}
        </span>
      </div>

      <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
        <MapPin className="w-4 h-4 text-gray-400" />
        {city}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="text-sm">
          <span className="text-gray-500">
            {t('masterPriceFrom', { price: `${fmt.format(m.priceFrom)} ${currency}` })}
          </span>
        </div>
        {m.available && (
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-50 text-green-700">
            {t('masterAvailable')}
          </span>
        )}
      </div>
    </article>
  );
}

export function TopMasters() {
  const t = useTranslations('Home');
  const locale = useLocale();
  return (
    <section className="py-14 md:py-20 bg-gray-50">
      <div className="container mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              {t('topMastersTitle')}
            </h2>
            <p className="text-sm md:text-base text-gray-600 mt-1">
              {t('topMastersSubtitle')}
            </p>
          </div>
          <Link
            href={`/${locale}/masters`}
            className="hidden sm:flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            {t('viewAll')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-x-auto sm:overflow-visible -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory pb-2 scrollbar-hide">
          {TOP_MASTERS.map((m) => (
            <MasterCard key={m.id} m={m} locale={locale} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
