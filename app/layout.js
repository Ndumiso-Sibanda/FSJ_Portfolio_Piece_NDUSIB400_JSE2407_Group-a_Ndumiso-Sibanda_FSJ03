import "./globals.css";
import Link from 'next/link';
import '@fortawesome/fontawesome-free/css/all.min.css';

export const metadata = {
  title: "Next.js E-commerce",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="An amazing e-commerce store built with Next.js"
        />
      </head>
      <body className="bg-gray-100">
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
              <Link href="/login" className="flex items-center text-gray-600 hover:text-gray-900">
                
                <i className="fas fa-user text-gray-600 hover:text-gray-900 mr-1"></i>
                Login
              </Link>
            </nav>
          </div>
        </header>
        <main className="container mx-auto flex-1 mt-8 p-4">{children}</main>
      </body>
    </html>
  );
}
