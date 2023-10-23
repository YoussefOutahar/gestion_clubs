import React from "react";
import RequestList from "./Components/RequestList";

import { Box } from "@mui/material";
import Breadcrumb from "../../../components/Breadcrumb";
import { Container } from "@mui/system";

const MeetingsValidationPage = () => {
    const requests = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const handleAcceptAll = (selectedItems) => {
        // Handle accepting all selected items here
    };

    const handleDeleteAll = (selectedItems) => {
        // Handle deleting all selected items here
    };

    return (
        <Container>
            <Box p={4} className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: "Finance", path: "/finance" }, { name: "Add Charge" }]} />
            </Box>
            <RequestList
                requests={requests}
                handleAcceptAll={handleAcceptAll}
                handleDeleteAll={handleDeleteAll}
                onAccept={(id) => {
                    // Handle accepting a single item here
                    console.log(id);
                }}
                onDecline={(id) => {
                    // Handle accepting a single item here
                    console.log(id);
                }}
                onInfo={(id) => {
                    // Handle accepting a single item here
                    console.log(id);
                }}
            />
        </Container>
    );
};

export default MeetingsValidationPage;