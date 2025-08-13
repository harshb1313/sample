import { auth0 } from '../lib/auth0';
import { redirect } from 'next/navigation';
import TestTRPC from '@/components/TestTRPC';

export default async function Home() {
  const session = await auth0.getSession();
  console.log('Supabase URL:', process.env.SUPABASE_URL);
  console.log('Supabase Key:', process.env.SUPABASE_SERVICE_ROLE_KEY);
  // If user is already logged in, redirect to dashboard
  if (session && session.user) {
    redirect('/dashboard');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our App</h1>
        <TestTRPC />
        <p className="text-gray-600 mb-8">Please sign up or log in to continue</p>
      </div>

      <div className="space-x-4">
        <a
          href="/auth/login?screen_hint=signup"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
        >
          Sign Up
        </a>
        <a
          href="/auth/login"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
        >
          Log In
        </a>
      </div>
    </main>
  );
}