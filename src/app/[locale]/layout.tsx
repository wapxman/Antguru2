import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/config';
import '@/app/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://antguru.uz'),
  title: {
    default: 'Antguru — найди мастера в Узбекистане',
    template: '%s · Antguru'
  },
  description:
    '5 000+ проверенных специалистов в Узбекистане. Опишите задачу — получите отклики мастеров за 30 минут. Бесплатно для клиентов. RU / UZ.',
  applicationName: 'Antguru',
  openGraph: {
    type: 'website',
    siteName: 'Antguru',
    title: 'Antguru — мастера Узбекистана',
    description:
      'Маркетплейс проверенных мастеров: ремонт, репетиторы, красота, IT, авто и многое другое. Ташкент, Самарканд, Бухара и другие города.'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Antguru — мастера Узбекистана'
  },
  alternates: {
    languages: {
      ru: '/ru',
      uz: '/uz'
    }
  },
  robots: { index: true, follow: true }
};

export const viewport = {
  themeColor: '#10b981',
  width: 'device-width',
  initialScale: 1
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as any)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body className="bg-white text-gray-900 antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
