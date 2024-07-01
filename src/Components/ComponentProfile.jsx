import "../Styling/profile.css";
import profilepageImage from "./maxbill.jpg"; // Adjust the path as necessary
import {  userN, userPhoto } from './Navbar';


export const Profile = () => {

    const userFirstName = userN.split(' ')[0];
    return (
        <>
            <div className="profilepage-section-container">
                <div className="profilepage-image-container">
                    <img className="profilepage-image" src={userPhoto} alt="Profile" />            
                </div>
                <div className="profilepage-name-container">
                    <div className="profilepage-name">
                        {userFirstName}
                    </div>
                </div>
            </div>
        </>
    );
}
