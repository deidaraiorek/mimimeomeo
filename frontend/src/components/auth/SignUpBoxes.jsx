import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { API_ROUTES } from "../../constants/apiRoutes";

const SignUpBoxes = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [cfpw, setCfpw] = useState("");
  const navigate = useNavigate();

  function handleChange(e, func) {
    func(e.target.value);
  }

  const handleRegister = async () => {
    if (pw != cfpw) {
      toast.error("Password doesn't match", { duration: 1000 });
      return;
    }
    const userData = {
      name: username,
      email: email,
      password: pw,
    };
    try {
      const response = await axios.post(API_ROUTES.SIGNUP, userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        const { user, token } = response.data;
        if (token) {
          // Store token in localStorage
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          window.dispatchEvent(new Event("storageChange"));
          navigate("/");
        }
      }
    } catch (error) {
      toast.error("Sign up failed. Please check your email or password.", {
        duration: 1000,
      });
      console.error(error.message);
    }
  };
  return (
    <div className="flex flex-col gap-6 p-14 text-pink-900 w-1/2">
      <Toaster position="top-left" reverseOrder={false} />{" "}
      {/* Add the Toaster component */}
      <div className="font-Pacifico font-bold text-[2.65em] mb-5">
        Create an account
      </div>
      <div className="flex flex-col gap-1">
        <div className="font-bold">Username</div>
        <div className="flex justify-between rounded-2xl p-4 pb-1 pt-2 border border-gray-300 border-2">
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            className="flex-grow text-black pl-0 focus:ring-0 focus: border-none"
            onChange={(e) => handleChange(e, setUsername)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="font-bold">Email</div>
        <div className="flex justify-between rounded-2xl p-4 pb-1 pt-2 border border-gray-300 border-2">
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            className="flex-grow text-black pl-0 focus:ring-0 focus: border-none"
            onChange={(e) => handleChange(e, setEmail)}
          />
        </div>
      </div>
      <div className="flex gap-6">
        <div className="flex flex-col gap-1">
          <div className="font-bold">Password</div>
          <div className="flex justify-between rounded-2xl p-4 pb-1 pt-2 border border-gray-300 border-2">
            <input
              type="text"
              id="password"
              name="password"
              value={pw}
              className="flex-grow text-black pl-0 focus:ring-0 focus: border-none"
              onChange={(e) => handleChange(e, setPw)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="font-bold">Confirm Password</div>
          <div className="flex justify-between rounded-2xl p-4 pb-1 pt-2 border border-gray-300 border-2">
            <input
              type="text"
              id="cfpassword"
              name="cfpassword"
              value={cfpw}
              className="flex-grow text-black pl-0 focus:ring-0 focus: border-none"
              onChange={(e) => handleChange(e, setCfpw)}
            />
          </div>
        </div>
      </div>
      <button
        className="p-4 rounded-full bg-pink-400 text-white font-bold text-[1.25em] shadow-lg hover:shadow-xl transition-shadow duration-300"
        onClick={handleRegister}
      >
        Register
      </button>
      <div className="text-center">
        Already have an account?{" "}
        <a
          href="/login"
          className="text-pink-600 hover:text-pink-800 font-bold"
        >
          Log In
        </a>
      </div>
    </div>
  );
};

export default SignUpBoxes;
