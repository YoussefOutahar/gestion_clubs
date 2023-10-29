import React, { useEffect } from "react";
import RequestList from "./Components/RequestList";

import {
    Box,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    DialogContentText,
    Button,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import Breadcrumb from "../../../components/Breadcrumb";
import { Container } from "@mui/system";

import useEvents from "../../../hooks/useEvents";
import { use } from "echarts";

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

    const handleClickOpen = async (event) => {
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
                        
                    }}
                    onDecline={async (event) => {
                        // Handle accepting a single item here
                        console.log(event);
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
                <DialogTitle id="scroll-dialog-title">test</DialogTitle>
                <DialogContent dividers={scroll === "paper"}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        {true ? (
                            <>
                                <p> teeest </p>
                            </>
                        ) : (
                            <>
                                <p>Club data is loading...</p>
                            </>
                        )}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Subscribe</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default EventsValidationPage;
