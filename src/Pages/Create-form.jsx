import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import '../Styling/cfstyle.css';
import {addDoc, collection} from "firebase/firestore";
import {database} from "../config/firebase";
import {userN, userId} from "../Components/Navbar";
import { useNavigate } from "react-router-dom";


export const CreateForm = () => {
  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required")
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const navigate=useNavigate();

  const handleMySubmit = async (data) => {
    await addDoc(postRef, {
        ...data,
        username: userN,
        uId: userId
    });
    navigate("/home");
  }

  const postRef=collection(database, "posts");


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
