import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import useAuthStore from '../../store/authStore';
import AuthLogo from './AuthLogo';

interface FormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: 'student' | 'teacher';
  department: string;
  studentId: string;
}

export default function SignupForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'student', // 'student' is the default value
    department: '',
    studentId: '',
  });
  const [showOTP, setShowOTP] = useState(false);
  const [otpType, setOtpType] = useState<'email' | 'phone'>('email');
  const [otp, setOTP] = useState('');
  const [emailOTP, setEmailOTP] = useState('');
  const [phoneOTP, setPhoneOTP] = useState('');
  const { signup, verifyOTP } = useAuthStore();
  const navigate = useNavigate();

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
  };

  const validatePhone = (phone: string) => {
    const phoneNumber = parsePhoneNumberFromString(phone);
    return phoneNumber?.isValid() || 'Invalid phone number';
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const phoneValidation = validatePhone(formData.phone);
    if (phoneValidation !== true) {
      toast.error(phoneValidation);
      return;
    }

    try {
      await signup(formData, formData.password);
      const generatedEmailOTP = generateOTP();
      const generatedPhoneOTP = generateOTP();
      setEmailOTP(generatedEmailOTP);
      setPhoneOTP(generatedPhoneOTP);
      setShowOTP(true);
      toast.success('Verification codes sent to your email and phone!');
    } catch (error) {
      toast.error('Signup failed');
      console.error(error);
    }
  };

  const handleOTPSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (otpType === 'email') {
        if (otp === emailOTP) {
          await verifyOTP(formData.email, otp);
          toast.success('Account verified successfully!');
          navigate('/login');
        } else {
          toast.error('Invalid email verification code');
        }
      } else if (otpType === 'phone') {
        if (otp === phoneOTP) {
          await verifyOTP(formData.phone, otp);
          toast.success('Account verified successfully!');
          navigate('/login');
        } else {
          toast.error('Invalid phone verification code');
        }
      }
    } catch (error) {
      toast.error('OTP verification failed');
      console.error(error);
    }
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as 'student' | 'teacher'; // Type assertion
    setFormData({ ...formData, role: value });
  };

  if (showOTP) {
    return (
      <div className="max-w-md mx-auto">
        <AuthLogo />
        <div className="p-8 bg-white rounded-lg shadow-md">
          <h2 className="mb-6 text-2xl font-bold text-center">Verify Your Account</h2>
          <div className="mb-4">
            <div className="flex justify-center mb-6 space-x-4">
              <button
                onClick={() => setOtpType('email')}
                className={`px-4 py-2 rounded-md ${
                  otpType === 'email' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                Email OTP
              </button>
              <button
                onClick={() => setOtpType('phone')}
                className={`px-4 py-2 rounded-md ${
                  otpType === 'phone' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                Phone OTP
              </button>
            </div>
            <p className="mb-4 text-sm text-center text-gray-600">
              Enter the verification code sent to your {otpType === 'email' ? 'email' : 'phone'}
            </p>
          </div>
          <form onSubmit={handleOTPSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Verification Code</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <button
              type="submit"
              className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Verify
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <AuthLogo />
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 (555) 000-0000"
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              value={formData.role}
              onChange={handleRoleChange}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <input
              type="text"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          {formData.role === 'student' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Student ID</label>
              <input
                type="text"
                value={formData.studentId}
                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 hover:text-indigo-700">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
