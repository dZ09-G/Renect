import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Signin } from "./Pages/Signin";
import { Navbar } from "./Components/Navbar";
import './Styling/styles.css'; // Import styles.css for styling
import { CreatePost } from './Pages/Create-post';
import { HomePostEdit } from './Pages/HomePostEdit';
import { ProfileButtonProvider } from './ProfileButtonContext';
import {LogedinContextProvider} from './LogedinContext'
import { Main } from "./Pages/Main";



function App() {
  return (
    <LogedinContextProvider>
    <ProfileButtonProvider>
    <div className="App">
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/createpost" element={<CreatePost />}/>
            <Route path="/homepostedit" element={<HomePostEdit />}/>
          </Routes>
        </div>
      </Router>
    </div>
    </ProfileButtonProvider>
    </LogedinContextProvider>
  );
}

export default App;
