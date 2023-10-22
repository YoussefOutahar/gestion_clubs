import { Box, Button } from "@material-ui/core";
import { formStyle, h5Style, inputGroup, inputStyle } from "./Styles";
import MatxLoading from "../../../../components/MatxLoading";
import { useState } from "react";

import PendingProfilesService from "../../../../DataBase/services/PendingProfilesService";

function SecretaryInfo({ clubId, handleNext, handleBack }) {
    const [loading, setLoading] = useState(false);

    const [secretaryData, setSecretaryData] = useState({
        name: "",
        field: "",
        year: "",
        phone: "",
        email: "",
        id_club: clubId,
        role_club: "Secretary",
    });
    const handleInputChange = (key, value) => {
        setSecretaryData({ ...secretaryData, [key]: value });
    };

    const save = async () => {
      await PendingProfilesService.addPendingProfile(secretaryData);
    };

    return (
        <>
            {loading ? (
                <MatxLoading />
            ) : (
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
                            Finish
                            {/* {activeStep === steps.length - 1 ? "Finish" : "Next"} */}
                        </Button>
                    </Box>
                </div>
            )}
        </>
    );
}

export default SecretaryInfo;
