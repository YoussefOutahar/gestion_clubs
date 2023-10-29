import { Button, Box } from "@mui/material";
import { formStyle, h5Style, inputGroup, inputStyle } from "./Styles";
import MatxLoading from "../../../../components/MatxLoading";
import { useState } from "react";

import PendingProfilesService from "../../../../DataBase/services/PendingProfilesService";

function VicePresidentInfo({ clubId, handleNext, handleBack }) {
    const [loading, setLoading] = useState(false);
    const [vicePresidentData, setVicePresidentData] = useState({
        name: "",
        field: "",
        year: "",
        phone: "",
        email: "",
        id_club: clubId,
        role_club: "VicePresident",
        state: "pending",
    });
    const handleInputChange = (key, value) => {
        setVicePresidentData({ ...vicePresidentData, [key]: value });
    };

    const save = async () => {
      await PendingProfilesService.addPendingProfile(vicePresidentData);
    };

    return (
        <>
            {loading ? (
                <MatxLoading />
            ) : (
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

export default VicePresidentInfo;
