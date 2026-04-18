import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { CATEGORIES } from '@/modules/catalog/data';

export function Footer() {
  const t = useTranslations('Footer');
  const tCommon = useTranslations('Common');
  const tCat = useTranslations('Categories');
  const locale = useLocale();

  return (
    <footer className="border-t border-gray-100 mt-16 bg-gray-50">
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href={`/${locale}`} className="flex items-center gap-1.5 mb-3">
              <span className="text-xl font-bold tracking-tight">
                {tCommon('appName')}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed">
              {t('tagline')}
            </p>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold text-sm text-gray-900 mb-3">
              {t('aboutTitle')}
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-gray-900">{t('aboutCompany')}</a></li>
              <li><a href="#" className="hover:text-gray-900">{t('aboutPress')}</a></li>
              <li><a href="#" className="hover:text-gray-900">{t('aboutCareers')}</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-sm text-gray-900 mb-3">
              {t('categoriesTitle')}
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              {CATEGORIES.slice(0, 5).map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/${locale}/c/${c.slug}`}
                    className="hover:text-gray-900"
                  >
                    {tCat(c.key as any)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-semibold text-sm text-gray-900 mb-3">
              {t('helpTitle')}
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#faq" className="hover:text-gray-900">{t('helpFaq')}</a></li>
              <li><a href="#" className="hover:text-gray-900">{t('helpRules')}</a></li>
              <li><a href="#" className="hover:text-gray-900">{t('helpTerms')}</a></li>
              <li><a href="#" className="hover:text-gray-900">{t('helpPrivacy')}</a></li>
            </ul>
          </div>
        </div>

        {/* Contacts row */}
        <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-gray-500">{t('copyright')}</p>
          <div className="flex items-center gap-4 text-sm">
            <a href="#" className="text-gray-600 hover:text-gray-900">
              {t('contactsTelegram')}
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              {t('contactsInstagram')}
            </a>
            <a href="mailto:hello@antguru.uz" className="text-gray-600 hover:text-gray-900">
              hello@antguru.uz
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
