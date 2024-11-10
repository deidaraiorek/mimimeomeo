import React, { useState, useEffect } from "react";
import avatar from "../../assets/images/avatar.png";
import { useNavigate, Link } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginStatusChange = () => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    window.addEventListener("storageChange", handleLoginStatusChange);

    return () => {
      window.removeEventListener("storageChange", handleLoginStatusChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("storageChange"));
    navigate("/");
  };

  return (
    <div className="bg-pink-400 text-white p-4 text-center flex justify-between items-center h-14">
      <Link to="/" className="text-[1.5em] font-bold">
        BuDu Family
      </Link>
      <nav className="flex space-x-6 items-center text-[1.1em]">
        <Link to="/" className="hover:text-pink-200">
          Home
        </Link>
        {isLoggedIn ? (
          <>
            <Link to="/invite" className="hover:text-pink-200">
              Invite
            </Link>
            <Link to="/locate" className="hover:text-pink-200">
              Locator
            </Link>
            <button onClick={handleLogout} className="hover:text-pink-200">
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link to="/signup" className="hover:text-pink-200">
              Sign up
            </Link>
            <Link to="/login" className="hover:text-pink-200">
              Log In
            </Link>
          </>
        )}
        <img
          src={avatar}
          alt="user avatar"
          className="w-10 h-10 rounded-full"
        />
      </nav>
    </div>
  );
};

export default Header;
