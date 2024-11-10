import React, { useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { API_ROUTES } from '../../constants/apiRoutes';
import { EyeClosedIcon, EyeOpenIcon } from '../../assets/icon';

const LogInBoxes = () => {
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const navigate = useNavigate();


    function handleChange(e, func) {
        func(e.target.value)
    }

    const [typepw, setTypepw] = useState("password");
    const [boo, setBoo] = useState(false);

    function handleClick() {
        setBoo(!boo)
        setTypepw(!boo ? 'text' : 'password');
    }

    const handleLogin = async () => {
        const userData = {
            email: email,
            password: pw,
        };

        try {
            const response = await axios.post(API_ROUTES.LOGIN, userData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 200) {
                const { user, token } = response.data;
                if (token) {
                    // Store token in localStorage
                    localStorage.setItem('token', token);
                    localStorage.setItem('user', JSON.stringify(user))
                    window.dispatchEvent(new Event('storageChange'));
                    navigate('/notes') // fix later
                }
            }
        } catch (error) {
            toast.error("Log in failed. Please check your email or password.", {duration: 1000,})
            console.error(error.message)

        }
    }

    return (
        <div className='flex flex-col gap-7 p-20 w-1/2 text-pink-900'>
            <Toaster position="top-left" reverseOrder={false} /> {/* Add the Toaster component */}
            <div className='font-Pacifico font-bold text-[2.65em] mb-5 text-center'>Welcome Back</div>
            <div className='flex flex-col gap-1'>
                <div className='font-bold'>Email</div>
                <div className='flex justify-between rounded-2xl p-4 pb-1 pt-2 border border-gray-300 border-2'>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        className='text-black pl-0 focus:ring-0 focus: border-none flex-grow'
                        onChange={(e) => handleChange(e, setEmail)} />
                </div>
            </div>
            <div className='flex flex-col gap-1'>
                <div className='font-bold'>Password</div>
                <div className='flex justify-between rounded-2xl p-4 pb-1 pt-2 border border-gray-300 border-2'>
                    <input
                        type={typepw}
                        id="password"
                        name="password"
                        value={pw}
                        className='text-black pl-0 focus:ring-0 focus: border-none flex-grow'
                        onChange={(e) => handleChange(e, setPw)} />
                    <button onClick={(e) => handleClick()}>
                        {
                            boo ? EyeOpenIcon : EyeClosedIcon
                        }
                    </button>

                </div>
            </div>
            <div className='flex justify-between'>
                <div></div>
                <a href="/forgotpassword" className='text-right hover:underline'>Forgot Password?</a>
            </div>
            <button className='p-4 rounded-full bg-pink-400 text-white font-bold text-[1.25em] shadow-lg hover:shadow-xl transition-shadow duration-300' onClick={handleLogin}>Log In</button>
            <div className='text-center'>Don't have an account? <a href='/signup' className='text-pink-600 hover:text-pink-800 font-bold'>Sign Up</a></div>
        </div>
    )
}

export default LogInBoxes