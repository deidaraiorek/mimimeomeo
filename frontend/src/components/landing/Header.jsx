import React from 'react'
import avatar from '../../assets/images/avatar.png'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

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

  return (
    <div className='bg-pink-400 text-white p-4 text-center flex justify-between items-center h-14'>
      <div className='text-[1.5em] font-bold'>BuDu Family</div>
      <nav className='flex space-x-6 items-center text-[1.1em]'>
        <a href='/' className='hover:text-pink-200'>Home</a>
        {
          isLoggedIn ? (
            <>
              <a href='/invite' className='hover:text-pink-200'>Invite</a>
              <button onClick={handleLogout} className='hover:text-pink-200'>Log Out</button>
            </>
          ) : (
            <>
              <a href='/signup' className='hover:text-pink-200'>Sign up</a>
              <a href='/login' className='hover:text-pink-200'>Log In</a>
            </>
          )
        }
        <img
          src={avatar}
          alt='user avatar'
          className='w-10 h-10 rounded-full'
        />
      </nav>
    </div>
  )
}

export default Header