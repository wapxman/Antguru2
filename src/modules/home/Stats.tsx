import { useTranslations } from 'next-intl';

export function Stats() {
  const t = useTranslations('Home');
  const items = [
    { value: '5 000+', label: t('statSpecialists') },
    { value: '14', label: t('statRegions') },
    { value: '12 000+', label: t('statOrders') }
  ];
  return (
    <section className="py-12">
      <div className="container mx-auto grid grid-cols-3 gap-4 max-w-3xl text-center">
        {items.map((it, i) => (
          <div key={i}>
            <div className="text-2xl md:text-4xl font-bold text-brand-600">{it.value}</div>
            <div className="text-xs md:text-sm text-gray-600 mt-1">{it.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
