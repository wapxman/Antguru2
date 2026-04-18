export const locales = ['ru', 'uz'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'ru';
