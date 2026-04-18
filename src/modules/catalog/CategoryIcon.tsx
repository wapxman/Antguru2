'use client';
import {
  Wrench, BookOpen, Sparkles, Code2,
  Car, Droplets, PartyPopper, HeartPulse
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/** Static map of available built-in icons.
 * To add a new built-in icon: import it above and add it here.
 * For admin-uploaded icons, use the `imageUrl` prop instead. */
const ICON_MAP: Record<string, LucideIcon> = {
  Wrench, BookOpen, Sparkles, Code2,
  Car, Droplets, PartyPopper, HeartPulse
};

type Size = 'sm' | 'md' | 'lg';

const SIZE_CLASSES: Record<Size, { box: string; glyph: string }> = {
  sm: { box: 'w-12 h-12 rounded-[12px]', glyph: 'w-6 h-6' },
  md: { box: 'w-14 h-14 rounded-[14px]', glyph: 'w-7 h-7' },
  lg: { box: 'w-16 h-16 rounded-[18px]', glyph: 'w-8 h-8' }
};

/**
 * Apple-style category icon — iOS app-icon look:
 * gradient squircle + white glyph + soft top gloss + colored drop shadow.
 *
 * If `imageUrl` is provided (e.g. admin-uploaded), it overrides the built-in icon.
 */
export function CategoryIcon({
  icon,
  gradient,
  shadow = '',
  imageUrl,
  size = 'lg'
}: {
  icon: string;
  gradient: string;
  shadow?: string;
  imageUrl?: string;
  size?: Size;
}) {
  const cls = SIZE_CLASSES[size];

  if (imageUrl) {
    return (
      <div className={`${cls.box} overflow-hidden bg-gray-100 ${shadow}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageUrl} alt="" className="w-full h-full object-cover" />
      </div>
    );
  }

  const Icon = ICON_MAP[icon];
  if (!Icon) return null;

  return (
    <div
      className={`relative ${cls.box} bg-gradient-to-b ${gradient} ${shadow} flex items-center justify-center overflow-hidden`}
    >
      {/* Apple-style top gloss */}
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
      <Icon className={`${cls.glyph} text-white relative z-10 drop-shadow-sm`} strokeWidth={2.25} />
    </div>
  );
}
