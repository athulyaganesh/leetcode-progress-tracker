import React, { useState } from 'react';
import { auth } from '../firebase'; // Ensure the path is correct

const DeleteAccount = () => {
  const [message, setMessage] = useState('');

  const handleDeleteAccount = () => {
    const user = auth.currentUser;
    user
      .delete()
      .then(() => {
        setMessage('Account successfully deleted.');
      })
      .catch((error) => {
        setMessage(`Error: ${error.message}`);
      });
  };

  return (
    <div className="settings" align="center">
      <hr className="rounded" />
      <h2><p>Delete Account</p></h2>
      <button onClick={handleDeleteAccount}>Delete Account</button>
      {message && <p>{message}</p>}
      <br></br>Caution: This will permanently delete your account. <br></br><br></br>
      <hr class = "rounded"></hr>
      <hr class = "rounded"></hr>
    </div>
  );
};

export default DeleteAccount;
