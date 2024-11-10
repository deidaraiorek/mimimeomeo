import React, { useState } from 'react';
import resetpw from '../../../assets/images/resetpw.jpg';
import { MdOutlineEmail } from "react-icons/md";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import API_ROUTES from '../../../constants/apiRoutes';

function CheckEmail() {
    const location = useLocation();
    const email = location.state?.email;
    const [isLoading, setIsLoading] = useState(false);

    const handleResendEmail = async () => {
        setIsLoading(true);
        try {
            await axios.post(API_ROUTES.RESET_LINK, { email });
            toast.success("Resend successful! Please check your email.", {duration: 2000});
        } catch (err) {
            toast.error("Failed to resend email. Please try again.", {duration: 2000});
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100"
            style={{
                backgroundImage: `url(${resetpw})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
            <Toaster /> 
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <div className="flex justify-center mb-6">
                    <div className='bg-white border border-2 border-brown-200 p-1 rounded-full'>
                        <div className="bg-pink-100 text-pink-900 text-xl p-2 rounded-full border border-2 border-brown-200">
                            <MdOutlineEmail />
                        </div>
                    </div>
                </div>
                <h2 className="text-2xl font-semibold text-center mb-4">Check your email</h2>
                <p className="text-center text-gray-600 mb-8">
                    We sent a password reset link to <strong>{email}</strong>
                </p>
                <button className="w-full bg-pink-400 text-white py-3 rounded-lg hover:bg-pink-500 mb-4 font-semibold" onClick={() => window.open("https://mail.google.com", "_blank")}>
                    Open email app
                </button>
                <p className="text-center text-gray-500">
                    Didn't receive the link?{" "}
                    <button onClick={handleResendEmail} className="text-pink-800 hover:underline" disabled={isLoading}>
                        {isLoading ? "Resending..." : "Click to resend"}
                    </button>
                </p>
                <div className="text-center mt-6">
                    <a href="/forgotpassword" className="text-gray-500 hover:underline">← Back to previous step</a>
                </div>
            </div>
        </div>
    );
}

export default CheckEmail;
