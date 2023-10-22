import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { h2Style } from "./Steps/Styles";

import ClubsService from "../../../DataBase/services/ClubsService";
import PendingMembersService from "../../../DataBase/services/PendingMembersService";
import DocumentsService from "../../../DataBase/services/DocumentsService";

import ClubsInfo from "./Steps/ClubsInfo";
import SupervisorInfo from "./Steps/SupervisorInfo";
import PresidentInfo from "./Steps/PresidentInfo";
import VicePresidentInfo from "./Steps/VicePresidentInfo";
import FinancierInfo from "./Steps/FinancierInfo";
import SecretaryInfo from "./Steps/SecretaryInfo";

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

function getStepContent(stepIndex, textareaHeight, handleTextareaChange) {
  switch (stepIndex) {
    case 0:
      return (
        <ClubsInfo textareaHeight={textareaHeight} handleTextareaChange={handleTextareaChange} ></ClubsInfo>
      );
    case 1:
      return (
        <SupervisorInfo></SupervisorInfo>
      );
    case 2:
      return (
        <PresidentInfo></PresidentInfo>
      );
    case 3:
      return (
        <VicePresidentInfo></VicePresidentInfo>
      );
    case 4:
      return (
        <FinancierInfo></FinancierInfo>
      );
    case 5:
      return (
        <SecretaryInfo></SecretaryInfo>
      );
    default:
      return (
        <></>
      );
  }
}

export default function StepperForm() {
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [textareaHeight, setTextareaHeight] = useState("auto");
  const navigate = useNavigate();

  const newDocument = {
    name: "Create New Club",
    received_date: new Date(),
    club_name: "",
  };

  const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);

  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleReset = () => setActiveStep(0);

  const handleSubmit = async () => {
    // try {

    //   if (selectedImage) {
    //     // console.log("Image selected:", selectedImage);
    //     // //TODO: Upload the image to storage and database
    //     // // Upload the image to storage
    //     // const { data, error } = await supabase.storage
    //     //   .from("Clubs_Logo")
    //     //   .upload(selectedImage.name, selectedImage);

    //     // if (error) {
    //     //   console.error("Error uploading file:", error.message);
    //     //   return;
    //     // }

    //     // // Set the image URL in clubData
    //     // const fileUrl = data.Key; // This is the URL to the uploaded file
    //     // setClubData({ ...clubData, logo: fileUrl });
    //     // console.log("Image uploaded to storage and added to clubData");
    //     await ClubsService.addClubLogo(37,selectedImage);
    //     console.log("Image uploaded to storage and added to clubData");
    //     const {data} = await ClubsService.getClubLogo(37);
    //     console.log(data);
    //   }
    //   // Add club data
    //   await ClubsService.addClub(clubData);

    //   // Set the club ID for the supervisor and other roles
    //   supervisorData.clubName = clubName;
    //   presidentData.clubName = clubName;
    //   vicePresidentData.clubName = clubName;
    //   financerData.clubName = clubName;
    //   secretaryData.clubName = clubName;
    //   newDocument.club_name = clubName;


    //   // Add users data
    //   await PendingMembersService.addMember(presidentData);
    //   await PendingMembersService.addMember(vicePresidentData);
    //   await PendingMembersService.addMember(financerData);
    //   await PendingMembersService.addMember(secretaryData);

    //   await DocumentsService.addDoc(newDocument);

    //   navigate("/LandingPage");
    // } catch (error) {
    //   console.error("An error occurred:", error);
    // }
  };

  const handleTextareaChange = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
    setTextareaHeight(event.target.style.height);
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
              {getStepContent(activeStep, textareaHeight, handleTextareaChange)}
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
                onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
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
