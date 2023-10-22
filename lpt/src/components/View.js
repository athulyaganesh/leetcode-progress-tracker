
// View.js
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const View = () => { 
    const navigate = useNavigate();
    const location = useLocation(); 

    useEffect(()=> {
        const user = location.state && location.state.user;
        if(!user)
        {
            navigate("/usersigns");
        }
    }, [location, navigate]); 

    return (
        <div>
            <h1>
                <Navbar />
            </h1>
        </div>
    );
};

export default View;
