import { Header } from '@/modules/layout/Header';
import { LoginForm } from '@/modules/auth/LoginForm';

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-gray-50">
        <LoginForm />
      </main>
    </>
  );
}
