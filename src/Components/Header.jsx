import React, { useState } from 'react';
import { Moon, LogIn, Sun } from 'lucide-react';

const Header = ({darkmode, setdarkmode}) => {

    const handledarkmodeclick = () =>{
        setdarkmode(!darkmode)
        console.log(darkmode);
    }
    
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Aaron's Blog
          </h1>
          <div className="flex space-x-2">
            <button
              className="p-2 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              aria-label="Toggle dark mode"

              onClick={handledarkmodeclick}
            >
              {darkmode?<Moon size={20} /> : <Sun size={20}/>}
            </button>
            <button
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <LogIn className="mr-2 -ml-1" size={20} />
              Login
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;