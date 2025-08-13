import { auth0 } from '../../lib/auth0';
import Link from 'next/link';

export default async function Dashboard() {
  // This will be protected by middleware, so session will always exist here
  const session = await auth0.getSession();
  const user = session?.user;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <a 
              href="/auth/logout"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-200"
            >
              Logout
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* User Profile Card */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Profile</h2>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name:</label>
                <p className="text-gray-900">{user?.name}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Email:</label>
                <p className="text-gray-900">{user?.email}</p>
              </div>
              
              {user?.picture && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture:</label>
                  <img 
                    src={user.picture} 
                    alt="Profile" 
                    className="w-16 h-16 rounded-full"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Quick Actions</h2>
            <div className="space-y-3">
              <Link 
                href="/profile"
                className="block w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200 text-center"
              >
                Edit Profile
              </Link>
              <Link 
                href="/settings"
                className="block w-full bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-200 text-center"
              >
                Settings
              </Link>
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Account Info</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">User ID:</label>
                <p className="text-xs text-gray-600 break-all">{user?.sub}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Login:</label>
                <p className="text-sm text-gray-600">Just now</p>
              </div>
            </div>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Welcome back, {user?.name?.split(' ')[0]}! 👋
          </h2>
          <p className="text-gray-600">
            This is your protected dashboard. Only authenticated users can access this page.
          </p>
        </div>
      </div>
    </div>
  );
}