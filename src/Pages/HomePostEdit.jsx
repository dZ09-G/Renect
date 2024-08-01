import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import '../Styling/cfstyle.css';
import {userN, userId} from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import {postClosure} from "./HomePosts";
import { database } from "../config/firebase";
import {  doc, updateDoc } from "firebase/firestore";




export const HomePostEdit = (props) => {
    const { editPost } = props;
  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required")
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
        title: postClosure?.title, 
        description: postClosure?.description 
      }
  });

  const navigate=useNavigate();
  
  
    
    const handleMySubmit = async (data) => {
      try {
        const toEditPostDocRef = doc(database, "posts", postClosure.id);
        await updateDoc(toEditPostDocRef, {
          ...data,
          username: userN,
          uId: userId
        });
      } catch (error) {
        console.error("Error editing post:", error);
      }
      navigate("/home");
    };
  

  return (
    <div className="cfcontainer">
      <form onSubmit={handleSubmit(handleMySubmit)}>
        <input type="text" placeholder="Title" {...register("title")} className="title" />
        <p className="error-message">{errors.title?.message}</p>
        <textarea placeholder="Description" {...register("description")} className="description" />
        <p className="error-message">{errors.description?.message}</p>
        <input type="submit" value="Submit" className="submit-button" />
      </form>
    </div>
  );
}
