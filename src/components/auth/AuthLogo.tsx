import { BookOpen } from 'lucide-react';

export default function AuthLogo() {
  return (
    <div className="flex flex-col items-center mb-8">
      <div className="p-4 mb-4 bg-indigo-600 rounded-full">
        <BookOpen className="w-12 h-12 text-white" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900">College Library</h1>
      <p className="mt-2 text-gray-500">Your gateway to knowledge</p>
    </div>
  );
}