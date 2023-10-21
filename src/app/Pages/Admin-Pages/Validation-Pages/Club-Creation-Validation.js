import React, { Fragment, useState } from "react";
import {
    Avatar,
    Box,
    Card,
    Checkbox,
    Container,
    Fab,
    Grid,
    Hidden,
    Icon,
    IconButton,
    styled,
    Button,
    useTheme,
} from "@mui/material";
import { Span } from "../../../components/Typography";
import { format } from "date-fns";
import Breadcrumb from "../../../components/Breadcrumb";

const ProjectName = styled(Span)(({ theme }) => ({
    marginLeft: 24,
    fontWeight: "500",
    [theme.breakpoints.down("sm")]: { marginLeft: 4 },
}));

const StarOutline = styled(Fab)(() => ({
    marginLeft: 0,
    boxShadow: "none",
    background: "#08ad6c !important",
    backgroundColor: "rgba(9, 182, 109, 1) !important",
}));

const DateRange = styled(Fab)(({ theme }) => ({
    marginLeft: 0,
    boxShadow: "none",
    color: "white !important",
    background: `${theme.palette.error.main} !important`,
}));

const StyledAvatar = styled(Avatar)(() => ({
    width: "32px !important",
    height: "32px !important",
}));

const Clubs = () => {
    const { palette } = useTheme();
    const textMuted = palette.text.secondary;

    const requests = [1, 2, 3, 4, 5, 6];

    const [selectedItems, setSelectedItems] = useState([]);

    const handleAcceptAllSelected = () => {
        // Handle accepting all selected items here
    };

    const handleDeleteAllSelected = () => {
        // Handle deleting all selected items here
    };

    return (
        <>
            <Container>
                <Box p={4} className="breadcrumb">
                    <Breadcrumb
                        routeSegments={[{ name: "Finance", path: "/finance" }, { name: "Add Charge" }]}
                    />
                </Box>
                <Box display="flex" justifyContent="flex-end">
                    <Button variant="contained" color="primary" onClick={handleAcceptAllSelected}>
                        Accept All Selected
                    </Button>
                    <Button variant="contained" color="error" onClick={handleDeleteAllSelected}>
                        Delete All Selected
                    </Button>
                </Box>
                {requests.map((request) => (
                    <Fragment key={request}>
                        <Card sx={{ py: 2, px: 2 }} className="project-card">
                            <Grid container alignItems="center">
                                <Grid item md={5} xs={7}>
                                    <Box display="flex" alignItems="center">
                                        <Checkbox />
                                        <Hidden smDown>
                                            {request % 2 === 1 ? (
                                                <StarOutline size="small">
                                                    <Icon>star_outline</Icon>
                                                </StarOutline>
                                            ) : (
                                                <DateRange size="small">
                                                    <Icon>date_range</Icon>
                                                </DateRange>
                                            )}
                                        </Hidden>
                                        <ProjectName>Request</ProjectName>
                                    </Box>
                                </Grid>

                                <Grid item md={3} xs={4}>
                                    <Box color={textMuted}>
                                        {format(new Date().getTime(), "MM/dd/yyyy hh:mma")}
                                    </Box>
                                </Grid>

                                <Grid item xs={4}>
                                    <Box display="flex" justifyContent="flex-end"  alignItems="center">
                                        <IconButton color="success">
                                            <Icon>check_circle</Icon> {/* Add your accept icon */}
                                        </IconButton>
                                        <IconButton color="info">
                                            <Icon>info</Icon> {/* Add your more details icon */}
                                        </IconButton>
                                        <IconButton color="error">
                                            <Icon>cancel</Icon> {/* Add your reject icon */}
                                        </IconButton>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Card>
                        <Box py={1} />
                    </Fragment>
                ))}
            </Container>
        </>
    );
};

export default Clubs;
