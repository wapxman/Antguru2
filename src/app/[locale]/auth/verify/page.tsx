import { Header } from '@/modules/layout/Header';
import { VerifyForm } from '@/modules/auth/VerifyForm';

export default function VerifyPage({
  searchParams
}: {
  searchParams: { phone?: string };
}) {
  const phone = searchParams.phone || '';
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-gray-50">
        <VerifyForm phone={phone} />
      </main>
    </>
  );
}
