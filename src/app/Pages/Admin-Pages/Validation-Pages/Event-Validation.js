import React, {useEffect} from "react";
import RequestList from "./Components/RequestList";

import { Box } from "@mui/material";
import Breadcrumb from "../../../components/Breadcrumb";
import { Container } from "@mui/system";

import useEvents from "../../../hooks/useEvents";
import { use } from "echarts";

const EventsValidationPage = () => {

    const { events, deleteEvent } = useEvents();

    useEffect(() => {
        console.log(events);
    }, [events]);

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
            {events && (
                <RequestList
                requests={events}
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
            />)}
        </Container>
    );
};

export default EventsValidationPage;