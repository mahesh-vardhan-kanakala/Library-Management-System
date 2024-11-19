import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import LoginForm from './components/auth/LoginForm';
import SignupForm from './components/auth/SignupForm';
import AdminDashboard from './components/admin/AdminDashboard';
import Dashboard from './components/Dashboard';
import SearchBar from './components/SearchBar';
import BookCard from './components/BookCard';
import { mockBooks } from './data/mockData';
import useAuthStore from './store/authStore';

const mockStats = {
  totalBooks: 1200,
  totalStudents: 300,
  booksOverdue: 20,
  booksBorrowed: 400,
};

const App: React.FC = () => {
  const { user, isAuthenticated } = useAuthStore();

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Toaster position="top-right" />
        <main className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <Routes>
            {/* Route for Login Page */}
            <Route path="/login" element={<LoginForm />} />

            {/* Route for Signup Page */}
            <Route path="/signup" element={<SignupForm />} />

            {/* Route for Admin Dashboard */}
            <Route
              path="/admin"
              element={
                isAuthenticated && user?.role === 'admin' ? (
                  <AdminDashboard />
                ) : (
                  <div className="mt-10 text-center text-red-500">Access Denied</div>
                )
              }
            />

            {/* Route for the main Dashboard */}
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <div>
                    <h1 className="mb-8 text-3xl font-bold text-gray-900">
                      Welcome, {user?.name || 'User'}
                    </h1>
                    <SearchBar onSearch={() => {}} />
                    <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
                      {mockBooks.map((book) => (
                        <BookCard
                          key={book.id}
                          book={book}
                          onBorrow={(bookId) =>
                            console.log('Borrow book:', bookId)
                          }
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* Route for User Dashboard */}
            <Route
              path="/dashboard"
              element={isAuthenticated ? <Dashboard stats={mockStats} /> : <Navigate to="/login" replace />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;

