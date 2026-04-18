'use client';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { locales } from '@/i18n/config';

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const change = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/') || `/${newLocale}`);
  };

  return (
    <div className="flex items-center gap-1 text-sm bg-gray-100 rounded-lg p-1">
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => change(l)}
          className={
            'px-2 py-1 rounded-md font-medium transition ' +
            (l === locale
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900')
          }
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
