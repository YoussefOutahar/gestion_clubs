import React from "react";
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
        const logoLink  = await ClubsService.getClubLogoLink(club.id);
        setClubData({...club , logo: logoLink});
        const pending_profiles = await PendingProfilesService.getPendingProfileByClubId(club.id);
        setPendingProfiles(pending_profiles);
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
            {clubs && (
                <RequestList
                    requests={clubs}
                    handleAcceptAll={handleAcceptAll}
                    handleDeleteAll={handleDeleteAll}
                    onAccept={async (club) => {
                        await ClubsService.updateClubState(club.id, "active");

                        const pending_profiles = await PendingProfilesService.getPendingProfileByClubId(club.id);
                        
                        pending_profiles.forEach(async (pending_profile) => {
                            await PendingProfilesService.updatePendingProfile(pending_profile.id, { state: "accepted" });
                        });
                    }}
                    onDecline={async (club) => {
                        const pending_profiles = await PendingProfilesService.getPendingProfileByClubId(club.id);

                        pending_profiles.forEach(async (pending_profile) => {
                            await PendingProfilesService.deletePendingProfile(pending_profile.id);
                        });

                        ClubsService.deleteClub(club.id);
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
                <DialogTitle id="scroll-dialog-title">{clubData ? clubData.name : ""}</DialogTitle>
                <DialogContent dividers={scroll === "paper"}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        {pending_profiles && clubData ? (
                            <>
                                <img src={clubData.logo} alt="Club Logo" />
                                <Box my={2}>{/*Spacing*/}</Box>
                                <p>Date of Creation: {clubData.date_creation}</p>
                                <Box my={2}>{/*Spacing*/}</Box>
                                <p>Mission: {clubData.mission}</p>
                                <Box my={2}>{/*Spacing*/}</Box>
                                <p>KPO: {clubData.kpo}</p>
                                <Box my={2}>{/*Spacing*/}</Box>
                                <p>Number of Members: {clubData.nb_member}</p>
                                <Box my={2}>{/*Spacing*/}</Box>
                                <p>State: {clubData.state}</p>
                                <Box my={4}>{/*Spacing*/}</Box>
                                <h3>Members</h3>
                                <List>
                                    {pending_profiles.map((pending_profile, index) => (
                                        <ListItem key={index}>
                                            <ListItemText primary={pending_profile.name} />
                                            <ListItemText secondary={pending_profile.email} />
                                        </ListItem>
                                    ))}
                                </List>
                            </>
                        ) : (<>
                            <p>Club data is loading...</p>
                        </>)}
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

export default ClubsValidationPage;
