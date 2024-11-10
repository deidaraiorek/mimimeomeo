// CheckStatus.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import API_ROUTES from '../constants/apiRoutes';

const useCheckStatus = () => {
    const [coupleEmail, setCoupleEmail] = useState(localStorage.getItem('coupleEmail') || null);
    const [coupleId, setCoupleId] = useState(localStorage.getItem('coupleId') ? parseInt(localStorage.getItem('coupleId'), 10): null);
    const navigate = useNavigate();

    const getUserEmail = () => {
        const user = localStorage.getItem('user');
        if (!user) return null;
        const userData = JSON.parse(user);
        return userData?.email;
    };

    useEffect(() => {
        const checkStatus = async () => {
            const userEmail = getUserEmail();

            // If user is not signed in, redirect to login
            if (!userEmail) {
                navigate('/login');
                return;
            }

            // Skip API call if coupleEmail and coupleId are already set
            if (coupleEmail && coupleId) return;

            try {
                const response = await axios.get(API_ROUTES.COUPLECHECK(userEmail));
                if (response.data) {
                    const coupleData = response.data;
                    if (coupleData.users) {
                        const partnerEmail = coupleData.users.find(u => u.email !== userEmail)?.email || null;
                        setCoupleEmail(partnerEmail);
                        setCoupleId(coupleData.id);
                        localStorage.setItem('coupleEmail', partnerEmail);
                        localStorage.setItem('coupleId', coupleData.id);
                    }
                } else {
                    navigate('/invite');
                }
            } catch (error) {
                const errorMessage = error.response?.data || "An error occurred while checking status.";
                toast.error(errorMessage);
                console.error("Error checking status:", error.message);
            }
        };
        checkStatus();
    }, []);

    return { coupleEmail, coupleId };
};

export default useCheckStatus;
