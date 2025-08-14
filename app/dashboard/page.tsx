import { auth0 } from '../../lib/auth0';
import Button from '@/components/Button';

export default async function Dashboard() {
  const session = await auth0.getSession();
  const user = session?.user;

  return (
    <div className="bg-light min-vh-100 d-flex flex-column align-items-center justify-content-start py-4">
      {/* Header */}
      <div className="w-100 container d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">Dashboard</h1>
        <a href="/auth/logout" className="btn btn-danger btn-sm">
          Logout
        </a>
      </div>

      {/* Welcome Message */}
      <div className="card shadow-sm w-100 max-w-md mb-4">
        <div className="card-body">
          <h4 className="card-title">Welcome back, {user?.name?.split(' ')[0]}! 👋</h4>
          <p className="card-text text-muted">
            This is your protected dashboard. Only authenticated users can access this page.
          </p>
        </div>
      </div>

      {/* Account Info */}
      <div className="card shadow-sm w-100 max-w-md mb-4">
        <div className="card-body">
          <h5 className="card-title">Account Info</h5>
          <p><strong>User ID:</strong> <span className="text-truncate d-block">{user?.sub}</span></p>
          <p><strong>Last Login:</strong> Just now</p>
        </div>
      </div>

      {/* Chat Button */}
      <div className="text-center">
        <Button />
      </div>
    </div>
  );
}
