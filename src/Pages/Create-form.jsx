import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import '../Styling/cfstyle.css'; // Import your CSS file
import {addDoc, collection} from "firebase/firestore";
import {database} from "../config/firebase";
import {userN, userId} from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
//import {useEffect} from "react";

//export let createFormComponentMounted = false;

export const CreateForm = () => {
  // Define Yup schema for validation
  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required")
  });

  // useForm hook from react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const navigate=useNavigate();

  // Function to handle form submission
  const handleMySubmit = async (data) => {
    await addDoc(postRef, {
        ...data,
        username: userN,
        uId: userId
    });
   // createFormComponentMounted=false;
    navigate("/home");
  }

  const postRef=collection(database, "posts");

 // useEffect(()=>{
 //   createFormComponentMounted=true;
 // })

  return (
    <div className="cfcontainer">
      <div className="create-form-box">
      <form onSubmit={handleSubmit(handleMySubmit)}>
        <input type="text" placeholder="Title.." {...register("title")} className="title" />
        <p className="error-message">{errors.title?.message}</p>
        <textarea placeholder="Description.." {...register("description")} className="description" />
        <p className="error-message">{errors.description?.message }</p>
        <input type="submit" value="Submit" className="submit-button" />
      </form>
      </div>
    </div>
  );
}
