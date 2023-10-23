import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import ClubsService from "../../../DataBase/services/ClubsService";
import UsersService from "../../../DataBase/services/UsersService";
import PendingMembersService from "../../../DataBase/services/PendingMembersService";

const formStyle = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
};

const inputGroup = {};

const h5Style = {
  fontFamily: '"DM Sans", sans-serif, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
  display: "block",
  textAlign: "left",
  margin: "auto",
  width: "80%",
  color: "black",
  marginBottom: "0.1rem",
  fontSize: "95%"
};

const textareaStyle = {
  padding: "0.2rem 1rem",
  border: "2px solid #e3e3e3",
  borderRadius: "4px",
  borderWidth: "2px",
  display: "block",
  width: "79.5%",
  margin: "auto",
  marginBottom: "10px",
  color: "#696969",
  fontFamily: "inherit",
  fontSize: "inherit",
  overflowY: "hidden"
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

const h2Style = {
  textDecorationThickness: "7px",
  fontSize: "115%",
  textIndent: "50px",
  letterSpacing: "2px",
  textAlign: "center",
  marginTop: "0px",
  marginBottom: "30px",
  color: "black"
};

function getSteps() {
  return [
    "Club infos",
    "Supervisor infos",
    "President infos",
    "Vice president infos",
    "Financier infos",
    "Secretary infos"
  ];
}

function getStepContent(stepIndex, textareaHeight, handleTextareaChange,handleImageUpload,handleInputChange, clubData,supervisorData,presidentData,vicePresidentData,financerData,secretaryData) {
  switch (stepIndex) {
    case 0:
      return (
        <div className="container">
          <form style={formStyle}>
            <label htmlFor="name" style={{ ...h5Style }}>
              Club name :
            </label>
            <input
              placeholder="Enter club's name "
              type="text"
              id="name"
              style={{ ...inputGroup, ...inputStyle }}
              value={clubData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
            <label htmlFor="mission" style={{ ...h5Style }}>
              Club mission :
            </label>
            <textarea
              placeholder="Your mission must be ambitious but achievable! The mission is your reason for being; it’s about defining what your club will accomplish. To summarize your mission, please reformulate it in the form of a slogan!"
              type="text"
              id="mission"
              style={{ ...inputGroup, ...textareaStyle, height: textareaHeight, minHeight: "100px" }}
              onChange={(event) => {
                handleTextareaChange(event);
                handleInputChange("mission", event.target.value);
              }}              
              value={clubData.mission}
            />
            <label htmlFor="kpo" style={{ ...h5Style }}>
              KPO & KPI (Club Objectives & Performance Indicators) :
            </label>
            <textarea
              placeholder="Describe in a few lines the objectives you wish to achieve as well as the indicators for monitoring your productivity and performance. This will allow you, but also the DVE, to measure the progress made or to be made to achieve your objectives."
              type="text"
              id="kpo"
              style={{ ...inputGroup, ...textareaStyle, height: textareaHeight, minHeight: "100px" }}
              onChange={(event) => {
                handleTextareaChange(event);
                handleInputChange("kpo", event.target.value);
              }}              
              value={clubData.kpo}
            />
             <label htmlFor="image" style={{ ...h5Style }}>
              Upload Club's logo:
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleInputChange}
              value={clubData.image}
              style={{ ...inputGroup, ...inputStyle }}
            />
          </form>
        </div>
      );
    case 1:
        return (
          <div className="container">
        <form style={formStyle}>
          <label htmlFor="superviserName" style={{ ...h5Style }}>
            Full Name :
          </label>
          <input
            placeholder="Enter full name"
            type="text"
            id="superviserName"
            style={{ ...inputGroup, ...inputStyle }}
            value={supervisorData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            />
  
          <label htmlFor="function" style={{ ...h5Style }}>
            Function :
          </label>
          <input
            placeholder="Enter function"
            type="text"
            id="function"
            style={{ ...inputGroup, ...inputStyle }}
            value={supervisorData.function}
            onChange={(e) => handleInputChange("function", e.target.value)}
            />
  
          <label htmlFor="phone" style={{ ...h5Style }}>
            Phone :
          </label>
          <input
            placeholder="Enter phone number"
            type="text"
            id="phone"
            style={{ ...inputGroup, ...inputStyle }}
            value={supervisorData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            />
  
          <label htmlFor="email" style={{ ...h5Style }}>
            Email :
          </label>
          <input
            placeholder="Enter email address"
            type="email"
            id="email"
            style={{ ...inputGroup, ...inputStyle }}
            value={supervisorData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            />
        </form>
      </div>
        );
        case 2: 
        return (
          <div className="container">
            <form style={formStyle}>
              <label htmlFor="presidentName" style={{ ...h5Style }}>
                President's Full Name:
              </label>
              <input
                placeholder="Enter president's full name"
                type="text"
                id="presidentName"
                style={{ ...inputGroup, ...inputStyle }}
                value={presidentData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
  
              <label htmlFor="presidentField" style={{ ...h5Style }}>
                President's Field:
              </label>
              <input
                placeholder="Enter president's field"
                type="text"
                id="presidentField"
                style={{ ...inputGroup, ...inputStyle }}
                value={presidentData.field}
                onChange={(e) => handleInputChange("field", e.target.value)}
              />
  
              <label htmlFor="presidentYear" style={{ ...h5Style }}>
                President's Year:
              </label>
              <input
                placeholder="Enter president's year"
                type="text"
                id="presidentYear"
                style={{ ...inputGroup, ...inputStyle }}
                value={presidentData.year}
                onChange={(e) => handleInputChange("year", e.target.value)}
              />
  
              <label htmlFor="presidentPhone" style={{ ...h5Style }}>
                President's Phone:
              </label>
              <input
                placeholder="Enter president's phone number"
                type="text"
                id="presidentPhone"
                style={{ ...inputGroup, ...inputStyle }}
                value={presidentData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
  
              <label htmlFor="presidentEmail" style={{ ...h5Style }}>
                President's Email:
              </label>
              <input
                placeholder="Enter president's email address"
                type="email"
                id="presidentEmail"
                style={{ ...inputGroup, ...inputStyle }}
                value={presidentData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </form>
          </div>
        );
        case 3: 
        return (
          <div className="container">
            <form style={formStyle}>
              <label htmlFor="vicePresidentName" style={{ ...h5Style }}>
                Vice President's Full Name:
              </label>
              <input
                placeholder="Enter vice president's full name"
                type="text"
                id="vicePresidentName"
                style={{ ...inputGroup, ...inputStyle }}
                value={vicePresidentData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
  
              <label htmlFor="vicePresidentField" style={{ ...h5Style }}>
                Vice President's Field:
              </label>
              <input
                placeholder="Enter vice president's field"
                type="text"
                id="vicePresidentField"
                style={{ ...inputGroup, ...inputStyle }}
                value={vicePresidentData.field}
                onChange={(e) => handleInputChange("field", e.target.value)}
              />
  
              <label htmlFor="vicePresidentYear" style={{ ...h5Style }}>
                Vice President's Year:
              </label>
              <input
                placeholder="Enter vice president's year"
                type="text"
                id="vicePresidentYear"
                style={{ ...inputGroup, ...inputStyle }}
                value={vicePresidentData.year}
                onChange={(e) => handleInputChange("year", e.target.value)}
              />
  
              <label htmlFor="vicePresidentPhone" style={{ ...h5Style }}>
                Vice President's Phone:
              </label>
              <input
                placeholder="Enter vice president's phone number"
                type="text"
                id="vicePresidentPhone"
                style={{ ...inputGroup, ...inputStyle }}
                value={vicePresidentData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
  
              <label htmlFor="vicePresidentEmail" style={{ ...h5Style }}>
                Vice President's Email:
              </label>
              <input
                placeholder="Enter vice president's email address"
                type="email"
                id="vicePresidentEmail"
                style={{ ...inputGroup, ...inputStyle }}
                value={vicePresidentData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </form>
          </div>
        );
        case 4:
          return (
            <div className="container">
              <form style={formStyle}>
                <label htmlFor="financierName" style={{ ...h5Style }}>
                  Financier's Name:
                </label>
                <input
                  placeholder="Enter financier's name"
                  type="text"
                  id="financierName"
                  style={{ ...inputGroup, ...inputStyle }}
                  value={financerData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
                <label htmlFor="financierField" style={{ ...h5Style }}>
                  Field:
                </label>
                <input
                  placeholder="Enter financier's field"
                  type="text"
                  id="financierField"
                  style={{ ...inputGroup, ...inputStyle }}
                  value={financerData.field}
                  onChange={(e) => handleInputChange("field", e.target.value)}
                />
                <label htmlFor="financierYear" style={{ ...h5Style }}>
                  Year:
                </label>
                <input
                  placeholder="Enter financier's year"
                  type="text"
                  id="financierYear"
                  style={{ ...inputGroup, ...inputStyle }}
                  value={financerData.year}
                  onChange={(e) => handleInputChange("year", e.target.value)}
                />
                <label htmlFor="financierPhone" style={{ ...h5Style }}>
                  Phone:
                </label>
                <input
                  placeholder="Enter financier's phone number"
                  type="text"
                  id="financierPhone"
                  style={{ ...inputGroup, ...inputStyle }}
                  value={financerData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
                <label htmlFor="financierEmail" style={{ ...h5Style }}>
                  Email:
                </label>
                <input
                  placeholder="Enter financier's email address"
                  type="email"
                  id="financierEmail"
                  style={{ ...inputGroup, ...inputStyle }}
                  value={financerData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </form>
            </div>
          );
      case 5: 
      return (
        <div className="container">
          <form style={formStyle}>
            <label htmlFor="secretaryName" style={{ ...h5Style }}>
              Secretary Name:
            </label>
            <input
              placeholder="Enter Secretary's name"
              type="text"
              id="secretaryName"
              style={{ ...inputGroup, ...inputStyle }}
              value={secretaryData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />

            <label htmlFor="secretaryField" style={{ ...h5Style }}>
              Secretary Field:
            </label>
            <input
              placeholder="Enter Secretary's field"
              type="text"
              id="secretaryField"
              style={{ ...inputGroup, ...inputStyle }}
              value={secretaryData.field}
              onChange={(e) => handleInputChange("field", e.target.value)}
            />

            <label htmlFor="secretaryYear" style={{ ...h5Style }}>
              Secretary Year:
            </label>
            <input
              placeholder="Enter Secretary's year"
              type="text"
              id="secretaryYear"
              style={{ ...inputGroup, ...inputStyle }}
              value={secretaryData.year}
              onChange={(e) => handleInputChange("year", e.target.value)}
            />

            <label htmlFor="secretaryPhone" style={{ ...h5Style }}>
              Secretary Phone:
            </label>
            <input
              placeholder="Enter Secretary's phone"
              type="text"
              id="secretaryPhone"
              style={{ ...inputGroup, ...inputStyle }}
              value={secretaryData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
            />

            <label htmlFor="secretaryEmail" style={{ ...h5Style }}>
              Secretary Email:
            </label>
            <input
              placeholder="Enter Secretary's email"
              type="email"
              id="secretaryEmail"
              style={{ ...inputGroup, ...inputStyle }}
              value={secretaryData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </form>
        </div>
      );
    default:
  }
}

export default function StepperForm() {
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [textareaHeight, setTextareaHeight] = useState("auto");
  const [selectedImage, setSelectedImage] = useState(null);
  const [clubName, setClubName] = useState("");
  const navigate = useNavigate();
  
  const [clubData, setClubData] = useState({
    name: "",
    mission: "",
    kpo: "",
    logo: null,
    nb_member: 4 ,
    state: "pending",
  });
  const [supervisorData, setSupervisorData] = useState({
    clubName: "",
    name: "",
    function: "",
    phone: "",
    email: "",
    role_club: "Supervisor",
  });
  const [presidentData, setPresidentData] = useState({
    clubName: "",
    name: "",
    field: "",
    year: "",
    phone: "",
    email: "",
    role_club: "President",
  });
  const [vicePresidentData, setVicePresidentData] = useState({
    clubName: "",
    name: "",
    field: "",
    year: "",
    phone: "",
    email: "",
    role_club: "VicePresident",
  });
  const [financerData, setFinancerData] = useState({
    clubName: "",
    name: "",
    field: "",
    year: "",
    phone: "",
    email: "",
    role_club: "Financer",
  });
  const [secretaryData, setSecretaryData] = useState({
    clubName: "",
    name: "",
    field: "",
    year: "",
    phone: "",
    email: "",
    role_club: "Secretary",
  });

  const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);

  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleReset = () => setActiveStep(0);

  const handleSubmit = async () => {
    try {
      // Add supervisor data using addSupervisor
      await ClubsService.addClub(clubData);

      // Set the club ID for the supervisor and other roles
      supervisorData.clubName = clubName;
      presidentData.clubName = clubName;
      vicePresidentData.clubName = clubName; 
      financerData.clubName = clubName;
      secretaryData.clubName = clubName;

      // Add user data using createUser
      await PendingMembersService.addMember(presidentData);
      await PendingMembersService.addMember(vicePresidentData);
      await PendingMembersService.addMember(financerData);
      await PendingMembersService.addMember(secretaryData);
      
      navigate("/LandingPage");
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  

  const handleInputChange = (id, value) => {
    switch (activeStep) {
      case 0:
        setClubData({ ...clubData, [id]: value });
        if (id === "name") {
          setClubName(value);
        }
        break;
      case 1:
        setSupervisorData({ ...supervisorData, [id]: value });
        break;
      case 2:
        setPresidentData({ ...presidentData, [id]: value });
        break;
      case 3:
        setVicePresidentData({ ...vicePresidentData, [id]: value });
        break;
      case 4:
        setFinancerData({ ...financerData, [id]: value });
        break;
      case 5:
        setSecretaryData({ ...secretaryData, [id]: value });
        break;
      default:
        break;
    }
  };
  
  

  const handleTextareaChange = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
    setTextareaHeight(event.target.style.height);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  return (
    <Box>
      <h2 style={{ ...h2Style }}>Create new club</h2>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box style={{ marginBottom: '3rem' }}>
        {activeStep === steps.length ? (
          <Box>
            <Typography>All steps completed</Typography>

            <Button
              sx={{ mt: 2 }}
              variant="contained"
              color="secondary"
              onClick={handleReset}
            >
              Reset
            </Button>
          </Box>
        ) : (
          <Box>
            <Typography>
              {getStepContent(activeStep, textareaHeight, handleTextareaChange, handleImageUpload, handleInputChange, clubData,supervisorData,presidentData,vicePresidentData,financerData,secretaryData)}
            </Typography>

            <Box pt={2}>
              <Button
                variant="contained"
                color="secondary"
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Back
              </Button>

              <Button
                sx={{ ml: 2 }}
                variant="contained"
                color="primary"
                onClick={ activeStep === steps.length - 1 ? handleSubmit : handleNext}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}