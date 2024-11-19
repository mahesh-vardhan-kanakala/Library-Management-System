import React from 'react';
import { Users, BookOpen, Clock } from 'lucide-react';  // Removed BookMarked as it's not used
import { mockUsers, mockBooks, mockBorrowRecords } from '../../data/mockData';

export default function AdminDashboard() {
  const stats = {
    totalStudents: mockUsers.filter(u => u.role === 'student').length,
    totalTeachers: mockUsers.filter(u => u.role === 'teacher').length,
    totalBooks: mockBooks.length,
    activeLoans: mockBorrowRecords.filter(r => !r.returned).length,
  };

  const recentBorrows = mockBorrowRecords
    .filter(r => !r.returned)
    .map(record => {
      const book = mockBooks.find(b => b.id === record.bookId);
      const user = mockUsers.find(u => u.id === record.userId);
      return { ...record, book, user };
    });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Students"
          value={stats.totalStudents}
          icon={Users}
          color="bg-blue-500"
        />
        <StatCard
          title="Total Teachers"
          value={stats.totalTeachers}
          icon={Users}
          color="bg-green-500"
        />
        <StatCard
          title="Total Books"
          value={stats.totalBooks}
          icon={BookOpen}
          color="bg-purple-500"
        />
        <StatCard
          title="Active Loans"
          value={stats.activeLoans}
          icon={Clock}
          color="bg-yellow-500"
        />
      </div>

      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-xl font-semibold">Recent Borrows</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Book
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Borrower
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Borrow Date
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Due Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentBorrows.map((record) => (
                <tr key={record.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {record.book?.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {record.user?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {record.borrowDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {record.dueDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }: {
  title: string;
  value: number;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;  // Updated to specify type for icon
  color: string;
}) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="mt-1 text-2xl font-semibold">{value}</p>
        </div>
        <div className={`${color} p-3 rounded-full`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
}
