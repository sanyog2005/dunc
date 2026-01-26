// src/pages/NotFound.js
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="px-6 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;