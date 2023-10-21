import React, { useState, useEffect } from "react";
import SimpleCard from "../../components/SimpleCard";
import { styled, Box, Button, Grid, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import DocumentsService from "../../DataBase/services/DocumentsService";
import { useNavigate } from 'react-router-dom';
import ClubsService from "../../DataBase/services/ClubsService";


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

const Dve_validationPage = () => {
    const [documentData, setDocumentData] = useState([]);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response = await DocumentsService.getDocs();
            setDocumentData(response); // Update state with the fetched data
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    useEffect(() => {
        fetchData(); // Initial data fetch
    }, []);

    const handleAccept = async (document) => {
        try {
            // Update the document's dve_validation field to true
            await DocumentsService.dveValidation(document.id, true);
            await ClubsService.updateClubState(document.club_name, "active")
            // Fetch the updated data after the change (optional)
            fetchData();
        } catch (error) {
            console.error("Error accepting document: ", error);
        }
    };

    const handleRefuse = async (document) => {
        try {
            // Delete the document
            await DocumentsService.deleteDoc(document.id);
            // Fetch the updated data after the change (optional)
            fetchData();
        } catch (error) {
            console.error("Error refusing document: ", error);
        }
    };

    const handleDownload = async (path) => {
        // Open the URL in a new window
        window.open(path, '_blank');
    }

    const handleOpenPage = async (clubName) => {
        // Redirect to ClubsDetails page with the club name as a parameter
        navigate(`/newClubDetails/${clubName}`);
    }

    // Filter the documents with dve_validation set to false
    const documentsToDisplay = documentData.filter((document) => !document.dve_validation);


    return (
        <ContentBox1>
            <h1>Requests</h1>
            <SimpleCard>
                <Box width="100%" overflow="auto">
                    <StyledTable>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Request</TableCell>
                                <TableCell align="center">Club</TableCell>
                                <TableCell align="center">Recieved date</TableCell>
                                <TableCell align="center">Files</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {documentsToDisplay.map((document, index) => (
                                <TableRow key={index}>
                                    <TableCell align="left">{document.name}</TableCell>
                                    <TableCell align="center">{document.club_name}</TableCell>
                                    <TableCell align="center">{document.received_date}</TableCell>
                                    <TableCell align="center">
                                        {document.name === "Create New Club" ? (
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                size="small"
                                                style={{ marginRight: "8px" }}
                                                onClick={() => handleOpenPage(document.club_name)}
                                            >
                                                Open Details
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                size="small"
                                                style={{ marginRight: "8px" }}
                                                onClick={() => handleDownload(document)}
                                            >
                                                Open file
                                            </Button>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            style={{ marginRight: "8px" }}
                                            onClick={() => handleAccept(document)}
                                        >
                                            Accept
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            size="small"
                                            onClick={() => handleRefuse(document)}
                                        >
                                            Refuse
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </StyledTable>
                </Box>
            </SimpleCard>
        </ContentBox1>
    );
}
export default Dve_validationPage;
