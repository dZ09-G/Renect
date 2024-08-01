import React from 'react';
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import "../Styling/signinpage.css";

export function Signin() {
  const navigate = useNavigate();

  const signinWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      navigate("/home");
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  }

  return (
    <div className="login-page">
      <div className="login-box">
        <div className='box-contents'>
        <h2 className='welcome'>Welcome!</h2>
        <h2 className='sign'>Sign In</h2>
        <button className="signin-button" onClick={signinWithGoogle}>Sign In with Google</button>
        </div>
      </div>
    </div>
  );
}
