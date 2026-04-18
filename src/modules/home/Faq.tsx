import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';

export function Faq() {
  const t = useTranslations('Faq');
  const items = [
    { q: t('q1'), a: t('a1') },
    { q: t('q2'), a: t('a2') },
    { q: t('q3'), a: t('a3') },
    { q: t('q4'), a: t('a4') },
    { q: t('q5'), a: t('a5') }
  ];
  return (
    <section id="faq" className="py-14 md:py-20 bg-gray-50">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
            {t('title')}
          </h2>
          <p className="text-gray-600">{t('subtitle')}</p>
        </div>
        <div className="space-y-3">
          {items.map((item, i) => (
            <details
              key={i}
              className="group bg-white rounded-2xl border border-gray-100 overflow-hidden"
            >
              <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <span className="font-medium text-gray-900 text-base">{item.q}</span>
                <ChevronDown className="w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
