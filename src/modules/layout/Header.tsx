'use client';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { LanguageSwitcher } from '@/modules/i18n/LanguageSwitcher';
import { CitySelector } from '@/modules/cities/CitySelector';

export function Header() {
  const t = useTranslations('Common');
  const locale = useLocale();
  return (
    <header className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-40">
      <div className="container mx-auto h-16 flex items-center justify-between gap-3">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-1.5 shrink-0 group"
        >
          <span className="text-2xl font-bold tracking-tight text-gray-900">
            {t('appName')}
          </span>
          <span className="w-2 h-2 rounded-full bg-brand-500 group-hover:bg-brand-600 transition-colors" />
        </Link>
        <div className="flex items-center gap-1.5 sm:gap-3">
          <CitySelector />
          <LanguageSwitcher />
          <Link
            href={`/${locale}/auth/login`}
            className="text-sm font-medium px-3 sm:px-4 py-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors"
          >
            {t('login')}
          </Link>
          <Link
            href={`/${locale}/auth/login?role=specialist`}
            className="text-sm font-medium px-4 py-2 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition-colors hidden md:inline-block"
          >
            {t('becomeSpecialist')}
          </Link>
        </div>
      </div>
    </header>
  );
}
