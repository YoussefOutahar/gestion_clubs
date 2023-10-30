import React, { useEffect } from "react";
import RequestList from "./Components/RequestList";

import { MatxLoading } from "../../../components";

import {
    Box,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    DialogContentText,
    Button,
    Container,
    Paper,
    Typography,
    Grid,
    Divider,
} from "@mui/material";
import Breadcrumb from "../../../components/Breadcrumb";

import useEvents from "../../../hooks/useEvents";
import EventsService from "../../../DataBase/services/EventsService";

const EventsValidationPage = () => {
    const { events } = useEvents();

    const handleAcceptAll = (selectedItems) => {
        // Handle accepting all selected items here
    };

    const handleDeleteAll = (selectedItems) => {
        // Handle deleting all selected items here
    };

    // Info button dialog
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState("paper");

    const [eventData, setEventData] = React.useState(null);

    const handleClickOpen = async (event) => {
        console.log(event);
        setEventData(event);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    const handleDecline = async (event) => {
        await EventsService.deleteEvent(event.id);
    };

    const handleAccept = async (event) => {
        await EventsService.updateEvent(event.id, { ...event, state: "waiting for admin validation" });
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
                    onAccept={async (event) => {
                        await handleAccept(event);
                    }}
                    onDecline={async (event) => {
                        await handleDecline(event);
                    }}
                    onInfo={async (event) => {
                        await handleClickOpen(event);
                    }}
                />
            )}

            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                fullWidth={true}
                maxWidth="md"
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">{eventData ? eventData.name : ""}</DialogTitle>
                <DialogContent dividers={scroll === "paper"}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        {eventData ? (
                            <Container maxWidth="md">
                                <Paper elevation={3} style={{ padding: "16px" }}>
                                    <Typography variant="h5" gutterBottom>
                                        {eventData.name}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                                        Event ID: {eventData.id}
                                    </Typography>
                                    <Divider style={{ margin: "16px 0" }} />

                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant="subtitle2">Date</Typography>
                                            <Typography>{eventData.date}</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant="subtitle2">Time</Typography>
                                            <Typography>{eventData.time}</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant="subtitle2">Location</Typography>
                                            <Typography>{eventData.location}</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant="subtitle2">Funding Method</Typography>
                                            <Typography>{eventData.funding_method}</Typography>
                                        </Grid>
                                    </Grid>

                                    <Divider style={{ margin: "16px 0" }} />

                                    <Typography variant="subtitle2">Description</Typography>
                                    <Typography>{eventData.description}</Typography>
                                </Paper>
                            </Container>
                        ) : (
                            <MatxLoading />
                        )}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        onClick={async () => {
                            await handleDecline(eventData);
                            handleClose();
                        }}
                    >
                        Decline
                    </Button>
                    <Button
                        onClick={async () => {
                            await handleAccept(eventData);
                            handleClose();
                        }}
                    >
                        Accept
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default EventsValidationPage;
