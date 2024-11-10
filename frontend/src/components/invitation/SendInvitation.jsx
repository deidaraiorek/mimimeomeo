import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { API_ROUTES } from '../../constants/apiRoutes';
import { useWebSocket } from './WebSocket';
import useCheckStatus from '../CheckStatus';
import { useNavigate } from 'react-router-dom';


const SendInvitation = () => {
    const [invitationEmail, setInvitationEmail] = useState("");
    const { coupleEmail, coupleId } = useCheckStatus();
    const navigate = useNavigate()

    useWebSocket((message) => {
        if (message === 'INVITATION_ACCEPTED') {
            window.location.reload();
        } 
        if ( message === 'BREAK_UP') {
            localStorage.removeItem('coupleEmail');
            localStorage.removeItem('coupleId');
            window.location.reload();
        }
    });

    const handleSendInvitation = async () => {
        if (!invitationEmail) {
            toast.error("Please enter an email address.");
            return;
        }

        const senderEmail = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).email : null;
        const invitationData = { senderEmail, receiverEmail: invitationEmail };

        try {
            await axios.post(API_ROUTES.SENDINVITATION, invitationData, {
                headers: { 'Content-Type': 'application/json' },
            });
            toast.success("Invitation sent successfully!");
        } catch (error) {
            toast.error(error.response?.data || "An error occurred");
            console.error("Invitation Error:", error.message);
        }
    };

    const handleBreakup = async () => {
        if (!coupleId) return;
        try {
            await axios.post(API_ROUTES.BREAKUP, { coupleId }, {
                headers: { 'Content-Type': 'application/json' },
            });

        } catch (error) {
            toast.error("An error occurred during the breakup.");
            console.error("Breakup Error:", error.message);
        }
    };

    return (
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
            {coupleEmail ? (
                <div className='flex flex-col items-center'>
                    <h1 className="text-2xl text-center font-bold text-pink-900">You're already in a couple!</h1>
                    <p className="mt-4 text-gray-600 text-center">You are paired with: <strong>{coupleEmail}</strong></p>
                    <button className="mt-4 text-white bg-red-800 rounded-xl px-4 py-2 hover:bg-red-900 w-32" onClick={handleBreakup}>Break Up</button>
                </div>
            ) : (
                <div>
                    <h1 className="text-2xl text-center font-bold text-pink-900">Invite Your Partner</h1>
                    <input
                        type="email"
                        placeholder="Enter email address"
                        value={invitationEmail}
                        onChange={(e) => setInvitationEmail(e.target.value)}
                        className="w-full px-4 py-2 mt-4 border border-gray-300 rounded-lg focus:outline-none"
                    />
                    <button
                        onClick={handleSendInvitation}
                        className="w-full px-4 py-2 mt-4 text-white bg-pink-500 rounded-lg hover:bg-pink-600"
                    >
                        Send Invitation
                    </button>
                </div>
            )}
        </div>
    );
};

export default SendInvitation;
