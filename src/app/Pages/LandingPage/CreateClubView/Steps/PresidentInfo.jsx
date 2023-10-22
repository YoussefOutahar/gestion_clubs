import { Box, Button } from "@material-ui/core";
import { formStyle, h5Style, inputGroup, inputStyle } from "./Styles";
import MatxLoading from "../../../../components/MatxLoading";
import { useState } from "react";

import PendingProfilesService from "../../../../DataBase/services/PendingProfilesService";

function PresidentInfo({ clubId, handleNext, handleBack }) {
    const [loading, setLoading] = useState(false);
    const [presidentData, setPresidentData] = useState({
        name: "",
        field: "",
        year: "",
        phone: "",
        email: "",
        id_club: clubId,
        role_club: "President",
    });
    const handleInputChange = (key, value) => {
        setPresidentData({ ...presidentData, [key]: value });
    };

    const save = async () => {
      await PendingProfilesService.addPendingProfile(presidentData);
    };

    return (
        <>
            {loading ? (
                <MatxLoading />
            ) : (
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
                    <Box pt={2}>
                        <Button
                            variant="contained"
                            color="secondary"
                            // disabled={activeStep === 0}
                            onClick={handleBack}
                        >
                            Back
                        </Button>
                        <Button
                            sx={{ ml: 2 }}
                            variant="contained"
                            color="primary"
                            onClick={async () => {
                                setLoading(true);
                                await save();
                                handleNext();
                                setLoading(false);
                            }}
                        >
                            Next
                            {/* {activeStep === steps.length - 1 ? "Finish" : "Next"} */}
                        </Button>
                    </Box>
                </div>
            )}
        </>
    );
}

export default PresidentInfo;
