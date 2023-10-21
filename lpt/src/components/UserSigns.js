import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import '../css/index.css';

const UserAuthentication = () => {
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signUperror, setSignUpError] = useState(null);
  const [loginError, setLoginError] = useState(null); 

  const handleSignUp = (e) => {
    e.preventDefault();
    if (signupPassword.length < 6) {
      setSignUpError("Password should be at least 6 characters long");
      return;
    }
    if (signupPassword !== confirmPassword) {
      setSignUpError("Passwords do not match");
      return;
    }
    createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
      .then((userCredential) => {
        setSignUpError("Successful Sign Up");
        console.log(userCredential);
        
      })
      .catch((error) => {
        setSignUpError("Error: " + error.message);
      });
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((userCredential) => {
        console.log(userCredential);
        setLoginError("Successful Log In"); 
      })
      .catch((error) => {
        setLoginError("Error: " + error.message);
      });
  };

  return (
    <>
      <h1 className="heu" align="center">LeetTrack</h1>
      <div className="auth-container">
        <div className="signup-form signs" align="center">
          <form onSubmit={handleSignUp}>
            <h1 align="center" className="subheader">Create Account</h1>
            {signUperror && <p align="center">{signUperror}</p>}
            <input
              className="input-box"
              type="email"
              placeholder="Enter your email"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
            />
            <input
              className="input-box"
              type="password"
              placeholder="Enter your password"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
            />
            <input
              className="input-box"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="but" align="center">
              <button className="custom-button-1" type="submit" align="center">Sign Up</button>
            </div>
          </form>
        </div>
        <div className="login-form signs" align="center">
          <form onSubmit={handleSignIn}>
            <h1 className="subheader" align="center">Log In</h1>
            {loginError && <p align="center">{loginError}</p>}
            <input
              className="input-box"
              type="email"
              placeholder="Enter your email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <input
              className="input-box" 
              type="password"
              placeholder="Enter your password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <div className="but" align="center">
              <button className="custom-button-1" type="submit" align="center">Log In</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserAuthentication;
