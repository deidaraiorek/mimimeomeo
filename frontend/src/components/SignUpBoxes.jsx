import React, { useState } from 'react'
import axios  from 'axios'
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from 'react-hot-toast';
import { API_ROUTES } from '../constants/apiRoutes';

const SignUpBoxes = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const [cfpw, setCfpw] = useState("");
    const navigate = useNavigate();

    function handleChange(e, func) {
        func(e.target.value)
    }

    const handleRegister = async () => {
        if (pw != cfpw) {
            toast.error("Password doesn't match")
            return
        }
        const userData = {
            username: username,
            email: email,
            password: pw,
        };

        console.log(userData)
        try {
            const response = await axios.post(API_ROUTES.SIGNUP, userData, {
                headers: {
                    'Content-Type': 'application/json', // Ensure the Content-Type is JSON
                }
            });

            if (response.status === 201) {
                const { user, token } = response.data;
                if (token) {
                    // Store token in localStorage
                    localStorage.setItem('token', token);
                }
                console.log("Registration successfully:", response.data);
                navigate('/notes') // fix later
                // Handle success (e.g., redirect to login or display a success message)
            }
        } catch (error) {
                // The request was made and the server responded with a status code that falls out of the range of 2xx
                console.error(error.message)
                toast.error("Login failed. Please check your email or password.")
                
            }

        }
        return (
            <div className='flex flex-col gap-6 p-16 text-pink-900 w-1/2'>
                <Toaster position="top-right" reverseOrder={false} /> {/* Add the Toaster component */}
                <div className='font-Pacifico font-bold text-[2.65em] mb-5'>Create an account</div>
                <div className='flex flex-col bg-gray-100 rounded-2xl p-4 pb-1 pt-2 shadow-md gap-1'>
                    <label for="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        className='bg-gray-100 text-black pl-0 focus:ring-0 focus: border-none'
                        onChange={(e) => handleChange(e, setUsername)} />
                </div>
                <div className='flex flex-col gap-1 bg-gray-100 rounded-2xl p-4 pb-1 pt-2 shadow-md'>
                    <label for='email'>Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        className='bg-gray-100 text-black pl-0 focus:ring-0 focus: border-none'
                        onChange={(e) => handleChange(e, setEmail)} />
                </div>
                <div className='flex gap-6'>
                    <div className='flex flex-col gap-1 bg-gray-100 rounded-2xl p-4 pb-1 pt-2 w-1/2 shadow-md'>
                        <label for='password'>Password</label>
                        <input
                            type="text"
                            id="password"
                            name="password"
                            value={pw}
                            className='bg-gray-100 text-black pl-0 focus:ring-0 focus: border-none'
                            onChange={(e) => handleChange(e, setPw)} />
                    </div>
                    <div className='flex flex-col gap-1 bg-gray-100 rounded-2xl p-4 pb-1 pt-2 w-1/2 shadow-md'>
                        <label for='cfpassword'>Confirm Password</label>
                        <input
                            type="text"
                            id="cfpassword"
                            name="cfpassword"
                            value={cfpw}
                            className='bg-gray-100 text-black pl-0 focus:ring-0 focus: border-none'
                            onChange={(e) => handleChange(e, setCfpw)} />
                    </div>
                </div>
                <button className='p-4 rounded-2xl bg-gradient-to-r from-pink-200 to-pink-300 to-purple-100 text-white font-bold text-[1.25em] shadow-lg hover:shadow-xl transition-shadow duration-300' onClick={handleRegister}>Register</button>
                <div className='text-center'>Already have an account? <a href='/login' className='text-pink-600 hover:text-pink-800 font-bold'>Log In</a></div>
            </div>
        )
    }

    export default SignUpBoxes

