import React from 'react'
import SignUpBoxes from '../../components/auth/SignUpBoxes'
import SignUpImage from '../../assets/signupimage.png'
const SignUp = () => {
  return (
    <div className='flex h-screen'>
      <img src={SignUpImage} alt='SignUpImage'
        className="w-full h-auto md:w-3/5 object-cover" />
      <SignUpBoxes />
    </div>
  )
}

export default SignUp