export type City = {
  slug: string;
  name_ru: string;
  name_uz: string;
};

export const CITIES: City[] = [
  { slug: 'tashkent',  name_ru: 'Ташкент',   name_uz: 'Toshkent' },
  { slug: 'samarkand', name_ru: 'Самарканд', name_uz: 'Samarqand' },
  { slug: 'bukhara',   name_ru: 'Бухара',    name_uz: 'Buxoro' },
  { slug: 'namangan',  name_ru: 'Наманган',  name_uz: 'Namangan' },
  { slug: 'andijan',   name_ru: 'Андижан',   name_uz: 'Andijon' },
  { slug: 'fergana',   name_ru: 'Фергана',   name_uz: 'Fargʻona' },
  { slug: 'nukus',     name_ru: 'Нукус',     name_uz: 'Nukus' },
  { slug: 'urgench',   name_ru: 'Ургенч',    name_uz: 'Urganch' }
];
