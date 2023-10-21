import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const View = () => {
    const navigate = useNavigate();   
    const location = useLocation(); 

    useEffect(()=> {
        const user = location.state ? location.state.user:null;
        if(!user)
        {
            navigate("/usersigns");
        }
    }, [location, navigate]); 
        return (
            <div>
                <h1>
                    View
                </h1>
            </div>
        );   
}; 
 
export default View;
