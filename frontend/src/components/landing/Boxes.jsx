import React from 'react'
import { useNavigate } from 'react-router-dom';
import { CameraIcon, NotesIcon, LocatorIcon, CalendarIcon } from '../../assets/icon';

const Boxes = () => {
  const navigate = useNavigate();

  const handleSpecialDatesClick = () => {
    navigate('/specialdate');
  };
  const handleNotesClick = () => {
    navigate('/notes');
  };
  const handleGalleryClick = () => {
    navigate('/gallery');
  };


  return (
    <div className='flex p-20 gap-10'>
      <button
        onClick={handleGalleryClick}
        className='flex flex-col justify-center items-center bg-gradient-to-r from-pink-200 to-purple-100 shadow-xl rounded-lg w-1/4 bg-cover bg-center hover:shadow-2xl transition-shadow duration-300 p-20 text-center'>
        {CameraIcon}
        <div className='text-white font-bold text-[1.5em]'>Our Gallery</div>
      </button>
      <button
        onClick={handleNotesClick}
        className='flex flex-col justify-center items-center bg-gradient-to-r from-pink-200 to-purple-100 shadow-xl rounded-lg w-1/4 bg-cover bg-center hover:shadow-2xl transition-shadow duration-300 p-20 text-center'>
        {NotesIcon}
        <div className='text-white font-bold text-[1.5em]'>Love Notes</div>
      </button>
      <button className='flex flex-col justify-center items-center bg-gradient-to-r from-pink-200 to-purple-100 shadow-xl rounded-lg w-1/4 bg-cover bg-center hover:shadow-2xl transition-shadow duration-300 p-20 text-center'>
        {LocatorIcon}
        <div className='text-white font-bold text-[1.5em]'>Locator</div>
      </button>
      <button
        onClick={handleSpecialDatesClick}
        className='flex flex-col justify-center items-center bg-gradient-to-r from-pink-200 to-purple-100 shadow-xl rounded-lg w-1/4 bg-cover bg-center hover:shadow-2xl transition-shadow duration-300 p-20 text-center'>
        {CalendarIcon}
        <div className='text-white font-bold text-[1.5em]'>Special Dates</div>
      </button>
    </div>
  )
}

export default Boxes