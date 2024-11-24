import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { API_ROUTES } from '../../constants/apiRoutes';
import useCheckStatus from '../CheckStatus';
import { createClient } from "@supabase/supabase-js";

const SendInvitation = () => {
    const supabase = createClient(
        import.meta.env.VITE_SUPABASE_CLIENT_URL,
        import.meta.env.VITE_SUPABASE_CLIENT_KEY
    );

    const [invitationEmail, setInvitationEmail] = useState("");
    const { coupleEmail: initialEmail, coupleId: initialId } = useCheckStatus();
    const [coupleEmail, setCoupleEmail] = useState(initialEmail);
    const [coupleId, setCoupleId] = useState(initialId);

    const [loading, setLoading] = useState(true);

    const getUserEmail = () => {
        const user = localStorage.getItem('user');
        const userData = JSON.parse(user);
        return userData.email;
      };

    const userEmail = getUserEmail();

    useEffect(() => {
        // Update couple details after useCheckStatus finishes
        if (initialEmail !== undefined && initialId !== undefined) {
            setCoupleEmail(initialEmail);
            setCoupleId(initialId);
            setLoading(false); // Mark loading as complete
        }
    }, [initialEmail, initialId]);

    useEffect(() => {
        const coupleChannel = supabase
            .channel("public:Couple")
            .on(
                "postgres_changes",
                {
                    event: "*", // Listen for both INSERT and DELETE events
                    schema: "public",
                    table: "Couple",
                },
                async (payload) => {
                    const { eventType, new: newCouple, old: oldCouple } = payload;
    
                    if (eventType === "INSERT") {
                        try {
                            // Fetch users related to the new couple
                            const { data: users, error } = await supabase
                                .from("User") // Replace 'User' with your table name
                                .select("email")
                                .eq("coupleId", newCouple.id);
    
                            if (error) throw error;
    
                            // Check if the logged-in user is part of this couple
                            const isUserInCouple = users
                                ?.map((user) => user.email)
                                ?.includes(userEmail);
    
                            if (isUserInCouple) {
                                // Update local state and UI
                                const partnerEmail = users
                                    ?.map((user) => user.email)
                                    ?.find((email) => email !== userEmail);
    
                                localStorage.setItem("coupleEmail", partnerEmail);
                                localStorage.setItem("coupleId", newCouple.id);
                                setCoupleEmail(partnerEmail);
                                setCoupleId(newCouple.id);
    
                                toast.success("Invitation accepted! You are now in a couple.");
                            }
                        } catch (err) {
                            console.error("Error fetching user details:", err.message);
                            toast.error("Failed to update couple details.");
                        }
                    } else if (eventType === "DELETE") {
                        try {
                            const storedCoupleId = localStorage.getItem("coupleId");
                            // Ensure type matching (oldCouple.id may be a number, storedCoupleId is a string)
                            if (String(oldCouple.id) === storedCoupleId) {
                                localStorage.removeItem("coupleEmail");
                                localStorage.removeItem("coupleId");
                                setCoupleEmail(null);
                                setCoupleId(null);
    
                                toast.error("You are no longer in a couple.");
                            }
                        } catch (err) {
                            console.error("Error handling DELETE event:", err.message);
                            toast.error("Failed to update couple details.");
                        }
                    }
                }
            )
            .subscribe();
    
        return () => {
            supabase.removeChannel(coupleChannel);
        };
    }, [userEmail, supabase]);
    

    const handleSendInvitation = async () => {
        if (!invitationEmail) {
            toast.error("Please enter an email address.");
            return;
        }

        const senderEmail = getUserEmail()
        const invitationData = { senderEmail, receiverEmail: invitationEmail };

        try {
            await axios.post(API_ROUTES.SENDINVITATION, invitationData, {
                headers: { 'Content-Type': 'application/json' },
            });
            toast.success("Invitation sent successfully!");
            setInvitationEmail("")
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

    if (loading) {
        return (
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <p className="text-center text-gray-500">Loading...</p>
            </div>
        );
    }


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
