import React from "react";
import invitationbg from "../assets/images/invitationbg.png";
import { Toaster } from 'react-hot-toast';
import SendInvitation from "../components/invitation/SendInvitation";
import ShowInvitation from "../components/invitation/ShowInvitation";

const Invitation = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url(${invitationbg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Toaster position="top-left" reverseOrder={false} />
      <ShowInvitation />
      <SendInvitation />
    </div>
  );
};

export default Invitation;
