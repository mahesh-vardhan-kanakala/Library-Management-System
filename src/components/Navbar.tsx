import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, User, LogOut } from 'lucide-react';
import useAuthStore from '../store/authStore';

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="text-white bg-indigo-600 shadow-lg">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <BookOpen className="w-8 h-8" />
            <span className="text-xl font-bold">College Library</span>
          </Link>
          
          {user ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>{user.name}</span>
                <span className="px-2 py-1 text-xs bg-indigo-500 rounded-full">
                  {user.role}
                </span>
              </div>
              {user.role === 'admin' && (
                <Link
                  to="/admin"
                  className="text-white transition-colors hover:text-indigo-200"
                >
                  Admin Dashboard
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 transition-colors hover:text-indigo-200"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link
                to="/login"
                className="px-4 py-2 text-indigo-600 transition-colors bg-white rounded-md hover:bg-indigo-50"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 text-indigo-600 transition-colors bg-white rounded-md hover:bg-indigo-50"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}