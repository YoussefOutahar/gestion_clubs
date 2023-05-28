import React, { useState } from "react";
import supabase from "../../DataBase/Clients/SupabaseClient";
import { getUserClub } from "../../../old_project/Utils/UserInfos";

import { styled,useTheme } from "@mui/material";

// Upload a file to Storage
async function uploadFileToStorage(file, fileName) {
    const { data, error } = await supabase.storage.from("Documents").upload(fileName, file);
    if (error) {
        console.error("Error uploading file:", error.message);
        return;
    }
    console.log("File uploaded successfully:", data.Key);
}

// Get file URL from Storage
const getFileURL = async (fileName) => {
    const { publicURL, error } = await supabase.storage.from("Documents").getPublicUrl(fileName);
    if (error) {
        console.error("Error getting file URL:", error.message);
        return null;
    }
    console.log("File URL:", publicURL);
    return publicURL;
}

// Insert file metadata into the table
const linkFileToTable = async (fileName, fileURL, Rval, Dval, event) => {
    const { Infos } = await getUserClub();
    const club = Infos.club;
    const { data, error } = await supabase.from("Documents").insert([
        {
            nom: fileName,
            path: fileURL,
            ref_validation: Rval,
            dve_validation: Dval,
            id_club: club,
            id_activité: event,
        },
    ]);
    if (error) {
        console.error("Error linking file to table:", error.message);
        return;
    }
    console.log("File linked to table successfully:", data);
}

const FinancePage = () => {
    const { palette } = useTheme();
    const [eventName, setEventName] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedFile || !eventName) {
            console.error("Please choose a file and enter an event name.");
            return;
        }
        // Upload file to storage
        const fileName = selectedFile.name;
        await uploadFileToStorage(selectedFile, fileName);

        // Get file URL from storage
        const fileURL = await getFileURL(fileName);

        // Link file to table
        await linkFileToTable(fileName, fileURL, "false", "false", eventName);

        // Clear form fields
        setEventName("");
        setSelectedFile(null);
    };
    // Handle file selection
    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    const ContentBox = styled('div')(({ theme }) => ({
        margin: '30px',
        [theme.breakpoints.down('sm')]: { margin: '16px' },
      }));

    return (
        <ContentBox>
            <h1>Finance Page Test</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Event Name:
                    <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} />
                </label>
                <br />
                <label>
                    File:
                    <input type="file" onChange={handleFileSelect} />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </ContentBox>
    );
}
export default FinancePage;
