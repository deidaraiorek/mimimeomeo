import React, { useState } from 'react'

const img1 = (<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>)
const img2 = (<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
    <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>)


const LogInBoxes = () => {
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");

    function handleChange(e, func) {
        console.log(e.target.value);
        func(e.target.value)
    }

    const [typepw, setTypepw] = useState("password");
    const [boo, setBoo] = useState(false);
    const [img, setImg] = useState(img1)

    function handleClick() {
        setBoo(!boo)
        setTypepw(boo ? 'text' : 'password');
        setImg(boo ? img2 : img1)
    }

    return (
        <div className='flex flex-col gap-7 p-20 w-1/2 text-pink-900'>
            <div className='font-Pacifico font-bold text-[2.65em] mb-5 text-center'>Welcome Back</div>
            <div className='flex flex-col gap-2 bg-gray-100 rounded-2xl p-4 pb-3 pt-2 shadow-lg'>
                <label for='email'>Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    className='bg-gray-100 text-black focus: outline-none'
                    onChange={(e) => handleChange(e, setEmail)} />
            </div>
            <div className='flex flex-col gap-2 bg-gray-100 rounded-2xl p-4 pb-3 pt-2 shadow-lg'>
                <label for='password'>Password</label>
                <div className='flex justify-between'>
                    <input
                        type={typepw}
                        id="password"
                        name="password"
                        value={pw}
                        className='bg-gray-100 text-black focus:outline-none'
                        onChange={(e) => handleChange(e, setPw)} />
                    <button onClick={(e) => handleClick()}>
                        {
                            boo ?
                                <svg class="w-5 h-5 text-pink-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg> :
                                <svg class="w-5 h-5 text-pink-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
                                    <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>

                        }
                    </button>

                </div>
            </div>
            <div className='flex justify-between'>
                <div></div>
                <a href="#" className='text-right'>Forgot Password?</a>
            </div>
            <button className='p-4 rounded-2xl bg-gradient-to-r from-pink-200 to-pink-300 to-purple-100 text-white font-bold text-[1.25em] shadow-lg hover:shadow-xl transition-shadow duration-300'>Log In</button>
            <div className='text-center'>Don't have an account? <a href='/signup' className='text-pink-600 hover:text-pink-800 font-bold'>Sign Up</a></div>
        </div>
    )
}

export default LogInBoxes