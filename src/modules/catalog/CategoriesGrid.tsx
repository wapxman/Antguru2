'use client';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { CATEGORIES } from './data';

export function CategoriesGrid() {
  const t = useTranslations('Home');
  const tc = useTranslations('Categories');
  const locale = useLocale();
  return (
    <section className="py-14">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          {t('popularCategories')}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/${locale}/c/${c.slug}`}
              className="group bg-white border rounded-2xl p-5 text-center hover:shadow-md hover:border-brand-200 transition"
            >
              <div className="text-4xl mb-2">{c.emoji}</div>
              <div className="font-medium text-gray-900 group-hover:text-brand-600">
                {tc(c.key as any)}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
