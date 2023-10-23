import { Box, Button } from "@material-ui/core";
import { formStyle, h5Style, inputGroup, inputStyle } from "./Styles";
import MatxLoading from "../../../../components/MatxLoading";
import { useState } from "react";

import PendingProfilesService from "../../../../DataBase/services/PendingProfilesService";

function SuperVisorInfo({ clubId, handleNext, handleBack }) {
    const [loading, setLoading] = useState(false);
    const [supervisorData, setSupervisorData] = useState({
        name: "",
        field: "",
        phone: "",
        email: "",
        year: "",
        id_club: clubId,
        role_club: "Supervisor",
    });
    const handleInputChange = (key, value) => {
        setSupervisorData({ ...supervisorData, [key]: value });
    };

    const save = async () => {
      await PendingProfilesService.addPendingProfile(supervisorData);
    };
    return (
        <>
            {loading ? (
                <MatxLoading />
            ) : (
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
                            id="field"
                            style={{ ...inputGroup, ...inputStyle }}
                            value={supervisorData.field}
                            onChange={(e) => handleInputChange("field", e.target.value)}
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

export default SuperVisorInfo;
