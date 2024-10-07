import React from 'react'
import { useNavigate } from 'react-router-dom';

const Boxes = () => {
  const navigate = useNavigate();
  const handleSpecialDatesClick = () => {
    navigate('/specialdate');
  };

  return (
    <div className='flex p-20 gap-10'>
      <button className='flex flex-col justify-center items-center bg-gradient-to-r from-pink-200 to-purple-100 shadow-xl rounded-lg w-1/4 bg-cover bg-center hover:shadow-2xl transition-shadow duration-300 p-20 text-center'>
        <svg className="mb-3 w-8 h-8 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M4 18V8a1 1 0 0 1 1-1h1.5l1.707-1.707A1 1 0 0 1 8.914 5h6.172a1 1 0 0 1 .707.293L17.5 7H19a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z" />
          <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
        <div className='text-white font-bold text-[1.5em]'>Our Gallery</div>
      </button>
      <button className='flex flex-col justify-center items-center bg-gradient-to-r from-pink-200 to-purple-100 shadow-xl rounded-lg w-1/4 bg-cover bg-center hover:shadow-2xl transition-shadow duration-300 p-20 text-center'>
        <svg className="mb-3 w-8 h-8 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7.556 8.5h8m-8 3.5H12m7.111-7H4.89a.896.896 0 0 0-.629.256.868.868 0 0 0-.26.619v9.25c0 .232.094.455.26.619A.896.896 0 0 0 4.89 16H9l3 4 3-4h4.111a.896.896 0 0 0 .629-.256.868.868 0 0 0 .26-.619v-9.25a.868.868 0 0 0-.26-.619.896.896 0 0 0-.63-.256Z" />
        </svg>
        <div className='text-white font-bold text-[1.5em]'>Love Notes</div>
      </button>
      <button className='flex flex-col justify-center items-center bg-gradient-to-r from-pink-200 to-purple-100 shadow-xl rounded-lg w-1/4 bg-cover bg-center hover:shadow-2xl transition-shadow duration-300 p-20 text-center'>
        <svg className="mb-3 w-8 h-8 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z" />
        </svg>
        <div className='text-white font-bold text-[1.5em]'>Locator</div>
      </button>
      <button
        onClick={handleSpecialDatesClick}
        className='flex flex-col justify-center items-center bg-gradient-to-r from-pink-200 to-purple-100 shadow-xl rounded-lg w-1/4 bg-cover bg-center hover:shadow-2xl transition-shadow duration-300 p-20 text-center'>
        <svg className="mb-3 w-8 h-8 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z" />
        </svg>

        <div className='text-white font-bold text-[1.5em]'>Special Dates</div>
      </button>
    </div>
  )
}

export default Boxes