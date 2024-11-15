import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { BarIcon } from '../../assets/icon'

const Header = () => {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginStatusChange = () => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    window.addEventListener('storageChange', handleLoginStatusChange);

    return () => {
      window.removeEventListener('storageChange', handleLoginStatusChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    window.dispatchEvent(new Event('storageChange'));
    navigate('/')
  };

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className='bg-pink-400 text-white p-4 text-center flex justify-between items-center h-14'>
      <div className='text-[1.5em] font-bold'>BuDu Family</div>
      <nav className='flex space-x-1 items-center text-[1.1em] font-sans text-lg'>
        <button className='py-1 w-20 rounded-full bg-transparent hover:bg-gray-200/20 transition-all duration-200' onClick={() => navigate('/')}>Home</button>
        {
          isLoggedIn ? (
            <>
              <button className='py-1 w-20 rounded-full bg-transparent hover:bg-gray-200/20 transition-all duration-200' onClick={() => navigate('/invite')}>Invite</button>
              <button onClick={handleLogout} className='py-1 w-20 rounded-full bg-transparent hover:bg-gray-200/20 transition-all duration-200'>Log out</button>
            </>
          ) : (
            <>
              <button className='py-1 px-3 rounded-full bg-transparent hover:bg-gray-200/20 transition-all duration-200' onClick={() => navigate('/signup')}>Sign Up</button>
              <button className='py-1 px-3 rounded-full bg-transparent hover:bg-gray-200/20 transition-all duration-200' onClick={() => navigate('/login')}>Log In</button>
            </>
          )
        }
        <button
          className='p-2 rounded-full bg-transparent hover:bg-gray-200/20 transition-all duration-200'
          onClick={toggleDropdown}>
          {BarIcon}
          {isDropdownOpen && (
            <div className="absolute right-2 mt-6 w-40 bg-white text-gray-800 rounded-md shadow-lg py-3 z-10 border border-gray-300 text-left">
              <Link to="/gallery" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Gallery</Link>
              <Link to="/notes" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Notes</Link>
              <Link to="/locator" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Locator</Link>
              <Link to="/specialdate" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Special Dates</Link>
            </div>
          )}
        </button>
      </nav>
    </div>
  )
}

export default Header