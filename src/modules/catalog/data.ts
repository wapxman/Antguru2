export type CategoryDef = {
  slug: string;
  emoji: string;
  /** key in messages/Categories */
  key: string;
};

export const CATEGORIES: CategoryDef[] = [
  { slug: 'repair',   emoji: '🛠', key: 'repair' },
  { slug: 'tutors',   emoji: '📚', key: 'tutors' },
  { slug: 'beauty',   emoji: '💄', key: 'beauty' },
  { slug: 'it',       emoji: '💻', key: 'it' },
  { slug: 'auto',     emoji: '🚗', key: 'auto' },
  { slug: 'cleaning', emoji: '🏠', key: 'cleaning' },
  { slug: 'events',   emoji: '🎉', key: 'events' },
  { slug: 'health',   emoji: '🩺', key: 'health' }
];
