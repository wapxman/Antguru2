import { useTranslations } from 'next-intl';
import { FileText, MessageSquare, Star } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Step = {
  Icon: LucideIcon;
  gradient: string;
  shadow: string;
  title: string;
  text: string;
  num: string;
};

export function HowItWorks() {
  const t = useTranslations('Home');
  const steps: Step[] = [
    {
      Icon: FileText,
      gradient: 'from-[#64D2FF] to-[#0A84FF]',
      shadow: 'shadow-[0_8px_20px_-4px_rgba(10,132,255,0.45)]',
      title: t('step1Title'),
      text: t('step1Text'),
      num: '01'
    },
    {
      Icon: MessageSquare,
      gradient: 'from-[#BF5AF2] to-[#5E5CE6]',
      shadow: 'shadow-[0_8px_20px_-4px_rgba(94,92,230,0.45)]',
      title: t('step2Title'),
      text: t('step2Text'),
      num: '02'
    },
    {
      Icon: Star,
      gradient: 'from-[#FFD60A] to-[#FF9F0A]',
      shadow: 'shadow-[0_8px_20px_-4px_rgba(255,159,10,0.45)]',
      title: t('step3Title'),
      text: t('step3Text'),
      num: '03'
    }
  ];
  return (
    <section className="py-14 md:py-20 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-10 text-center">
          {t('howItWorks')}
        </h2>
        <div className="grid md:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto">
          {steps.map((s, i) => (
            <div
              key={i}
              className="relative bg-white rounded-2xl p-6 border border-gray-100"
            >
              <div className="absolute top-5 right-5 text-xs font-mono text-gray-300">
                {s.num}
              </div>
              <div
                className={`relative w-14 h-14 mb-4 rounded-[14px] bg-gradient-to-b ${s.gradient} ${s.shadow} flex items-center justify-center overflow-hidden`}
              >
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
                <s.Icon className="w-7 h-7 text-white relative z-10 drop-shadow-sm" strokeWidth={2.25} />
              </div>
              <h3 className="font-semibold text-lg mb-2 tracking-tight">{s.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
