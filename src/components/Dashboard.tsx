import React from 'react';
import { BookOpen, Users, Clock, BookMarked } from 'lucide-react';

interface DashboardProps {
  stats: {
    totalBooks: number;
    totalStudents: number;
    booksOverdue: number;
    booksBorrowed: number;
  };
}

const Dashboard: React.FC<DashboardProps> = ({ stats }) => {
  const cards = [
    {
      title: 'Total Books',
      value: stats.totalBooks,
      icon: <BookOpen className="w-6 h-6 text-white" />,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Students',
      value: stats.totalStudents,
      icon: <Users className="w-6 h-6 text-white" />,
      color: 'bg-green-500',
    },
    {
      title: 'Books Overdue',
      value: stats.booksOverdue,
      icon: <Clock className="w-6 h-6 text-white" />,
      color: 'bg-red-500',
    },
    {
      title: 'Books Borrowed',
      value: stats.booksBorrowed,
      icon: <BookMarked className="w-6 h-6 text-white" />,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-[1.02]"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{card.title}</p>
              <p className="mt-1 text-2xl font-semibold">{card.value}</p>
            </div>
            <div className={`${card.color} p-3 rounded-full`}>
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;