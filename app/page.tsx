// app/page.tsx (Server Component)

import { auth0 } from '../lib/auth0';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await auth0.getSession();

  // Redirect logged-in users to dashboard
  if (session && session.user) {
    redirect('/dashboard');
  }

  return (
    <div className="container vh-100 d-flex flex-column justify-content-center align-items-center text-center">
      <h1 className="display-4 mb-3">Welcome to Our App</h1>
      <p className="text-secondary fs-5 mb-4">
        Please sign up or log in to continue
      </p>

      <div className="d-flex gap-3">
        <a
          href="/auth/login?screen_hint=signup"
          className="btn btn-primary btn-lg"
          role="button"
        >
          Sign Up
        </a>
        <a
          href="/auth/login"
          className="btn btn-success btn-lg"
          role="button"
        >
          Log In
        </a>
      </div>
    </div>
  );
}
