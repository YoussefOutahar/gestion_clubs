
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn, signUp } from "../../DataBase/AuthClient";

import "../../Resources/authStyle.css";

function AuthentificationPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const { user, session, error } = await signIn(email, password);
            if (error) throw error;
            alert("You are logged in!");
            navigate("/adminDashboard" , { replace: true });
            //TODO: redirect to user dashboard or admin dashboard
        } catch (error) {
            alert(error.message);
        }
    };

    const handleSignUp = async () => {
        try {
            const { user, session, error } = await signUp(email, password,"admin","Youssef Outahar","+212 64269 5547","test_image");
            if (error) throw error;
            alert("You are signed up!");
            navigate("/adminDashboard" , { replace: true });
        }
        catch (error) {
            console.log(error);
        }
    };

    const h3Style = {
        marginBottom:"15px",
        marginTop: "15px",
        textAlign: "center",
        texttransform: "uppercase",
        color: /*"#d0d700"*/ "#363434",
        textIndent: "50px",
        letterSpacing: "2px",
        /*textDecoration: "overline underline",*/
        textDecorationThickness: "7px",
        fontSize: "160%",
        /*filter: "blur(.8px)",
        textShadow: "0 0 0.2em #003667 " */
    };

    const h2Style = {
        textAlign: "center",
        marginBottom: "25px",
        marginTop: "15px",
        color: "#606470",
        textIndent: "40px",
        /*textDecoration: "overline underline",*/
        fontSize: "90%",
        fontFamily: '"DM Sans", sans-serif, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
        display: "block",
    };

    const style = {
        height: "75vh",
        width: "70%",
        background: "linear-gradient(to right bottom, 	#f7f7f7 50%,  	#f7f7f7)",
        borderRadius: "1rem",
        margin: "2rem auto",
        boxShadow: "0.5rem 0.5rem 2rem -1rem rgb(25, 55, 109)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };

    const sideStyle = {
        margin: "2rem 2rem",
        boxShadow: "0.5rem 0.5rem 2rem -1rem rgb(25, 55, 109)",
        height: "80%",
        width: "100%",
        background: "white",
    };

    const leftsideStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    };

    const rightsideStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };

    const inputStyleFocus = {
        /* outline: "none",
            border: "none",*/
    };

    const inputStyle = {
        /*
            boxSizing: "border-box",
            
            
            borderImage: "initial",
            color: "#3c4d62",
            */
        padding: "0.2rem 1rem",
        border: "2px solid #e3e3e3",
        borderRadius: "4px",
        borderWidth: "2px",
        /*borderStyle: "inset",
            border:"none",*/
        display: "block",
        height: "2.7rem",
        width: "80%",
        margin: "auto",
        marginBottom: "1.9rem",
        color: "#696969",
        fontFamily: "inherit",
        fontSize: "inherit",
    };

    const inputHover = {
        /*
            outline: "0.5px solid #3c4d62",
            boxShadow: "2px 2px 9px -2px #3c4d62"
            */
    };

    const label = {
        fontFamily: '"DM Sans", sans-serif, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
        display: "block",
        textAlign: "left",
        margin: "auto",
        width: "78%",
        color: "black",
        marginBottom: "0.9rem",
        /*letterSpacing: "8px",*/
        fontSize: "15px",
    };

    const subBtn = {
        fontFamily: '"DM Sans", sans-serif, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
        display: "block",
        width: "77.5%",
        background: " #003667",
        color: "white",
        border: "none",
        cursor: "pointer",
        padding: "1.2rem 1rem",
        marginLeft: "52px",
        marginTop: "45px",
        transition: "all 0.5 ease",
        height: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "16px",
    };

    const subBtnHover = {
        boxShadow: "0.5px 0.5px 6px -1px black",
        transform: "translateY(-5px)",
        borderLeft: "1px solid #003667",
        borderRight: "1px solid #003667",
    };

    const pStyle = {
        marginBottom: "5px",
        textAlign: "center",
        marginTop: "50px",
        fontSize: "90%",
        color: "	#696969",
        fontFamily: '"DM Sans", sans-serif, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
        display: "block",
    };

    const imgStyle = {
        maxWidth: "100%",
        height: "auto",
        display: "block",
        margin: "auto",
        marginTop: "90px",
    };

    return (
        <div>
            <header className="Auth-header">
                <h3 style={{ ...h3Style }}>Connexion</h3>
                <p style={{ ...h2Style }}>Renseignez votre adresse email et mot de passe.</p>
            </header>
            <div className="Auth" style={{ ...style }}>
                <div className="left-side" style={{ ...sideStyle, ...leftsideStyle }}>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleLogin();
                        }}
                    >
                        <br></br>
                        <label for="eml" style={{ ...label }}>
                            E-mail :
                        </label>
                        <input
                            placeholder="Entrez votre E-mail..."
                            type="email"
                            id="eml"
                            style={{ ...inputStyle, ...inputStyleFocus, ...inputHover }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label for="pwd" style={{ ...label }}>
                            Mot de passe :
                        </label>
                        <input
                            placeholder="Entrez votre mot de passe..."
                            type="password"
                            id="pwd"
                            style={{ ...inputStyle, ...inputStyleFocus, ...inputHover }}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit" style={{ ...subBtn, ...subBtnHover }}>
                            Se connecter
                        </button>
                        <button type="button" style={{ ...subBtn, ...subBtnHover }} onClick={(e) => handleSignUp()}>
                            S'inscrire
                        </button>
                    </form>
                    <div>
                        <p style={{ ...pStyle }}>© 2023 UIR - Rabat.</p>
                    </div>
                </div>
                <div className="right-side" style={{ ...sideStyle }}>
                    <img
                        src="http://candidature.uir.ac.ma/images/logo-uir-dark.png"
                        alt=""
                        style={imgStyle}
                    />
                </div>
            </div>
        </div>
    );
}

export default AuthentificationPage;
