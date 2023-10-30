import React, { useEffect } from "react";
import RequestList from "./Components/RequestList";

import {
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Button,
    List,
    ListItem,
    ListItemText,
    Container,
    Typography,
    Grid,
    Divider,
} from "@mui/material";
import Breadcrumb from "../../../components/Breadcrumb";
import { MatxLoading } from "../../../components";

import useClubs from "../../../hooks/useClubs";
import ClubsService from "../../../DataBase/services/ClubsService";
import PendingProfilesService from "../../../DataBase/services/PendingProfilesService";

const ClubsValidationPage = () => {
    const { clubs } = useClubs();

    const handleAcceptAll = (selectedItems) => {
        // Handle accepting all selected items here
    };

    const handleDeleteAll = (selectedItems) => {
        // Handle deleting all selected items here
    };

    // Info button dialog
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState("paper");

    const [clubData, setClubData] = React.useState(null);
    const [pending_profiles, setPendingProfiles] = React.useState(null);

    const handleClickOpen = async (club) => {
        const blob = await ClubsService.getClubLogoLink(club.id);

        setClubData({ ...club, logo: blob });
        const pending_profiles = await PendingProfilesService.getPendingProfileByClubId(club.id);
        setPendingProfiles(pending_profiles);
    };

    useEffect(() => {
        if (pending_profiles && clubData) {
            console.log("pending_profiles :", pending_profiles);
            console.log("clubData :", clubData);
            setOpen(true);
        }
    }, [pending_profiles, clubData]);

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

    const handleAccept = async (club) => {
        await ClubsService.updateClubState(club.id, "waiting for admin validation");
    };

    const handleDecline = async (club) => {
        const pending_profiles = await PendingProfilesService.getPendingProfileByClubId(club.id);

        pending_profiles.forEach(async (pending_profile) => {
            await PendingProfilesService.deletePendingProfile(pending_profile.id);
        });

        ClubsService.deleteClub(club.id);
    };

    return (
        <Container>
            <Box p={4} className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: "Finance", path: "/finance" }, { name: "Add Charge" }]} />
            </Box>
            {clubs && (
                <RequestList
                    requests={clubs}
                    handleAcceptAll={handleAcceptAll}
                    handleDeleteAll={handleDeleteAll}
                    onAccept={async (club) => {
                        await handleAccept(club);
                    }}
                    onDecline={async (club) => {
                        await handleDecline(club);
                    }}
                    onInfo={async (club) => {
                        await handleClickOpen(club);
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
                {/* <DialogTitle id="scroll-dialog-title">{clubData ? clubData.name : ""}</DialogTitle> */}
                <DialogContent dividers={scroll === "paper"}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        {pending_profiles && clubData ? (
                            <>
                                <Typography variant="h5" gutterBottom>
                                    {clubData.name}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                                    Club ID: {clubData.id}
                                </Typography>
                                <Divider style={{ margin: "16px 0" }} />

                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="subtitle2">Type</Typography>
                                        <Typography>{clubData.type}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="subtitle2">Location</Typography>
                                        <Typography>{clubData.location}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="subtitle2">Mission</Typography>
                                        <Typography>{clubData.mission}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="subtitle2">KPO</Typography>
                                        <Typography>{clubData.kpo}</Typography>
                                    </Grid>
                                </Grid>

                                <Divider style={{ margin: "16px 0" }} />

                                <Typography variant="subtitle2">Description</Typography>
                                <Typography>{clubData.description}</Typography>

                                <Divider style={{ margin: "16px 0" }} />

                                <List>
                                    {pending_profiles.map((pending_profile, index) => (
                                        <ListItem key={index}>
                                            <ListItemText primary={pending_profile.name} />
                                            <ListItemText secondary={pending_profile.email} />
                                        </ListItem>
                                    ))}
                                </List>
                            </>
                        ) : (
                            <MatxLoading />
                        )}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        onClick={async () => {
                            await handleDecline(clubData);
                            handleClose();
                        }}
                    >
                        Decline
                    </Button>
                    <Button
                        onClick={async () => {
                            await handleAccept(clubData);
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

export default ClubsValidationPage;
