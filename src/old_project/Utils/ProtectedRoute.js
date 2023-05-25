import React, { useEffect, useState } from "react";
import { Route, useNavigate } from "react-router-dom";
import supabase from "../DataBase/SupabaseClient";

const ProtectedRoute = (props) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const checkUserToken = async () => {
        const session = await supabase.auth.getSession();
        console.log(session);
        if (session.data.session === null || session.data.session === undefined || !session) {
            setIsLoggedIn(false);
            return navigate("/authentification");
        }
        setIsLoggedIn(true);
    };
    useEffect(() => {
        checkUserToken();
    }, [isLoggedIn]);
    return <React.Fragment>{isLoggedIn ? props.children : null}</React.Fragment>;
};
export default ProtectedRoute;
