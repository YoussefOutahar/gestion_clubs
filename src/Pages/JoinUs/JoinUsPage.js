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


function JoinUsPage() {

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


          const mainRegister = {
            display:"flex",
            flexDirection:"row",
            justifyContent:"center",
            height:"100vh",
            width:"100vw",
            overflowX:"hidden"
          };

          const leftSide = {
            flex:"0.33",
            background:"#003667"
          };

          const headerStyle = {
            height:"15rem",
            marginTop:"2rem"
          };

          const logo = {
            maxWidth: "100%",
            height: "auto",
            margin: "auto",
            marginTop: "220px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          };

          const rightSide = {
            flex:"0.67",
            background:"white",
            display:"flex",
            flexDirection:"column",
            alignItems:"flex-end"
          };

          const topRight = {
            textDecoration:"none",
            marginTop:"12px",
            marginBottom:"12px",
            marginLeft:"1rem",
            color:"#003667",
            float:"right",
            maginRight:"1rem",
            fontSize:"small",
            fontWeight:"200",
            cursor:"pointer"
          };

          const bodyRight = {
            height:"100%",
            width:"100%"
          };

          const container = {
                padding:"2rem",
                height: "85%",
                width: "60%",
                margin: "2rem auto",
                boxShadow: "0rem 0rem 2rem 0.1rem #e4f1fe",
                borderRadius: "0.5rem"
          };
          
          const formStyle = {
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          };
          
          const inputGroup = {
            // width: "100%",
            // marginBottom: "1.9rem"
          };
          
          const h5Style = {
            fontFamily: '"DM Sans", sans-serif, "Helvetica Neue", Arial, "Noto Sans", sans-serif',display: "block",
            textAlign: "left",
            margin: "auto",
            width: "78%",
            color: "black",
            marginBottom: "0.1rem",
            //fontSize: "15px",
            fontSize: "95%",
          };
          
          const inputStyle = {
            padding: "0.2rem 1rem",
            border: "2px solid #e3e3e3",
            borderRadius: "4px",
            borderWidth: "2px",
            display: "block",
            height: "2.7rem",
            width: "79.5%",
            margin: "auto",
            marginBottom: "10px",
            color: "#696969",
            fontFamily: "inherit",
            fontSize: "inherit"
          };
          
          const btn = {
            fontFamily: '"DM Sans", sans-serif, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
            display: "block",
            width: "77.5%",
            background: "#003667",
            color: "white",
            border: "none",
            cursor: "pointer",
            padding: "1.2rem 1rem",
            marginTop: "25px",
            marginBottom: "20px",
            transition: "all 0.5s ease",
            height: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "16px"
          };

          const h2Style = {
            textDecorationThickness: "7px",
            fontSize: "115%",
            textIndent: "50px",
            letterSpacing: "2px",
            textAlign: "center",
            marginTop:"0px",
            marginBottom:"2px",
            color: "black",
          };
          
          const pStyle ={
            fontSize: "115%",
            marginRight:"15px"
          }
          
          
          

          
         

    return (
        <div className="main-Register" style={{ ...mainRegister }}> 
            <div className="left-side" style={{ ...leftSide }}>
                <div className="header" style={{...headerStyle}}>
                    <img style={{...logo}} src="https://www.uir.ac.ma/assets/_resources/img/mono-logo.png"  />
                </div>                   
            </div>
            <div className="right-side" style={{...rightSide}}>
                <div className="top-right" style={{...topRight}}>
                   <p style={{...pStyle}}>Contactez-nous</p>
                </div>
                <div className="body-right" style={{...bodyRight}}>
                    
                    <div className="container" style={{...container}}>

                        <h2 style={{ ...h2Style }}>Rejoignez notre Club !</h2>

                        <form style={formStyle}>

                        <label for="nom" style={{ ...h5Style }}>Nom :</label>
                            <input placeholder="Entrez votre nom..." type="text" id="nom" style={{ ...inputGroup,...inputStyle }}/>
                        <label for="pwd" style={{ ...h5Style }}>Mot de passe :</label>
                            <input placeholder="Entrez votre prenom..." type="text" id="prenom" style={{ ...inputGroup,...inputStyle }}/>
                        <label for="eml" style={{ ...h5Style }}>E-mail :</label>
                            <input placeholder="Entrez votre E-mail..." type="email" id="eml" style={{ ...inputGroup,...inputStyle }}/>
                        <label for="pwd" style={{ ...h5Style }}>Mot de passe :</label>
                            <input placeholder="Entrez votre mot de passe..." type="password" id="pwd" style={{ ...inputGroup,...inputStyle }}/>
                        
                        <button type="submit" style={ {...btn }}>S'inscrire</button>
                            
                        </form>

                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default JoinUsPage;
