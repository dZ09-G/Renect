import React, { useEffect, useState, useContext } from 'react';
import '../Styling/poststyle.css'; // Adjust path as needed
import { collection, addDoc, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { database } from '../config/firebase';
import { userId, userLogedin } from '../Components/Navbar'; // Assuming userId is imported correctly
import { useNavigate } from "react-router-dom";
import { ProfileButtonContext } from '../ProfileButtonContext';
import {LogedinContext} from "../LogedinContext";



export let postClosure;

export const HomePosts = (props) => {
    const { post, deletePost } = props;
    const [likesList, setLikesList] = useState(null);
    const { profileButtonState } = useContext(ProfileButtonContext);
    const { logedinState, setlogedinState } = useContext(LogedinContext);


    const navigate = useNavigate(); // React Router hook for navigation
    const isCurrentUserPost = post.uId === userId;

    const likeRef = collection(database, 'likes');

    const addLike = async () => {
        await addDoc(likeRef, {
            likeUserID: userId,
            postId: post.id,
        });
        updateLikesCount();
    };

    const unLike = async () => {
        const unlikeQuery = query(likeRef,
            where('postId', '==', post.id),
            where('likeUserID', '==', userId)
        );

        const unlikeQuerySnapshot = await getDocs(unlikeQuery);

        if (unlikeQuerySnapshot.docs.length > 0) {
            const toUnlike = doc(database, 'likes', unlikeQuerySnapshot.docs[0].id);
            await deleteDoc(toUnlike);
            updateLikesCount();
        }
    };

    const updateLikesCount = async () => {
        const q = query(likeRef, where('postId', '==', post.id));
        const querySnapshot = await getDocs(q);
        const likes = querySnapshot.docs.map(doc => ({ userId: doc.data().likeUserID }));
        setLikesList(likes);
    };

    // Check if the current user liked the post
    const isCurrentUserLiked = likesList?.some(like => like.userId === userId);


    const handleDeletePost = ()=>{
        const deletePostId = post.id;
        deletePost(deletePostId);
    }

    const editPostUi =(post)=>{
        postClosure = post;
        navigate("/homepostedit");
    }

    useEffect(() => {
        updateLikesCount();
    }, []);

    // Handle redirection if user is not logged in
    if (!logedinState) {
        return null;
    }

    const gradientStyle = {
        background: isCurrentUserLiked
          ? "linear-gradient(135deg, #e976af 0%, #baeefc 100%)"
          : "#b7b7b7c3"
      };

      if (profileButtonState && !isCurrentUserPost) {
        return null;
    }

    return (
        <div className="postContainer">
            <div className="postUsername">
                <p>{post.username}</p>
            </div>
            <div className="postTitle">
                <p>{post.title}</p>
            </div>
            <div className="postDescription">
                <p>{post.description}</p>
            </div>

            {isCurrentUserPost ? (
                <>
                    <div className='deletePost'>
                        <button className='deleteButton' onClick={handleDeletePost}>
                            &#10006;
                        </button>
                    </div>
                    <div className='editPost'>
                        <button className='editButton' onClick={() => { editPostUi(post) }} >
                            &#x270E;
                        </button>
                    </div>
                </>
            ) : null}
            <div className="likeDiv">
                <button
                    className="likeButton"
                    onClick={isCurrentUserLiked ? unLike : addLike}
                    style={gradientStyle}
                >
                    &#10084;
                </button>
                <div className="likeCount">
                    {likesList !== null && <p>{likesList.length}</p>}
                </div>
            </div>
        </div>
    );
};