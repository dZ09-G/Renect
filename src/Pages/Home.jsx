import React, { useState, useEffect, useContext } from 'react';
import '../Styling/styles.css'; // Adjust path as needed
import { collection, query, where, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { database } from "../config/firebase";
import { HomePosts } from "./HomePosts";
import { Link } from "react-router-dom";
import { userLogedin, userId, userN } from '../Components/Navbar';
import { Profile } from '../Components/ComponentProfile';
import { ProfileButtonContext } from '../ProfileButtonContext';
import { useNavigate } from "react-router-dom";
import {LogedinContext} from "../LogedinContext";





export const Home = () => {
  const [postList, setPostList] = useState(null);
  const { profileButtonState } = useContext(ProfileButtonContext);
  const navigate = useNavigate(); // React Router hook for navigation
  const { logedinState, setlogedinState } = useContext(LogedinContext);



  const postsRef = collection(database, "posts");
  
  const getPosts = async () => {
    try {
      const data = await getDocs(postsRef);
      setPostList(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const deletePost = async (deletePostIdArg) => {
    try {
      const toDeletePostRef = doc(database, "posts", deletePostIdArg);
      await deleteDoc(toDeletePostRef);
      getPosts(); // Refresh the post list after deletion
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };


  useEffect(() => {
    getPosts();
  }, []);




  if (!logedinState) {
    return null; // Render nothing if user is not logged in
  }
  return (
    <>
    <div>
    {profileButtonState && <Profile />}    
    </div>

    <div className='home-container1'>
      {postList?.map(post => (
        <HomePosts key={post.id} post={post} deletePost={deletePost} />
      ))}
      
      <Link to={"/CreatePost"} className='create-post-button'>
        +
      </Link> 
      </div>  
    </>
  );
};
