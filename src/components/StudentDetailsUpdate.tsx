import { useState } from 'react';

interface StudentDetailsUpdateProps {
  student: {
    id: string;
    name: string;
    email: string;
    password: string;
    address: string;
    phone: string;
  };
  onUpdate: (updatedDetails: {
    id: string;
    name: string;
    email: string;
    password: string;
    address: string;
    phone: string;
  }) => void;
}

const StudentDetailsUpdate: React.FC<StudentDetailsUpdateProps> = ({ student, onUpdate }) => {
  const [updatedDetails, setUpdatedDetails] = useState(student);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(updatedDetails);
  };

  return (
    <div className="my-6">
      <h2 className="mb-4 text-xl font-semibold">Update Your Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={updatedDetails.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={updatedDetails.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Phone</label>
          <input
            type="text"
            name="phone"
            value={updatedDetails.phone}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Address</label>
          <input
            type="text"
            name="address"
            value={updatedDetails.address}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={updatedDetails.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <button type="submit" className="px-6 py-2 mt-4 text-white bg-blue-500 rounded">
          Update Details
        </button>
      </form>
    </div>
  );
};

export default StudentDetailsUpdate;
