import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import '../Styling/styles.css';
import { signOut } from "firebase/auth";
import { ProfileButtonContext } from '../ProfileButtonContext';
import {LogedinContext} from "../LogedinContext";


let userN="";
let userId="";
let userLogedin= false;
let userPhoto="";

export function Navbar() {
  const [uName, setUName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [logedin, setLogedin] = useState(false);
  const { profileButtonState, setProfileButtonState } = useContext(ProfileButtonContext);
  const { logedinState, setlogedinState } = useContext(LogedinContext);


  const navigate=useNavigate();

  const userSignout = async () => {
    await signOut(auth);
    setlogedinState(currLogedinState => !currLogedinState);
    unMountProfilePage();
    navigate("/signin");
  };

  useEffect(() => {
    if (auth.currentUser) {
      setUName(auth.currentUser.displayName || "Unknown");
      setPhotoURL(auth.currentUser.photoURL || "");
      setlogedinState("true");
      userN = auth.currentUser.displayName || "Unknown";
      userId = auth.currentUser.uid || "Unknown";
      userPhoto = auth.currentUser.photoURL || "Unknown";
      userLogedin = true;
    }
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUName(user.displayName || "Unknown");
        setPhotoURL(user.photoURL || "");
        setLogedin(currLogedin => !currLogedin);
        setlogedinState(currLogedinState => !currLogedinState);
        userN = user.displayName || "Unknown";
        userId = user.uid || "Unknown";
        userPhoto = auth.currentUser.photoURL || "Unknown";
        userLogedin = true;
      } else {
        setUName("");
        setPhotoURL("");
        userLogedin = false;
      }
    });

    return () => unsubscribe();
  }, []);



  const mountProfilePage = () => {
    const newState = true;
    setProfileButtonState(newState);
    localStorage.setItem('profileButtonState', JSON.stringify(newState));
    navigate("/home");
  };

  const unMountProfilePage = () => {
    const newState = false;
    setProfileButtonState(newState);
    localStorage.setItem('profileButtonState', JSON.stringify(newState));
  }

  useEffect(() => {
    const storedProfileButtonState = localStorage.getItem('profileButtonState');
    if (storedProfileButtonState !== null) {
      setProfileButtonState(JSON.parse(storedProfileButtonState));
    }
  }, []);


  const homeTabButtonStyle = {
    background: !profileButtonState ? "#25243d" : "#dedede",
    color: !profileButtonState ? "#ffffff" : "#25243d"
  };

  const profileTabButtonStyle = {
    background: profileButtonState ? "#25243d" : "#dedede",
    color: profileButtonState ? "#ffffff" : "#25243d"
  };

  if (logedinState){
    return (
   
      <div className="navbar">
        <div className="navbar-tabs">
          <Link className="home-tab-button" style = {homeTabButtonStyle} onClick={unMountProfilePage} to={"/home"}>Home </Link>
          {uName && (
          <div className="user-info" style={profileTabButtonStyle} onClick={mountProfilePage}>
            {photoURL && <img className='navbar-image' src={photoURL} alt="user" />}
            <p>{userN.split(' ')[0]}</p>
          </div>
        )}
        </div>
        <div>
        <button className='logout-button' onClick={userSignout}>Logout</button>       
         </div>
      </div>
    );
  }

  return null;

}

export { userN, userId, userLogedin, userPhoto };
