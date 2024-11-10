import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import resetpw from '../../../assets/images/resetpw.jpg';
import { IoKeyOutline } from "react-icons/io5";
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import API_ROUTES from '../../../constants/apiRoutes';

function SetNewPassword() {
    const navigate = useNavigate();
    const location = useLocation();
    const token = new URLSearchParams(location.search).get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [confirmTouched, setConfirmTouched] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!password || !confirmPassword) {
            setPasswordTouched(true);
            setConfirmTouched(true);
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        try {
            const response = await axios.post(API_ROUTES.RESET_PASSWORD, { token, password });
            toast.success("Password reset successfully!");
            navigate("/forgotpassword/confirmnewpw");
        } catch (err) {
            toast.error(err.response?.data || "An error occurred. Please try again.");
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
                            <IoKeyOutline />
                        </div>
                    </div>
                </div>
                <h2 className="text-2xl font-semibold text-center mb-4">Set new password</h2>
                <p className="text-center text-gray-600 mb-8">Your new password must be different from previously used passwords.</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block font-semibold mb-2">
                            Password <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-1 ${passwordTouched && !password ? "border-red-600" : ""}`}
                            placeholder="New password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={() => setPasswordTouched(true)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block font-semibold mb-2">
                            Confirm password <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-1 ${confirmTouched && !confirmPassword ? "border-red-500" : ""}`}
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            onBlur={() => setConfirmTouched(true)}
                        />
                    </div>
                    <button className="w-full bg-pink-400 text-white py-3 rounded-lg hover:bg-pink-500 font-semibold">Reset password</button>
                </form>
                <div className="text-center mt-6">
                    <a href="/login" className="text-gray-500 hover:underline">← Back to log in</a>
                </div>
            </div>
        </div>
    );
}

export default SetNewPassword;
