'use client';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from './data';
import { CategoryIcon } from './CategoryIcon';

const fmt = new Intl.NumberFormat('ru-RU');

export function CategoriesGrid() {
  const t = useTranslations('Home');
  const tc = useTranslations('Categories');
  const locale = useLocale();
  return (
    <section className="py-14 md:py-20">
      <div className="container mx-auto">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            {t('popularCategories')}
          </h2>
          <Link
            href={`/${locale}/categories`}
            className="hidden sm:flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            {t('allCategories')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/${locale}/c/${c.slug}`}
              className="group bg-white border border-gray-100 rounded-2xl p-5 flex flex-col items-center text-center hover:border-gray-200 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              <CategoryIcon
                icon={c.icon}
                gradient={c.gradient}
                shadow={c.shadow}
                imageUrl={c.imageUrl}
                size="lg"
              />
              <div className="mt-3 font-semibold text-gray-900 text-sm sm:text-base">
                {tc(c.key as any)}
              </div>
              <div className="mt-0.5 text-xs text-gray-500">
                {t('categoryMastersMany', { count: fmt.format(c.mastersCount) })}
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile-only "all categories" link */}
        <div className="mt-6 sm:hidden text-center">
          <Link
            href={`/${locale}/categories`}
            className="inline-flex items-center gap-1 text-sm font-medium text-brand-600"
          >
            {t('allCategories')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
