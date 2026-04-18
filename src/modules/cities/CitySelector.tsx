'use client';
import { useState } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import { useLocale } from 'next-intl';
import { CITIES } from './data';

export function CitySelector() {
  const [open, setOpen] = useState(false);
  const [city, setCity] = useState(CITIES[0]);
  const locale = useLocale();
  const label = locale === 'uz' ? city.name_uz : city.name_ru;
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 text-sm px-2 sm:px-3 py-2 rounded-lg hover:bg-gray-100"
      >
        <MapPin className="w-4 h-4 text-brand-500" />
        <span className="hidden sm:inline">{label}</span>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute top-full mt-1 right-0 bg-white border rounded-xl shadow-lg py-2 min-w-[200px] z-50">
            {CITIES.map((c) => (
              <button
                key={c.slug}
                onClick={() => { setCity(c); setOpen(false); }}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
              >
                {locale === 'uz' ? c.name_uz : c.name_ru}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
