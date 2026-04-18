import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Users, Calendar, MessagesSquare, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Benefit = {
  Icon: LucideIcon;
  title: string;
  text: string;
};

export function ForSpecialists() {
  const t = useTranslations('ForSpecialists');
  const locale = useLocale();

  const benefits: Benefit[] = [
    { Icon: Users,          title: t('benefit1Title'), text: t('benefit1Text') },
    { Icon: Calendar,       title: t('benefit2Title'), text: t('benefit2Text') },
    { Icon: MessagesSquare, title: t('benefit3Title'), text: t('benefit3Text') }
  ];

  return (
    <section className="py-14 md:py-24">
      <div className="container mx-auto">
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-brand-700 rounded-3xl p-8 md:p-12 text-white">
          {/* Decorative blob */}
          <div
            aria-hidden
            className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-brand-500/20 blur-3xl pointer-events-none"
          />
          <div
            aria-hidden
            className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"
          />

          <div className="relative max-w-3xl">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 text-white/80 mb-5">
              {t('badge')}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 leading-[1.1]">
              {t('title')}
            </h2>
            <p className="text-base md:text-lg text-white/75 mb-10 max-w-2xl leading-relaxed">
              {t('subtitle')}
            </p>

            <div className="grid sm:grid-cols-3 gap-6 mb-10">
              {benefits.map((b, i) => (
                <div key={i}>
                  <div className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center mb-3">
                    <b.Icon className="w-5 h-5 text-white" strokeWidth={2.25} />
                  </div>
                  <h3 className="font-semibold mb-1 text-white">{b.title}</h3>
                  <p className="text-sm text-white/70 leading-relaxed">{b.text}</p>
                </div>
              ))}
            </div>

            <Link
              href={`/${locale}/auth/login?role=specialist`}
              className="inline-flex items-center gap-2 bg-white text-gray-900 hover:bg-gray-100 font-semibold px-6 py-3.5 rounded-xl transition-colors active:scale-[0.98]"
            >
              {t('cta')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
