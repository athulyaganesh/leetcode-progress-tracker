import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setEmail(currentUser.email);
    }
  }, []);

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (email) {
      auth.sendPasswordResetEmail(email)
        .then(() => {
          setMessage('Password reset email sent. Check your inbox.');
        })
        .catch((error) => {
          setMessage(`Error: ${error.message}`);
        });
    }
  };

  return (
    <div className="settings" align="center">
      <hr className="rounded"></hr>
      <h2>
        <p>Reset Password</p>
      </h2>
      <p>Current Email: {email}</p>
      <button onClick={handleResetPassword}>Reset Password</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
