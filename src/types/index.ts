export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'student' | 'admin' | 'teacher';
  borrowedBooks: string[];  // IDs of borrowed books; or change to `Book[]` if you want full book data
  department?: string;  // Optional field, useful for 'student' or 'teacher' roles
  studentId?: string;  // Optional, for student-specific data
  verified: boolean;
  password: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  subject: string;
  description: string;
  coverUrl: string;
  isbn: string;
  available: boolean;
  totalCopies: number;
  availableCopies: number;
  department?: string;  // Optional, useful if books are department-specific
}

export interface BorrowRecord {
  id: string;
  userId: string;
  bookId: string;
  borrowDate: string;
  dueDate: string;
  returned: boolean;
  returnDate?: string;  // Optional, only available when returned
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (userData: Partial<User>, password: string) => Promise<void>;
  verifyOTP: (email: string, otp: string) => Promise<void>;
}
