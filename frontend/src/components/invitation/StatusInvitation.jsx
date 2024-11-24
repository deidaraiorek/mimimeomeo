import React from 'react';
import axios from 'axios';
import { API_ROUTES } from '../../constants/apiRoutes';
import { toast } from 'react-hot-toast';

const StatusInvitation = ({ setHasInvitation, setIsInvitationOpen }) => {
  const invitationData = JSON.parse(localStorage.getItem('invitation'));

  const handleClick = async (status) => {
    const statusData = {
      invitation: invitationData,
      status: status,
    };

    try {
      const response = await axios.post(API_ROUTES.RESPONSEINVITATION, statusData);

      if (status === 'Accept' && response.status === 200) {
        toast.success("Invitation accepted! You are now in a couple.");
      } else if (status === 'Decline') {
        toast.error("Invitation declined. You can always check for new invitations.");
      }

      setHasInvitation(false);
      setIsInvitationOpen(false);
      localStorage.removeItem('invitation');
    } catch (error) {
      toast.error("An error occurred while responding to the invitation.");
      console.error("Error responding to invitation:", error);
    }
  };

  return (
    <div className='flex gap-7 justify-center'>
      <button className="mt-2 text-white bg-green-700 rounded-xl px-4 py-2 hover:bg-green-800" onClick={() => handleClick('Accept')}>Accept</button>
      <button className="mt-2 text-white bg-red-700 rounded-xl px-4 py-2 hover:bg-red-800" onClick={() => handleClick('Decline')}>Decline</button>
    </div>
  );
};

export default StatusInvitation;
