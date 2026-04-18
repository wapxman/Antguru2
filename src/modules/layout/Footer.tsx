import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('Common');
  return (
    <footer className="border-t mt-16 py-8 text-center text-sm text-gray-500">
      <p>© 2026 {t('appName')}. Toshkent, Oʻzbekiston.</p>
    </footer>
  );
}
