'use client';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { CATEGORIES } from './data';
import { CategoryIcon } from './CategoryIcon';

export function CategoriesGrid() {
  const t = useTranslations('Home');
  const tc = useTranslations('Categories');
  const locale = useLocale();
  return (
    <section className="py-14">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center tracking-tight">
          {t('popularCategories')}
        </h2>
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
              <div className="mt-3 font-medium text-gray-900 text-sm sm:text-base">
                {tc(c.key as any)}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
