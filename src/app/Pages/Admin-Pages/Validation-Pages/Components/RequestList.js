import { Fragment, useState } from "react";
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
import { Span } from "../../../../components/Typography";
import { format } from "date-fns";

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

const RequestsList = ({ requests, handleAcceptAll, handleDeleteAll, onAccept, onDecline, onInfo }) => {
    const { palette } = useTheme();
    const textMuted = palette.text.secondary;

    const [selectedItems, setSelectedItems] = useState([]);

    const handleAcceptAllSelected = () => {
        if (handleAcceptAll) {
            handleAcceptAll(selectedItems);
        }
    };

    const handleDeleteAllSelected = () => {
        if (handleDeleteAll) {
            handleDeleteAll(selectedItems);
        }
    };

    const handleOnAccept = (id) => {
        if (onAccept) {
            onAccept(id);
        }
    };

    const handleOnDecline = (id) => {
        if (onDecline) {
            onDecline(id);
        }
    };

    const handleOnInfo = (id) => {
        if (onInfo) {
            onInfo(id);
        }
    };

    return (
        <>
            <Container>
                <Box display="flex" justifyContent="flex-end">
                    <Button variant="contained" color="primary" onClick={handleAcceptAllSelected}>
                        Accept All Selected
                    </Button>
                    <Box mx={1}>{/*Spacing*/}</Box>
                    <Button variant="contained" color="error" onClick={handleDeleteAllSelected}>
                        Delete All Selected
                    </Button>
                </Box>
                <Box my={3}>{/*Spacing*/}</Box>
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
                                    <Box display="flex" justifyContent="flex-end" alignItems="center">
                                        <IconButton
                                            color="success"
                                            onClick={() => {
                                                handleOnAccept(request);
                                            }}
                                        >
                                            <Icon>check_circle</Icon> {/* Add your accept icon */}
                                        </IconButton>
                                        <IconButton
                                            color="info"
                                            onClick={() => {
                                                handleOnInfo(request);
                                            }}
                                        >
                                            <Icon>info</Icon> {/* Add your more details icon */}
                                        </IconButton>
                                        <IconButton
                                            color="error"
                                            onClick={() => {
                                                handleOnDecline(request);
                                            }}
                                        >
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

export default RequestsList;
