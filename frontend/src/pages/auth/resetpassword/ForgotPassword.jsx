import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoKeyOutline } from "react-icons/io5";
import resetpw from '../../../assets/images/resetpw.jpg';
import axios from 'axios';
import API_ROUTES from '../../../constants/apiRoutes';
import { Toaster, toast } from 'react-hot-toast';

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
    setIsLoading(true);

    try {
      await axios.post(API_ROUTES.RESET_LINK, { email });
      navigate('/forgotpassword/checkemail', { state: { email } });
    } catch (err) {
      toast.error(err.response?.data || "Failed to send reset email. Please try again.", {duration: 2000});
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
      <div className={`bg-white p-8 rounded-lg shadow-md w-full max-w-md relative ${isLoading ? 'loading-border' : ''}`}>
        <div className="flex justify-center mb-6">
          <div className='bg-white border border-2 border-brown-200 p-1 rounded-full'>
            <div className="bg-pink-100 text-pink-900 text-xl p-2 rounded-full border border-2 border-brown-200">
              <IoKeyOutline />
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-semibold text-center mb-4">Forgot password?</h2>
        <p className="text-center text-gray-600 mb-8">No worries, we'll send you reset instructions.</p>
        
        {error && <p className="text-center text-red-500 mb-4">{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block font-semibold mb-2">Email</label>
            <input
              type="email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full bg-pink-400 text-white py-3 rounded-lg hover:bg-pink-500 font-semibold">
            Reset password
          </button>
        </form>
        
        <div className="text-center mt-6">
          <a href="/login" className="text-gray-500 hover:underline">← Back to log in</a>
        </div>
      </div>

      {/* Styles for the loading border animation */}
      <style jsx>{`
        .loading-border {
          position: relative;
          border: 4px solid transparent;
          animation: border-spin 1.5s linear infinite;
        }

        @keyframes border-spin {
          0% { border-top: 4px solid pink; }
          25% { border-right: 4px solid pink; border-top: 4px solid transparent; }
          50% { border-bottom: 4px solid pink; border-right: 4px solid transparent; }
          75% { border-left: 4px solid pink; border-bottom: 4px solid transparent; }
          100% { border-top: 4px solid pink; border-left: 4px solid transparent; }
        }
      `}</style>
    </div>
  );
}

export default ForgotPassword;
