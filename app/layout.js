
"use client"; 

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '@/app/firebase/firebase'; 
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { signOut } from "firebase/auth"; 
import './globals.css'; 

export default function RootLayout({ children }) {
  const [user] = useAuthState(auth);
  const router = useRouter();

  
  useEffect(() => {
    if (!user) {
      router.push('/sign-up');
    }
  }, [user, router]);

  
  const handleSignOut = async () => {
    try {
      await signOut(auth); 
      router.push('/login'); 
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <html lang="en"> 
      <head>
        <title>Your Page Title</title> 
      </head>
      <body> 
        <header className="bg-indigo-600 shadow-md">
          <div className="container mx-auto p-4 flex justify-between items-center">
            <Link href="/" className="flex items-center">
              <i className="fas fa-shopping-cart text-white text-3xl mr-2"></i>
            </Link>
            <nav className="flex items-center space-x-4">
              <Link href="/products" className="flex items-center text-gray-600 hover:text-gray-900">
                <i className="fas fa-box text-gray-600 hover:text-gray-900 mr-1"></i>
                Products
              </Link>
              
              {user ? (
                <button
                  onClick={handleSignOut}
                  className="flex items-center text-gray-600 hover:text-gray-900 focus:outline-none"
                >
                  <i className="fas fa-sign-out-alt text-gray-600 hover:text-gray-900 mr-1"></i>
                  Sign Out
                </button>
              ) : (
                <Link href="/login" className="flex items-center text-gray-600 hover:text-gray-900">
                  <i className="fas fa-user text-gray-600 hover:text-gray-900 mr-1"></i>
                  Login
                </Link>
              )}
            </nav>
          </div>
        </header>
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
