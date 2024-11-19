import { useState } from 'react';
import StudentDetailsUpdate from './StudentDetailsUpdate';
import StudentBorrowedBooks from './StudentBorrowedBooks';

const mockStudent = {
  id: '123',
  name: 'John Doe',
  email: 'john.doe@example.com',
  password: 'password123',
  address: '123 Main St, City, Country',
  phone: '123-456-7890',
};

export default function StudentProfile() {
  const [student, setStudent] = useState(mockStudent);

  const handleUpdateStudent = (updatedDetails: {
    id: string;
    name: string;
    email: string;
    password: string;
    address: string;
    phone: string;
  }) => {
    setStudent(updatedDetails);
    alert('Your details have been updated!');
  };

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-semibold">Your Profile</h1>

      {/* Display Student Details */}
      <div className="mb-6">
        <p className="font-medium">Name: {student.name}</p>
        <p className="font-medium">Email: {student.email}</p>
        <p className="font-medium">Phone: {student.phone}</p>
        <p className="font-medium">Address: {student.address}</p>
      </div>

      {/* Update Student Details */}
      <StudentDetailsUpdate student={student} onUpdate={handleUpdateStudent} />

      {/* Borrowed Books */}
      <StudentBorrowedBooks studentId={student.id} />
    </div>
  );
}
