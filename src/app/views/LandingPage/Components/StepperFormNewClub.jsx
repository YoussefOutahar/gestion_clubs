import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";

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

function FormFields() {
  return (
    <div className="container">
      <form style={formStyle}>
        <label htmlFor="fullName" style={{ ...h5Style }}>
          Full Name :
        </label>
        <input
          placeholder="Enter full name"
          type="text"
          id="fullName"
          style={{ ...inputGroup, ...inputStyle }}
        />

        <label htmlFor="field" style={{ ...h5Style }}>
          Field :
        </label>
        <input
          placeholder="Enter field"
          type="text"
          id="field"
          style={{ ...inputGroup, ...inputStyle }}
        />

        <label htmlFor="year" style={{ ...h5Style }}>
          Year :
        </label>
        <input
          placeholder="Enter year"
          type="number"
          id="year"
          style={{ ...inputGroup, ...inputStyle }}
        />

        <label htmlFor="phone" style={{ ...h5Style }}>
          Phone :
        </label>
        <input
          placeholder="Enter phone number"
          type="text"
          id="phone"
          style={{ ...inputGroup, ...inputStyle }}
        />

        <label htmlFor="email" style={{ ...h5Style }}>
          Email :
        </label>
        <input
          placeholder="Enter email address"
          type="email"
          id="email"
          style={{ ...inputGroup, ...inputStyle }}
        />
      </form>
    </div>
  );
}

function getStepContent(stepIndex, textareaHeight, handleTextareaChange,handleImageUpload) {
  switch (stepIndex) {
    case 0:
      return (
        <div className="container">
          <form style={formStyle}>
            <label htmlFor="clubName" style={{ ...h5Style }}>
              Club name :
            </label>
            <input
              placeholder="Enter club's name "
              type="text"
              id="clubName"
              style={{ ...inputGroup, ...inputStyle }}
            />
            <label htmlFor="mission" style={{ ...h5Style }}>
              Club mission :
            </label>
            <textarea
              placeholder="Your mission must be ambitious but achievable! The mission is your reason for being; it’s about defining what your club will accomplish. To summarize your mission, please reformulate it in the form of a slogan!"
              type="text"
              id="mission"
              style={{ ...inputGroup, ...textareaStyle, height: textareaHeight, minHeight: "100px" }}
              onChange={handleTextareaChange}
            />
            <label htmlFor="kpo" style={{ ...h5Style }}>
              KPO & KPI (Club Objectives & Performance Indicators) :
            </label>
            <textarea
              placeholder="Describe in a few lines the objectives you wish to achieve as well as the indicators for monitoring your productivity and performance. This will allow you, but also the DVE, to measure the progress made or to be made to achieve your objectives."
              type="text"
              id="kpo"
              style={{ ...inputGroup, ...textareaStyle, height: textareaHeight, minHeight: "100px" }}
              onChange={handleTextareaChange}
            />
             <label htmlFor="image" style={{ ...h5Style }}>
              Upload Club's logo:
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ ...inputGroup, ...inputStyle }}
            />
          </form>
        </div>
      );
    case 1:
        return (
          <div className="container">
        <form style={formStyle}>
          <label htmlFor="fullName" style={{ ...h5Style }}>
            Full Name :
          </label>
          <input
            placeholder="Enter full name"
            type="text"
            id="fullName"
            style={{ ...inputGroup, ...inputStyle }}
          />
  
          <label htmlFor="function" style={{ ...h5Style }}>
            Function :
          </label>
          <input
            placeholder="Enter function"
            type="text"
            id="function"
            style={{ ...inputGroup, ...inputStyle }}
          />
  
          <label htmlFor="phone" style={{ ...h5Style }}>
            Phone :
          </label>
          <input
            placeholder="Enter phone number"
            type="text"
            id="phone"
            style={{ ...inputGroup, ...inputStyle }}
          />
  
          <label htmlFor="email" style={{ ...h5Style }}>
            Email :
          </label>
          <input
            placeholder="Enter email address"
            type="email"
            id="email"
            style={{ ...inputGroup, ...inputStyle }}
          />
        </form>
      </div>
        );
    default:
      return <FormFields />;
  }
}

export default function StepperForm() {
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [textareaHeight, setTextareaHeight] = useState("auto");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);

  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleReset = () => setActiveStep(0);

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
              {getStepContent(activeStep, textareaHeight, handleTextareaChange,handleImageUpload)}
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
                onClick={handleNext}
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
