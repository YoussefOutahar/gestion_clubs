import React, { useState, useEffect } from "react";
import {
    Typography,
    Avatar,
    Grid,
    Box,
    Fab,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { SimpleCard } from "../../components";
import * as Yup from "yup";
import { Formik } from "formik";
import { Span } from "../../components/Typography";

import supabase from "../../DataBase/Clients/SupabaseClient";
import { getCurrentUser, getUserMember, getProfileById } from "../../DataBase/services/UsersService";
import { getMembreClub } from "../../DataBase/services/MembersService";
import { updateMembre } from "../../DataBase/services/MembersService";
import { updateProfile } from "../../DataBase/services/UsersService";

// form field validation schema
const validationSchema = Yup.object().shape({
    password: Yup.string().min(6, "Password must be 6 character length").required("Password is required!"),
    email: Yup.string().email("Invalid Email address").required("Email is required!"),
});

const Account = () => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [member, setMember] = useState(null);
    const [club, setClub] = useState(null);

    useEffect(() => {
        getCurrentUser().then((currentUser) => {
            getProfileById(currentUser.id).then((profile) => {
                if (profile[0].role.toLowerCase() != "admin") {
                    getUserMember(currentUser.id).then((member) => {
                        getMembreClub(member[0].id).then((club) => {
                            setUser([
                                {
                                    id: profile[0].id,
                                    role: member[0].role,
                                    name: profile[0].name,
                                    email: currentUser.email,
                                    avatar: profile[0].avatar,
                                    phone: profile[0].phone,
                                    club: club[0].nom,
                                    filliere: profile[0].filliere,
                                    annee: profile[0].annee,
                                },
                            ]);
                            setProfile(profile[0]);
                            setMember(member[0]);
                            setClub(club[0]);
                        });
                    });
                } else {
                    setUser([
                        {
                            id: profile[0].id,
                            role: profile[0].role,
                            name: profile[0].name,
                            email: currentUser.email,
                            avatar: profile[0].avatar,
                            phone: profile[0].phone,
                            bureau: profile[0].bureau,
                        },
                    ]);
                    setProfile(profile[0]);
                }
            });
        });
    }, []);

    const [openEditDialog, setOpenEditDialog] = useState(false);

    const initialValues = {
        role: "",
        name: "",
        phone: "",
        club: "",
        filliere: "",
        annee: "",
        bureau: "",
    };

    //Opening Dialogs
    const handleEdit = () => {
        setOpenEditDialog(true);
    };

    //Closing Dialogs
    const handleClose = () => {
        setOpenEditDialog(false);
    };

    //logic of the dialogs
    const handleEditFormSubmit = async (values) => {
        console.log(values);
        try {
            if (user[0].role == "admin") {
                console.log("admin");
                const { error } = await supabase.storage
                    .from("Avatars")
                    .upload(selectedFile.name, selectedFile);
                if (error) {
                    console.error("Error uploading file:", error.message);
                } else {
                    const fileUrl =
                        "https://vussefkqdtgdosoytjch.supabase.co/storage/v1/object/public/Avatars/" +
                        selectedFile.name;
                    const { role, name, phone, club, filliere, annee, bureau } = values;

                    await updateProfile(profile.id, {
                        role: "admin",
                        name: name,
                        phone: phone,
                        avatar: selectedFile ? fileUrl : profile.avatar,
                        bureau: bureau,
                    });
                    if (error) {
                        console.error(error);
                    } else {
                        console.log("Data inserted successfully");
                    }
                    console.log("File uploaded and reference saved successfully.");
                }
            } else {
                console.log("user");
                const { error } = await supabase.storage
                    .from("Avatars")
                    .upload(selectedFile.name, selectedFile);
                if (error) {
                    console.error("Error uploading file:", error.message);
                } else {
                    const fileUrl =
                        "https://vussefkqdtgdosoytjch.supabase.co/storage/v1/object/public/Avatars/" +
                        selectedFile.name;
                    const { role, name, phone, club, filliere, annee } = values;

                    await updateProfile(profile.id, {
                        role: "user",
                        name: name,
                        avatar: selectedFile ? fileUrl : profile.avatar,
                        phone: phone,
                        filliere: filliere,
                        annee: annee,
                    });
                    await updateMembre(member.id, {
                        role: role,
                    });
                    if (error) {
                        console.error(error);
                    } else {
                        console.log("Data inserted successfully");
                    }
                    console.log("File uploaded and reference saved successfully.");
                }
            }
        } catch (e) {
            console.log(e);
        }
        setOpenEditDialog(false);
    };

    //fileUpload
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    if (user && profile) {
        return (
            <>
                <SimpleCard style={{ margin: "20px" }}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <Avatar
                                alt={user[0].name}
                                src={user[0].avatar}
                                sx={{ width: 120, height: 120, margin: "2%" }}
                            />
                        </Grid>
                        <Grid item>
                            <Typography variant="h5">{user[0].name}</Typography>
                        </Grid>
                    </Grid>
                    <Box border={1} borderRadius={4} p={2} mt={2} mb={2}>
                        <Typography>Email: {user[0].email}</Typography>
                    </Box>
                    {user[0].role.toLowerCase() != "admin" ? (
                        <Box border={1} borderRadius={4} p={2} mt={2} mb={2}>
                            <Typography>Club: {user[0].club}</Typography>
                        </Box>
                    ) : null}
                    <Box border={1} borderRadius={4} p={2} mt={2} mb={2}>
                        <Typography>Role: {user[0].role}</Typography>
                    </Box>
                    <Box border={1} borderRadius={4} p={2} mt={2} mb={2}>
                        <Typography>Phone: {user[0].phone}</Typography>
                    </Box>
                    {user[0].role.toLowerCase() != "admin" ? (
                        <Box border={1} borderRadius={4} p={2} mt={2} mb={2}>
                            <Typography>Filliere: {user[0].filliere}</Typography>
                        </Box>
                    ) : null}
                    {user[0].role.toLowerCase() != "admin" ? (
                        <Box border={1} borderRadius={4} p={2} mt={2} mb={2}>
                            <Typography>Annee: {user[0].annee}</Typography>
                        </Box>
                    ) : null}
                    {user[0].role.toLowerCase() == "admin" ? (
                        <Box border={1} borderRadius={4} p={2} mt={2} mb={2}>
                            <Typography>Bureau: {user[0].bureau}</Typography>
                        </Box>
                    ) : null}
                    <Fab
                        color="primary"
                        aria-label="Edit"
                        sx={{ position: "fixed", bottom: 16, right: 16 }}
                        onClick={handleEdit}
                    >
                        <EditIcon />
                    </Fab>
                </SimpleCard>
                <Dialog open={openEditDialog} onClose={handleClose}>
                    <DialogTitle>Edit User</DialogTitle>
                    <Formik
                        validationSchema={validationSchema}
                        onSubmit={handleEditFormSubmit}
                        initialValues={initialValues}
                    >
                        {({ values, errors, touched, handleChange, handleBlur, handleSubmit , submitForm}) => (
                            <form onSubmit={handleSubmit}>
                                <DialogContent>
                                    <Grid container spacing={2} marginTop={2}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            type="text"
                                            name="name"
                                            label="Name"
                                            variant="outlined"
                                            onBlur={handleBlur}
                                            value={values.name}
                                            onChange={handleChange}
                                            helperText={touched.name && errors.name}
                                            error={Boolean(errors.name && touched.name)}
                                            sx={{ mb: 3 }}
                                        />
                                        {user[0].role.toLowerCase() != "admin" ? (
                                            <TextField
                                                fullWidth
                                                size="small"
                                                name="role"
                                                type="text"
                                                label="Role"
                                                variant="outlined"
                                                onBlur={handleBlur}
                                                value={values.role}
                                                onChange={handleChange}
                                                sx={{ mb: 2 }}
                                            />
                                        ) : null}
                                        <TextField
                                            fullWidth
                                            size="small"
                                            name="phone"
                                            type="phone"
                                            label="Phone"
                                            variant="outlined"
                                            onBlur={handleBlur}
                                            value={values.phone}
                                            onChange={handleChange}
                                            sx={{ mb: 2 }}
                                        />
                                        {user[0].role.toLowerCase() != "admin" ? (
                                            <TextField
                                                fullWidth
                                                size="small"
                                                name="filliere"
                                                type="text"
                                                label="Filliere"
                                                variant="outlined"
                                                onBlur={handleBlur}
                                                value={values.filliere}
                                                onChange={handleChange}
                                                sx={{ mb: 2 }}
                                            />
                                        ) : null}
                                        {user[0].role.toLowerCase() != "admin" ? (
                                            <TextField
                                                fullWidth
                                                size="small"
                                                name="annee"
                                                type="text"
                                                label="Annee"
                                                variant="outlined"
                                                onBlur={handleBlur}
                                                value={values.annee}
                                                onChange={handleChange}
                                                sx={{ mb: 2 }}
                                            />
                                        ) : null}
                                        {user[0].role.toLowerCase() != "admin" ? (
                                            <TextField
                                                fullWidth
                                                size="small"
                                                name="club"
                                                type="text"
                                                label="Club"
                                                variant="outlined"
                                                onBlur={handleBlur}
                                                value={values.club}
                                                onChange={handleChange}
                                                sx={{ mb: 2 }}
                                            />
                                        ) : null}
                                        {user[0].role.toLowerCase() == "admin" ? (
                                            <TextField
                                                fullWidth
                                                size="small"
                                                name="bureau"
                                                type="text"
                                                label="Bureau"
                                                variant="outlined"
                                                onBlur={handleBlur}
                                                value={values.bureau}
                                                onChange={handleChange}
                                                sx={{ mb: 2 }}
                                            />
                                        ) : null}
                                        <input
                                            type="file"
                                            onChange={handleFileChange}
                                            accept=".png,.jpeg"
                                            id="invoice-input"
                                            style={{ display: "none" }}
                                        />
                                        <label htmlFor="invoice-input">
                                            <Button
                                                sx={{ mb: 4 }}
                                                color="primary"
                                                component="span"
                                                variant="outlined"
                                            >
                                                Upload Invoice
                                            </Button>
                                        </label>

                                        <Span style={{ display: "inline-flex", verticalAlign: "middle" }}>
                                            {uploading ? "Uploading ..." : null}
                                            {selectedFile ? selectedFile.name : null}
                                        </Span>
                                    </Grid>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button color="primary" onClick={submitForm}>
                                        <input type="submit" value="Save" />
                                    </Button>
                                </DialogActions>
                            </form>
                        )}
                    </Formik>
                </Dialog>
            </>
        );
    } else {
        return <p></p>;
    }
};

export default Account;
