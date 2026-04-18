'use client';
import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { sendOtp } from './api';
import { formatPhone, normalizePhone, isValidUzPhone } from './phone';

export function LoginForm() {
  const t = useTranslations('Auth');
  const locale = useLocale();
  const router = useRouter();
  const [phone, setPhone] = useState('+998 ');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const normalized = normalizePhone(phone);
    if (!isValidUzPhone(normalized)) {
      setError(t('errorPhone'));
      return;
    }
    setLoading(true);
    const { error: err } = await sendOtp(normalized);
    setLoading(false);
    if (err) {
      setError(err);
      return;
    }
    router.push(`/${locale}/auth/verify?phone=${encodeURIComponent(normalized)}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6 sm:p-8 max-w-md w-full">
      <h1 className="text-2xl font-bold mb-2">{t('loginTitle')}</h1>
      <p className="text-gray-600 mb-6 text-sm">{t('loginSubtitle')}</p>

      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-gray-700">{t('phoneLabel')}</span>
          <input
            type="tel"
            inputMode="tel"
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
            placeholder="+998 90 123 45 67"
            className="mt-1 w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
            autoFocus
          />
        </label>

        {error && <div className="text-sm text-red-600">{error}</div>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-brand-500 hover:bg-brand-600 text-white font-medium py-3 rounded-xl disabled:opacity-60"
        >
          {loading ? '…' : t('sendCode')}
        </button>

        <p className="text-xs text-gray-500 text-center">{t('consent')}</p>
      </form>
    </div>
  );
}
