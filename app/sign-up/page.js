'use client'

import { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/firebase';
import { useRouter } from 'next/navigation'; 

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); 

  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const res = await createUserWithEmailAndPassword(email, password);
      console.log({ res });
      setEmail('');
      setPassword('');
      
      
      router.push('/login'); 
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-indigo-600 shadow-md rounded-lg p-6 max-w-sm w-full">
        <h2 className="text-white text-2xl mb-4 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 rounded-lg border border-gray-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 rounded-lg border border-gray-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-white text-indigo-600 font-bold py-2 rounded-lg hover:bg-gray-200 transition duration-200"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
