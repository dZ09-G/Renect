import {LogedinContext} from "../LogedinContext";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext } from 'react';
import {Signin} from "./Signin";


export const Main = () => {
    const { logedinState, setlogedinState } = useContext(LogedinContext);
    const navigate=useNavigate();


    if (logedinState){
        navigate("/home");
    }
    else{
        return (
            <Signin/>
        );
    }
}