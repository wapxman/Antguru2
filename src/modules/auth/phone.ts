/**
 * Маска ввода: '+998 90 123 45 67'
 */
export function formatPhone(input: string): string {
  let d = input.replace(/\D/g, '');
  if (d.startsWith('998')) d = d.slice(3);
  d = d.slice(0, 9);

  const p1 = d.slice(0, 2);
  const p2 = d.slice(2, 5);
  const p3 = d.slice(5, 7);
  const p4 = d.slice(7, 9);

  let out = '+998';
  if (p1) out += ' ' + p1;
  if (p2) out += ' ' + p2;
  if (p3) out += ' ' + p3;
  if (p4) out += ' ' + p4;
  return out;
}

/**
 * Превращает любой ввод в E.164: '+998901234567'
 */
export function normalizePhone(input: string): string {
  let d = input.replace(/\D/g, '');
  if (d.startsWith('998')) return `+${d.slice(0, 12)}`;
  if (d.length === 9) return `+998${d}`;
  if (d.startsWith('0')) return `+998${d.slice(1, 10)}`;
  return `+${d}`;
}

/**
 * Валидация: ровно +998 + 9 цифр = 13 символов
 */
export function isValidUzPhone(e164: string): boolean {
  return /^\+998\d{9}$/.test(e164);
}
