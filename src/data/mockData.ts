import { Book, User, BorrowRecord } from '../types';

// Mock book data
export const mockBooks: Book[] = [
  {
    id: '1',
    title: 'Introduction to Computer Science',
    author: 'John Smith',
    subject: 'Computer Science',
    description: 'A comprehensive guide to the fundamentals of computer science.',
    coverUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
    isbn: '978-0-123456-78-9',
    available: true,
    totalCopies: 5,
    availableCopies: 3,
    department: 'Computer Science'
  },
  {
    id: '2',
    title: 'Advanced Mathematics',
    author: 'Sarah Johnson',
    subject: 'Mathematics',
    description: 'Advanced concepts in mathematics for college students.',
    coverUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb',
    isbn: '978-0-987654-32-1',
    available: true,
    totalCopies: 3,
    availableCopies: 2,
    department: 'Mathematics'
  },
  {
    id: '3',
    title: 'Data Structures and Algorithms',
    author: 'David Allen',
    subject: 'Computer Science',
    description: 'A detailed look into data structures and algorithms.',
    coverUrl: 'https://images.unsplash.com/photo-1521747116042-b9d4f7b6e899',
    isbn: '978-0-123456-79-6',
    available: true,
    totalCopies: 10,
    availableCopies: 5,
    department: 'Computer Science'
  }
];

// Mock user data
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alice Cooper',
    email: 'alice@university.edu',
    phone: '1234567890',
    role: 'student',
    borrowedBooks: ['1'], // Borrowing book with ID '1'
    verified: true,
    password: 'password123'
  },
  {
    id: '2',
    name: 'Bob Martin',
    email: 'bob@university.edu',
    phone: '0987654321',
    role: 'student',
    borrowedBooks: ['2'], // Borrowing book with ID '2'
    verified: true,
    password: 'password456'
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@library.edu',
    phone: '1122334455',
    role: 'admin',
    borrowedBooks: [], // Admin has no borrowed books
    verified: true,
    password: 'admin123'
  }
];

// Mock borrow records
export const mockBorrowRecords: BorrowRecord[] = [
  {
    id: '1',
    userId: '1',  // Alice Cooper
    bookId: '1',  // 'Introduction to Computer Science'
    borrowDate: '2024-03-01',
    dueDate: '2024-03-15',
    returned: false
  },
  {
    id: '2',
    userId: '2',  // Bob Martin
    bookId: '2',  // 'Advanced Mathematics'
    borrowDate: '2024-04-05',
    dueDate: '2024-04-19',
    returned: true,
    returnDate: '2024-04-15'
  },
  {
    id: '3',
    userId: '1',  // Alice Cooper
    bookId: '3',  // 'Data Structures and Algorithms'
    borrowDate: '2024-05-10',
    dueDate: '2024-05-24',
    returned: false
  }
];
