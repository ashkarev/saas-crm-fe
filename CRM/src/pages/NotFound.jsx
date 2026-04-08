import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-950 px-4">
      <h1 className="text-9xl font-extrabold text-blue-600 tracking-widest">404</h1>
      <div className="bg-white dark:bg-slate-900 px-4 text-sm rounded rotate-12 absolute border border-blue-600">
        <span className="text-blue-600 font-bold uppercase">Page Not Found</span>
      </div>
      <button className="mt-10">
        <Link
          to="/"
          className="relative inline-block text-sm font-medium text-white group focus:outline-none focus:ring"
        >
          <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-blue-600 group-hover:translate-y-0 group-hover:translate-x-0"></span>
          <span className="relative block px-8 py-3 bg-blue-500 border border-current">
            Go Home
          </span>
        </Link>
      </button>
    </div>
  );
};

export default NotFound;
