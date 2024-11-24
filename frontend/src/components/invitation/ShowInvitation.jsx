import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { API_ROUTES } from '../../constants/apiRoutes';
import StatusInvitation from './StatusInvitation';
import { createClient } from "@supabase/supabase-js";


const ShowInvitation = () => {
  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_CLIENT_URL,
    import.meta.env.VITE_SUPABASE_CLIENT_KEY
  );
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);
  const [invitation, setInvitation] = useState(null);
  const [hasInvitation, setHasInvitation] = useState(false)
  const [loading, setLoading] = useState(false);

  const getUserEmail = () => {
    const user = localStorage.getItem('user');
    const userData = JSON.parse(user);
    return userData.email;
  };

  const InvitationBox = async () => {
    setIsInvitationOpen(!isInvitationOpen);

    // If the invitation has already been fetched, just display it
    if (invitation || isInvitationOpen) {
      return;
    }

    setLoading(true);
    const receiverEmail = getUserEmail();

    try {
      const response = await axios.get(API_ROUTES.SHOWINVITATION, {
        params: { receiverEmail },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data) {
        setInvitation(response.data);
        setHasInvitation(true)
        localStorage.setItem('invitation', JSON.stringify(response.data));
      } else {
        setInvitation(null);  
      }
    } catch (error) {
      const errorMessage = error.response?.data;
      toast.error(errorMessage || "An error occurred", { duration: 1000 });
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const receiverEmail = getUserEmail();

    const invitationChannel = supabase
      .channel('public:Invitation')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'Invitation',
          filter: `receiverEmail=eq.${receiverEmail}`,
        },
        (payload) => {
          const { eventType, new: newInvitation, old: oldInvitation } = payload;

          if (eventType === 'INSERT') {
            // Notify receiver of a new invitation
            toast.success(`New invitation from ${newInvitation.senderEmail}`);
            setInvitation(newInvitation);
            setHasInvitation(true);
            localStorage.setItem('invitation', JSON.stringify(newInvitation));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(invitationChannel);
    };
  }, []);

  return (
    <div className="absolute top-20 right-5">
      <button
        className="px-4 py-2 text-white bg-pink-400 rounded-lg hover:bg-pink-500"
        onClick={InvitationBox}
      >
        Your Invitations
      </button>
      {isInvitationOpen && (
        <div className="absolute right-0 mt-3 bg-white border border-gray-200 rounded-lg shadow-lg w-80 p-4">
          {loading ? (
            <p>Loading invitations...</p>
          ) : (
            hasInvitation && invitation ? (
              <div className='flex flex-col items-center justify-center'>
                <p>Invitation from: <strong>{invitation.senderEmail}</strong></p>
                <StatusInvitation
                  setHasInvitation={setHasInvitation}
                  setIsInvitationOpen={setIsInvitationOpen}
                />
              </div>

            ) : (
              <p>No invitations yet.</p>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default ShowInvitation;
