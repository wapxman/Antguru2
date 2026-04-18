import { setRequestLocale } from 'next-intl/server';
import { Header } from '@/modules/layout/Header';
import { Footer } from '@/modules/layout/Footer';
import { MobileStickyCta } from '@/modules/layout/MobileStickyCta';
import { Hero } from '@/modules/home/Hero';
import { CategoriesGrid } from '@/modules/catalog/CategoriesGrid';
import { HowItWorks } from '@/modules/home/HowItWorks';
import { TopMasters } from '@/modules/home/TopMasters';
import { ForSpecialists } from '@/modules/home/ForSpecialists';
import { Faq } from '@/modules/home/Faq';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Antguru',
  url: 'https://antguru.uz',
  inLanguage: ['ru', 'uz'],
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://antguru.uz/ru/search?q={search_term_string}',
    'query-input': 'required name=search_term_string'
  }
};

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="pb-24 md:pb-0">
        <Hero />
        <CategoriesGrid />
        <HowItWorks />
        <TopMasters />
        <ForSpecialists />
        <Faq />
      </main>
      <Footer />
      <MobileStickyCta />
    </>
  );
}
