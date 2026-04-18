import { useTranslations } from 'next-intl';
import { FileText, MessageSquare, Star } from 'lucide-react';

export function HowItWorks() {
  const t = useTranslations('Home');
  const steps = [
    { Icon: FileText, title: t('step1Title'), text: t('step1Text') },
    { Icon: MessageSquare, title: t('step2Title'), text: t('step2Text') },
    { Icon: Star, title: t('step3Title'), text: t('step3Text') }
  ];
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">
          {t('howItWorks')}
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {steps.map((s, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 text-center border">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center">
                <s.Icon className="w-7 h-7" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
              <p className="text-gray-600 text-sm">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
