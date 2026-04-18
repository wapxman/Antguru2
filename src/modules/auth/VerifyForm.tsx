'use client';
import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { sendOtp, verifyOtp } from './api';

export function VerifyForm({ phone }: { phone: string }) {
  const t = useTranslations('Auth');
  const locale = useLocale();
  const router = useRouter();
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resendIn, setResendIn] = useState(60);

  useEffect(() => {
    const i = setInterval(() => {
      setResendIn((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(i);
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (code.length !== 6) {
      setError(t('errorCode'));
      return;
    }
    setLoading(true);
    const { error: err } = await verifyOtp(phone, code);
    setLoading(false);
    if (err) {
      setError(err);
      return;
    }
    router.push(`/${locale}`);
    router.refresh();
  };

  const onResend = async () => {
    if (resendIn > 0) return;
    await sendOtp(phone);
    setResendIn(60);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6 sm:p-8 max-w-md w-full">
      <h1 className="text-2xl font-bold mb-2">{t('verifyTitle')}</h1>
      <p className="text-gray-600 mb-6 text-sm">{t('verifySubtitle', { phone })}</p>

      <form onSubmit={onSubmit} className="space-y-4">
        <input
          type="text"
          inputMode="numeric"
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
          placeholder="——————"
          maxLength={6}
          className="w-full px-4 py-3 border rounded-xl outline-none text-center text-2xl tracking-[0.5em] font-mono focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
          autoFocus
        />

        {error && <div className="text-sm text-red-600">{error}</div>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-brand-500 hover:bg-brand-600 text-white font-medium py-3 rounded-xl disabled:opacity-60"
        >
          {loading ? '…' : t('verify')}
        </button>

        <button
          type="button"
          onClick={onResend}
          disabled={resendIn > 0}
          className="w-full text-sm text-gray-600 disabled:text-gray-400"
        >
          {resendIn > 0 ? t('resendIn', { seconds: resendIn }) : t('resend')}
        </button>
      </form>
    </div>
  );
}
