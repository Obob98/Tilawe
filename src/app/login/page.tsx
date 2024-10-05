
// import LoginForm from '@/pages/dashboard/components/login-form';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Login',
};

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-red-500 p-3 md:h-36">
        </div>
        <Link href={'/dashboard'}>dashboard</Link>
        {/* <LoginForm /> */}
      </div>
    </main>
  );
}