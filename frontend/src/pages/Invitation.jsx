import React, { useState } from "react";
import invitationbg from "../assets/invitationbg.png";

const Invitation = () => {
  const [invitationEmail, setInvitationEmail] = useState("");
  const [sentInvitations, setSentInvitations] = useState([]);
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);

  // Function to handle sending an invitation
  const sendInvitation = () => {
    if (invitationEmail) {
      setInvitationEmail(""); 
      alert("Invitation sent!");
    } else {
      alert("Please enter an email address.");
    }
  };

  // Toggle the invitation list dropdown
  const InvitationBox = () => {
    setIsInvitationOpen(!isInvitationOpen);
  };

  return (
    <div className="flex items-center justify-center min-h-screen"
    style={{
        backgroundImage: `url(${invitationbg})`, // Correct use of template literal
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}>
      <div className="absolute top-20 right-5">
        <button
          className="px-4 py-2 text-white bg-pink-400 rounded-lg hover:bg-pink-500"
          onClick={InvitationBox}
        >
          Your Invitations
        </button>
        {isInvitationOpen && (
          <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-64">
            {sentInvitations.length > 0 ? (
              <ul className="p-4">
                {sentInvitations.map((invite, index) => (
                  <li key={index} className="py-2 border-b last:border-none">
                    {invite.email} - <span className="text-sm text-gray-600">{invite.status}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="p-4 text-gray-500">No invitations sent yet.</p>
            )}
          </div>
        )}
      </div>

      {/* Center box for sending invites */}
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl text-center font-bold text-pink-900">Invite Your Partner</h1>
        <p className="mt-4 text-gray-600">Enter the email of the person you'd like to invite:</p>
        <input
          type="email"
          placeholder="Enter email address"
          value={invitationEmail}
          onChange={(e) => setInvitationEmail(e.target.value)}
          className="w-full px-4 py-2 mt-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={sendInvitation}
          className="w-full px-4 py-2 mt-4 text-white bg-pink-400 rounded-lg hover:bg-pink-500"
        >
          Send Invitation
        </button>
      </div>
    </div>
  );
};

export default Invitation;
