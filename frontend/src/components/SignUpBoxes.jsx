import React, {useState} from 'react'

const SignUpBoxes = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const [cfpw, setCfpw] = useState("");
    
    function handleChange(e, func) {
        console.log(e.target.value);
        func(e.target.value)
    }

    console.log(username)
    return (
    <div className='flex flex-col gap-7 p-16 text-pink-900 w-1/2'>
        <div className='font-Pacifico font-bold text-[2.65em] mb-5'>Create an account</div>
        <div className='flex flex-col bg-gray-100 rounded-2xl p-4 pb-3 pt-2 shadow-md gap-2'>
            <label for = "username">Username</label>
            <input 
            type="text" 
            id="username" 
            name="username" 
            value = {username}
            className='bg-gray-100 text-black focus: outline-none'
            onChange={(e) => handleChange(e, setUsername)}/>
        </div>
        <div className='flex flex-col gap-2 bg-gray-100 rounded-2xl p-4 pb-3 pt-2 shadow-md'>
            <label for = 'email'>Email</label>
            <input 
            type="email" 
            id="email" 
            name="email" 
            value = {email}
            className='bg-gray-100 text-black focus: outline-none'
            onChange={(e) => handleChange(e, setEmail)}/>
        </div>
        <div className='flex gap-6'>
            <div className='flex flex-col gap-2 bg-gray-100 rounded-2xl p-4 pb-3 pt-2 w-1/2 shadow-md'>
                <label for = 'password'>Password</label>
                <input 
                type="text" 
                id="password" 
                name="password" 
                value = {pw}
                className='bg-gray-100 text-black focus: outline-none'
                onChange={(e) => handleChange(e, setPw)}/>
            </div>
            <div className='flex flex-col gap-2 bg-gray-100 rounded-2xl p-4 pb-3 pt-2 w-1/2 shadow-md'>
                <label for ='cfpassword'>Confirm Password</label>
                <input 
                type="text" 
                id="cfpassword" 
                name="cfpassword" 
                value = {cfpw}
                className='bg-gray-100 text-black focus: outline-none'
                onChange={(e) => handleChange(e, setCfpw)}/>
            </div>
        </div>
        <button className='p-4 rounded-2xl bg-gradient-to-r from-pink-200 to-pink-300 to-purple-100 text-white font-bold text-[1.25em] shadow-lg hover:shadow-xl transition-shadow duration-300'>Register</button>
        <div className='text-center'>Already have an account? <a href = '/login' className='text-pink-600 hover:text-pink-800 font-bold'>Log In</a></div>
    </div>
  )
}

export default SignUpBoxes

