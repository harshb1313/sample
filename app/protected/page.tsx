import { auth0 } from '../../lib/auth0';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function ProtectedPage() {
  const session = await auth0.getSession();

  if (!session || !session.user) {
    redirect('/auth/login');
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Protected Content</h1>
      <p className="mb-2">Only authenticated users can see this!</p>
      <p>User: {session.user.name}</p>
      <p>Email: {session.user.email}</p>
      
      <div className="mt-4">
        <Link 
          href="/"
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2 inline-block"
        >
          Back to Home
        </Link>
        <a 
          href="/auth/logout"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </a>
      </div>
    </div>
  );
}