'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Search } from 'lucide-react';

export function Hero() {
  const t = useTranslations('Home');
  const tc = useTranslations('Common');
  const [q, setQ] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: navigate to /search?q=...
  };

  return (
    <section className="bg-gradient-to-br from-brand-50 via-white to-white py-12 md:py-20">
      <div className="container mx-auto text-center max-w-3xl">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          {t('heroTitle')}
        </h1>
        <p className="text-base md:text-lg text-gray-600 mb-8">{t('heroSubtitle')}</p>
        <form onSubmit={onSubmit} className="flex bg-white rounded-2xl shadow-lg p-2 max-w-2xl mx-auto border">
          <div className="flex-1 flex items-center gap-2 px-3">
            <Search className="w-5 h-5 text-gray-400 shrink-0" />
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full py-3 outline-none text-base bg-transparent"
            />
          </div>
          <button
            type="submit"
            className="bg-brand-500 hover:bg-brand-600 text-white font-medium px-4 sm:px-6 py-3 rounded-xl shrink-0"
          >
            {tc('search')}
          </button>
        </form>
      </div>
    </section>
  );
}
