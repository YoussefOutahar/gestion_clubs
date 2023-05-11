import { SplitLeft, SplitRight, Center } from "../../Utils/StyledElements";
import { Input, Button, Tooltip,Divider} from "antd";
import {
    InfoCircleOutlined,
    EyeInvisibleOutlined,
    EyeTwoTone,
    UserOutlined,
    LockOutlined,
} from "@ant-design/icons";
import React from "react";
import { useEffect, useState } from 'react';
import supabase from "../../DataBase/SupabaseClient";
import {Routes, Route, useNavigate} from 'react-router-dom';
import {styled} from "styled-components";

import {subBtn} from "../../Resources/authStyle";

import '../../Resources/authStyle.css';


function AuthentificationPage() {

    function test(){
        console.log("test");
    }

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            //get email and password from Etudiants table
            const { data, error } = await supabase
                .from('Etudiants')
                .select('email, password')
                .eq('email', email)
                
            if (error) throw error
            if (data) {
                if (data[0].password === password) {
                    navigate('/landingPage')
                }
                else {
                    alert("Mot de passe incorrect");
                }
            }
        } catch (error) {
            alert(error.message)
        }
    }

    const h3Style = {
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
    }

    const h2Style = {
        textAlign: "center",
        color: "#606470",
        textIndent: "40px",
        /*textDecoration: "overline underline",*/
        fontSize: "90%",
        fontFamily: '"DM Sans", sans-serif, "Helvetica Neue", Arial, "Noto Sans", sans-serif', display: "block"  
    }

    const style = {
        height: "75vh",
        width: "70%",
        background: "linear-gradient(to right bottom, 	#f7f7f7 50%,  	#f7f7f7)",
        borderRadius: "1rem",
        margin: "2rem auto",
        boxShadow: "0.5rem 0.5rem 2rem -1rem rgb(25, 55, 109)",
        display:"flex",
        justifyContent: "center",
        alignItems: "center",
      };

      const sideStyle = {
            margin: "2rem 2rem",
            boxShadow: "0.5rem 0.5rem 2rem -1rem rgb(25, 55, 109)",
            height: "80%",
            width: "100%",
            background:"white"
        };

        const leftsideStyle = {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
        };

        const rightsideStyle = {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
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
            height: "2rem",
            width: "70%",
            margin: "auto",
            marginBottom: "1.9rem",
            color: "#696969",
            fontFamily: "inherit",
            fontSize: "inherit"
        };

          const inputHover = {
            /*
            outline: "0.5px solid #3c4d62",
            boxShadow: "2px 2px 9px -2px #3c4d62"
            */
          };

          const label = {
            fontFamily: '"DM Sans", sans-serif, "Helvetica Neue", Arial, "Noto Sans", sans-serif',            display: "block",
            textAlign: "left",
            margin: "auto",
            width: "78%",
            color: "black",
            marginBottom: "0.9rem",
            /*letterSpacing: "8px",*/
            fontSize: "14px"
          };

          
          const subBtn = {
            fontFamily: '"DM Sans", sans-serif, "Helvetica Neue", Arial, "Noto Sans", sans-serif',            display: "block",
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
            fontSize: "16px"
          };
          
          const subBtnHover = {
            boxShadow: "0.5px 0.5px 6px -1px black",
            transform: "translateY(-5px)",
            borderLeft: "1px solid #003667",
            borderRight: "1px solid #003667"
          };

          const pStyle = {
            marginBottom: "5px",
            textAlign: "center",
            marginTop: "50px",
            fontSize: "90%",
            color:"	#696969",
            fontFamily: '"DM Sans", sans-serif, "Helvetica Neue", Arial, "Noto Sans", sans-serif',            display: "block",
          }

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
                    <h3 style={{ ...h3Style}}>AUTHENTIFICATION</h3>
                    <p style={{ ...h2Style }}>Renseigner votre adresse email et mot de passe.</p>  

            </header>  
            <div className="Auth" style={style}>
                <div className="left-side" style={{ ...sideStyle, ...leftsideStyle }}>
                    <form>
                    <br></br>  
                    <label for="eml" style={{ ...label }}>E-mail :</label>
                        <input placeholder="Enter Your E-mail..." type="email" id="eml" style={{ ...inputStyle, ...inputStyleFocus, ...inputHover }}/>
                    <label for="pwd" style={{ ...label }}>Password :</label>
                        <input placeholder="Enter Your Password..." type="password" id="pwd" style={{ ...inputStyle, ...inputStyleFocus, ...inputHover }}/>  
                        <button type="submit" style={{ ...subBtn, ...subBtnHover}}>Login</button>
                    </form>
                    <div>
                        <p style={{ ...pStyle}}>© 2023 UIR - Rabat.</p>
                    </div>
                </div>
                <div className="right-side" style={{ ...sideStyle}}>
                    <img src="http://candidature.uir.ac.ma/images/logo-uir-dark.png" alt="" style={imgStyle} />
                </div>
            </div>
        </div>
    );
}

export default AuthentificationPage;
