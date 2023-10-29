import React from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import StepperForm from "./StepperFormNewClub";


function Createclub() {
  const navigate = useNavigate();

  const mainRegister = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    height: "100vh",
    width: "100vw",
    overflowX: "hidden"
  };

  const leftSide = {
    flex: "0.33",
    background: "#003667"
  };

  const headerStyle = {
    height: "15rem",
    marginTop: "2rem"
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
    flex: "0.67",
    background: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end"
  };

  const topRight = {
    textDecoration: "none",
    marginTop: "12px",
    marginBottom: "12px",
    marginLeft: "1rem",
    color: "#003667",
    float: "right",
    maginRight: "1rem",
    fontSize: "small",
    fontWeight: "200",
    cursor: "pointer"
  };

  const bodyRight = {
    height: "100%",
    width: "100%"
  };

  const container = {
    padding: "2rem",
    height: "85%",
    width: "60%",
    margin: "2rem auto",
    boxShadow: "0rem 0rem 2rem 0.1rem #e4f1fe",
    borderRadius: "0.5rem",
    overflowY: "auto", // Enable vertical scrolling
  };

  const pStyle = {
    fontSize: "115%",
    marginRight: "15px"
  }

  return (
    <div className="main-Register" style={{ ...mainRegister }}>
      <div className="left-side" style={{ ...leftSide }}>
        <div className="header" style={{ ...headerStyle }}>
          <img style={{ ...logo }} src="https://www.uir.ac.ma/assets/_resources/img/mono-logo.png" />
        </div>
      </div>
      <div className="right-side" style={{ ...rightSide }}>
        <div className="top-right" style={{ ...topRight }}>
          <p style={{ ...pStyle }}>Contact us</p>
        </div>
        <div className="body-right" style={{ ...bodyRight }}>

          <div className="container" style={{ ...container }}>
            <StepperForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Createclub;
