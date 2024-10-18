import React, { useState } from 'react';

const Invitation = () => {
  const [email, setEmail] = useState('');
  const [invitations, setInvitations] = useState([]);

  const handleInvite = () => {
    if (email && !invitations.includes(email)) {
      setInvitations([...invitations, email]);
      setEmail(''); // Clear the input after submission
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
      <h2>Invite Your Love</h2>
      <input
        type="email"
        placeholder="Enter email to invite"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: '10px', width: '80%', marginBottom: '10px' }}
      />
      <br />
      <button onClick={handleInvite} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        Invite
      </button>

      <div style={{ marginTop: '20px' }}>
        <h3>Sent Invitations</h3>
        {invitations.length === 0 ? (
          <p>No invitations sent yet.</p>
        ) : (
          <ul>
            {invitations.map((invite, index) => (
              <li key={index}>{invite}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Invitation
