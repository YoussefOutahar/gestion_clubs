import React, { useState, useEffect } from "react";
import SimpleCard from "../../components/SimpleCard";
import { styled, Box, Button, Table, Typography, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import ClubsService from "../../DataBase/services/ClubsService";
import PendingMembersService from "../../DataBase/services/PendingMembersService";
import { useParams } from 'react-router-dom';


const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
}));

const StyledTable = styled(Table)(() => ({
    whiteSpace: "pre",
    "& thead": {
        "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
    },
    "& tbody": {
        "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
    },
}));

const ContentBox1 = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

const NewClubDetails = () => {
    const { clubName } = useParams();
    const [clubData, setClubData] = useState([]);
    const [membersData, setMembersData] = useState([]);
    const [supervisor, setSupervisor] = useState(null);

    console.log("club name", clubName);

    const fetchData = async () => {
        try {
            // Fetch club data
            const clubResponse = await ClubsService.getClubByName(clubName);
            setClubData(clubResponse[0]);

            // Fetch members data
            const membersResponse = await PendingMembersService.getMembersByClubName(clubName);

            // Filter out the supervisor
            const supervisorMember = membersResponse.find(member => member.role_club === "Supervisor");
            setSupervisor(supervisorMember);

            const filteredMembers = membersResponse.filter(member => member.role_club !== "Supervisor");
            setMembersData(filteredMembers);

            console.log("members data :", membersData);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    useEffect(() => {
        fetchData(); // Initial data fetch
    }, []);

    return (
        <ContentBox1>
            <h1>New Club Request</h1>
            <SimpleCard>
                <Box width="100%" overflow="auto">
                    <Typography variant="h6" gutterBottom style={{ fontWeight: "bold" }}>
                        Club :
                    </Typography>
                    <Typography variant="body1" gutterBottom style={{ marginLeft: "20px" }} >
                        Name: {clubData.name}
                    </Typography>
                    <Typography variant="body1" gutterBottom style={{ marginLeft: "20px" }}>
                        Mission: {clubData.mission}
                    </Typography>
                    <Typography variant="body1" gutterBottom style={{ marginLeft: "20px" }}>
                        KPO: {clubData.kpo}
                    </Typography>

                    {supervisor && (
                        <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                            <Typography variant="h6" gutterBottom style={{ fontWeight: "bold" }}>
                                Supervisor:
                            </Typography>
                            <Typography variant="body1" gutterBottom style={{ marginLeft: "20px" }} >
                                Name: {supervisor.name}
                            </Typography>
                            <Typography variant="body1" gutterBottom style={{ marginLeft: "20px" }}>
                                Function: {supervisor.function}
                            </Typography>
                            <Typography variant="body1" gutterBottom style={{ marginLeft: "20px" }}>
                                Phone: {supervisor.phone}
                            </Typography>
                            <Typography variant="body1" gutterBottom style={{ marginLeft: "20px" }}>
                                Email: {supervisor.email}
                            </Typography>
                        </div>
                    )}

                    <Typography variant="h6" gutterBottom style={{ fontWeight: "bold" }}>
                        Founders :
                    </Typography>
                    <StyledTable>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="center">Role</TableCell>
                                <TableCell align="center">Field</TableCell>
                                <TableCell align="center">year</TableCell>
                                <TableCell align="center">Phone</TableCell>
                                <TableCell align="center">Email</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {membersData.map((member, index) => (
                                <TableRow key={index}>
                                    <TableCell align="left">{member.name}</TableCell>
                                    <TableCell align="left">{member.role_club}</TableCell>
                                    <TableCell align="center">{member.field}</TableCell>
                                    <TableCell align="center">{member.year}</TableCell>
                                    <TableCell align="center">{member.phone}</TableCell>
                                    <TableCell align="center">{member.email}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </StyledTable>
                </Box>
            </SimpleCard>
        </ContentBox1>
    );
}
export default NewClubDetails;
