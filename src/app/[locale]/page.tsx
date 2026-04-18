import { setRequestLocale } from 'next-intl/server';
import { Header } from '@/modules/layout/Header';
import { Footer } from '@/modules/layout/Footer';
import { Hero } from '@/modules/home/Hero';
import { CategoriesGrid } from '@/modules/catalog/CategoriesGrid';
import { HowItWorks } from '@/modules/home/HowItWorks';
import { Stats } from '@/modules/home/Stats';

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CategoriesGrid />
        <HowItWorks />
        <Stats />
      </main>
      <Footer />
    </>
  );
}
