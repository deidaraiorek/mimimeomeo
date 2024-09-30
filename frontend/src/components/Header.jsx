import React from 'react'
import avatar from '../assets/avatar.png'

const Header = () => {
  return (
  <div className='bg-pink-400 text-white p-4 text-center flex justify-between items-center'>
    <div className='text-[1.75em] font-bold'>BuDu Family</div>
    <nav className='flex space-x-6 items-center text-[1em] '>
      <a href = '#' className='hover:text-gray-200'>To-do List</a>
      <a href = '#' className='hover:text-gray-200'>Love Notes</a>
      <a href = '#'className='hover:text-gray-200'>Calendar</a>
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