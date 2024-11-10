import React from 'react';
import resetpw from '../../../assets/images/resetpw.jpg';
import { SiTicktick } from "react-icons/si";
import { useNavigate } from 'react-router-dom';

function ConfirmNewPassword() {
    const navigate = useNavigate();
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100"
            style={{
                backgroundImage: `url(${resetpw})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <div className="flex justify-center mb-6">
                    <div className='bg-white border border-2 border-green-200 p-1 rounded-full'>
                        <div className="bg-green-100 text-green-700 text-xl p-2 rounded-full border border-2 border-green-200">
                            <SiTicktick />
                        </div>
                    </div>
                </div>
                <h2 className="text-2xl font-semibold text-center mb-4">Password reset</h2>
                <div className='text-center text-gray-600 flex flex-col gap-1 mb-8'>
                    <p>Your password has been successfully reset.</p>
                    <p>Click below to log in magically.</p>
                </div>
                <button className="w-full bg-pink-400 text-white py-3 rounded-lg hover:bg-pink-500 mb-4 font-semibold" onClick={()=>navigate('/login')}>Continue</button>
            </div>
        </div>
    );
}

export default ConfirmNewPassword;
