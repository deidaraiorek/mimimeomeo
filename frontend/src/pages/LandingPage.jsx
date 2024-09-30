import React from 'react'
import Boxes from '../components/Boxes'
import Budu from '../assets/budu.png'
import HeroSection from '../components/HeroSection'

const LandingPage = () => {
  return (
    <div className='h-screen snap-mandatory snap-y overflow-y-scroll no-scrollbar'>
        <div className = "snap-start h-screen flex items-center justify-center scroll-padding-top-auto mt-0 ml-8 mr-1 mb-4">
            <HeroSection />
            <img src = {Budu} alt = 'Budu'
        className="w-full h-auto md:w-3/5 object-cover"/>
        </div>
        <div className ="h-screen snap-start flex items-center">
            <Boxes />
        </div>
    </div>  )
}

export default LandingPage