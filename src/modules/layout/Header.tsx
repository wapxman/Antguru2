'use client';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { LanguageSwitcher } from '@/modules/i18n/LanguageSwitcher';
import { CitySelector } from '@/modules/cities/CitySelector';

export function Header() {
  const t = useTranslations('Common');
  const locale = useLocale();
  return (
    <header className="border-b bg-white sticky top-0 z-40">
      <div className="container mx-auto h-16 flex items-center justify-between gap-3">
        <Link href={`/${locale}`} className="text-2xl font-bold text-brand-600 shrink-0">
          {t('appName')}
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <CitySelector />
          <LanguageSwitcher />
          <Link
            href={`/${locale}/auth/login`}
            className="text-sm font-medium px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            {t('login')}
          </Link>
          <Link
            href={`/${locale}/auth/login?role=specialist`}
            className="text-sm font-medium px-4 py-2 rounded-lg bg-brand-500 text-white hover:bg-brand-600 hidden md:inline-block"
          >
            {t('becomeSpecialist')}
          </Link>
        </div>
      </div>
    </header>
  );
}
