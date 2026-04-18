export type CategoryDef = {
  slug: string;
  /** key inside messages/<locale>.json → Categories */
  key: string;
  /** lucide-react icon name (used until admin uploads custom icon) */
  icon: string;
  /** Tailwind gradient classes for the icon background */
  gradient: string;
  /** Tailwind colored drop-shadow */
  shadow: string;
  /** Mock count of masters in this category — replace with DB COUNT once catalog ships */
  mastersCount: number;
  /** When admin uploads a custom icon — its URL goes here, takes priority */
  imageUrl?: string;
};

/**
 * Apple-style category palette — iOS system colors.
 * mastersCount is mocked until catalog module fetches from DB.
 */
export const CATEGORIES: CategoryDef[] = [
  {
    slug: 'repair',
    key: 'repair',
    icon: 'Wrench',
    gradient: 'from-[#FFB340] to-[#FF7B00]',
    shadow: 'shadow-[0_8px_20px_-4px_rgba(255,123,0,0.45)]',
    mastersCount: 1240
  },
  {
    slug: 'tutors',
    key: 'tutors',
    icon: 'BookOpen',
    gradient: 'from-[#64D2FF] to-[#0A84FF]',
    shadow: 'shadow-[0_8px_20px_-4px_rgba(10,132,255,0.45)]',
    mastersCount: 890
  },
  {
    slug: 'beauty',
    key: 'beauty',
    icon: 'Sparkles',
    gradient: 'from-[#FF6B9D] to-[#FF2D55]',
    shadow: 'shadow-[0_8px_20px_-4px_rgba(255,45,85,0.45)]',
    mastersCount: 720
  },
  {
    slug: 'it',
    key: 'it',
    icon: 'Code2',
    gradient: 'from-[#BF5AF2] to-[#5E5CE6]',
    shadow: 'shadow-[0_8px_20px_-4px_rgba(94,92,230,0.45)]',
    mastersCount: 410
  },
  {
    slug: 'auto',
    key: 'auto',
    icon: 'Car',
    gradient: 'from-[#FF6961] to-[#FF3B30]',
    shadow: 'shadow-[0_8px_20px_-4px_rgba(255,59,48,0.45)]',
    mastersCount: 560
  },
  {
    slug: 'cleaning',
    key: 'cleaning',
    icon: 'Droplets',
    gradient: 'from-[#64D2FF] to-[#30B0C7]',
    shadow: 'shadow-[0_8px_20px_-4px_rgba(48,176,199,0.45)]',
    mastersCount: 380
  },
  {
    slug: 'events',
    key: 'events',
    icon: 'PartyPopper',
    gradient: 'from-[#FFD60A] to-[#FF9F0A]',
    shadow: 'shadow-[0_8px_20px_-4px_rgba(255,159,10,0.45)]',
    mastersCount: 290
  },
  {
    slug: 'health',
    key: 'health',
    icon: 'HeartPulse',
    gradient: 'from-[#5BE9A6] to-[#34C759]',
    shadow: 'shadow-[0_8px_20px_-4px_rgba(52,199,89,0.45)]',
    mastersCount: 510
  }
];
