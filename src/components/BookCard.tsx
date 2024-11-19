import { useState } from 'react';
import { Book, CheckCircle, XCircle } from 'lucide-react';
import type { Book as BookType } from '../types';

interface BookCardProps {
  book: BookType;
  onBorrow?: (bookId: string) => void;
}

export default function BookCard({ book, onBorrow }: BookCardProps) {
  // Track if the book is borrowed (initial state will be based on available status)
  const [isBorrowed, setIsBorrowed] = useState(false);

  // Handle the borrow action
  const handleBorrow = () => {
    if (onBorrow) {
      onBorrow(book.id); // Call the onBorrow function passed via props
    }
    setIsBorrowed(true); // Set book as borrowed locally
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      <img
        src={book.coverUrl}
        alt={book.title}
        className="object-cover w-full h-48"
      />
      <div className="p-4">
        <h3 className="mb-1 text-lg font-semibold text-gray-900">{book.title}</h3>
        <p className="mb-2 text-sm text-gray-600">by {book.author}</p>
        <p className="mb-3 text-sm text-gray-500 line-clamp-2">{book.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Book className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-500">
              {book.availableCopies}/{book.totalCopies} available
            </span>
          </div>
          
          {book.available && !isBorrowed ? (
            <div className="flex items-center text-green-500">
              <CheckCircle className="w-4 h-4 mr-1" />
              <span className="text-sm">Available</span>
            </div>
          ) : (
            <div className="flex items-center text-red-500">
              <XCircle className="w-4 h-4 mr-1" />
              <span className="text-sm">Unavailable</span>
            </div>
          )}
        </div>
        
        {book.available && !isBorrowed ? (
          <button
            onClick={handleBorrow}
            className="w-full px-4 py-2 mt-3 text-white transition-colors bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            Borrow Book
          </button>
        ) : (
          <button
            disabled
            className="w-full px-4 py-2 mt-3 text-white bg-gray-400 rounded-md cursor-not-allowed"
          >
            Borrowed
          </button>
        )}
      </div>
    </div>
  );
}
