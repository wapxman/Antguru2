'use client';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

export function MobileStickyCta() {
  const t = useTranslations('MobileCta');
  const locale = useLocale();
  return (
    <div
      className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-white/85 backdrop-blur-md border-t border-gray-200 px-4 py-3 flex gap-2"
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 0.75rem)' }}
    >
      <Link
        href={`/${locale}/auth/login`}
        className="flex-1 text-center text-sm font-medium px-4 py-3 rounded-xl bg-gray-100 text-gray-900 active:scale-[0.98] transition-transform"
      >
        {t('login')}
      </Link>
      <Link
        href={`/${locale}/auth/login`}
        className="flex-[2] text-center text-sm font-semibold px-4 py-3 rounded-xl bg-brand-500 text-white active:scale-[0.98] transition-transform"
      >
        {t('create')}
      </Link>
    </div>
  );
}
