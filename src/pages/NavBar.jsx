import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">MyApp</div>
        <div className="hidden md:flex space-x-4">
          <Link to='/' className="text-white hover:text-gray-400">Home</Link>
          <Link to='/add' className="text-white hover:text-gray-400">Add</Link>
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden pt-4">
          <Link to='/' className="block px-2 py-1 text-white hover:text-gray-400">Home</Link>
          <Link to='/add' className="block px-2 py-1 text-white hover:text-gray-400">Add Movie</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
