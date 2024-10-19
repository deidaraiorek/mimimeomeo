import React from 'react'
import LogInBoxes from '../../components/auth/LogInBoxes'
import SignUpImage from '../../assets/signupimage.png'
const LogIn = () => {
  return (
    <div className='flex h-screen'>
      <img src={SignUpImage} alt='SignUpImage'
        className="w-full h-auto md:w-3/5 object-cover" />
      <LogInBoxes />
    </div>
  )
}

export default LogIn