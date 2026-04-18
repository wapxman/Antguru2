export type MasterMock = {
  id: string;
  name: string;
  initials: string;
  /** Tailwind gradient classes for avatar bg */
  gradient: string;
  category_ru: string;
  category_uz: string;
  city_ru: string;
  city_uz: string;
  rating: number;
  reviewsCount: number;
  /** in UZS */
  priceFrom: number;
  available: boolean;
};

/**
 * MOCK data — replace with DB query (specialists + reviews + categories) once catalog ships.
 * Realistic UZ names, varied categories, realistic UZS prices.
 */
export const TOP_MASTERS: MasterMock[] = [
  {
    id: 'm1',
    name: 'Шахзод Каримов',
    initials: 'ШК',
    gradient: 'from-[#0A84FF] to-[#5856D6]',
    category_ru: 'Электрик',
    category_uz: 'Elektrik',
    city_ru: 'Ташкент',
    city_uz: 'Toshkent',
    rating: 4.9,
    reviewsCount: 127,
    priceFrom: 80000,
    available: true
  },
  {
    id: 'm2',
    name: 'Мадина Юлдашева',
    initials: 'МЮ',
    gradient: 'from-[#FF6B9D] to-[#FF2D55]',
    category_ru: 'Английский язык',
    category_uz: 'Ingliz tili',
    city_ru: 'Ташкент',
    city_uz: 'Toshkent',
    rating: 5.0,
    reviewsCount: 89,
    priceFrom: 150000,
    available: true
  },
  {
    id: 'm3',
    name: 'Бекзод Турсунов',
    initials: 'БТ',
    gradient: 'from-[#FFB340] to-[#FF7B00]',
    category_ru: 'Сантехник',
    category_uz: 'Santexnik',
    city_ru: 'Самарканд',
    city_uz: 'Samarqand',
    rating: 4.8,
    reviewsCount: 64,
    priceFrom: 100000,
    available: false
  },
  {
    id: 'm4',
    name: 'Диёра Рахимова',
    initials: 'ДР',
    gradient: 'from-[#BF5AF2] to-[#5E5CE6]',
    category_ru: 'Маникюр',
    category_uz: 'Manikyur',
    city_ru: 'Ташкент',
    city_uz: 'Toshkent',
    rating: 4.9,
    reviewsCount: 203,
    priceFrom: 120000,
    available: true
  },
  {
    id: 'm5',
    name: 'Отабек Назаров',
    initials: 'ОН',
    gradient: 'from-[#5BE9A6] to-[#34C759]',
    category_ru: 'Веб-разработчик',
    category_uz: 'Veb dasturchi',
    city_ru: 'Ташкент',
    city_uz: 'Toshkent',
    rating: 5.0,
    reviewsCount: 41,
    priceFrom: 500000,
    available: true
  },
  {
    id: 'm6',
    name: 'Нилуфар Саидова',
    initials: 'НС',
    gradient: 'from-[#64D2FF] to-[#30B0C7]',
    category_ru: 'Уборка квартир',
    category_uz: 'Kvartira tozalash',
    city_ru: 'Бухара',
    city_uz: 'Buxoro',
    rating: 4.7,
    reviewsCount: 156,
    priceFrom: 60000,
    available: true
  }
];
