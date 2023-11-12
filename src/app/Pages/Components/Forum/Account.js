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
import { SimpleCard } from "../../../components";
import * as Yup from "yup";
import { Formik } from "formik";
import { styled } from "@material-ui/core";
import { Span } from "../../../components/Typography";

import { getCurrentUser, getUserMember, getProfileById } from "../../../DataBase/services/UsersService";
import UsersService from "../../../DataBase/services/UsersService";

// form field validation schema
const validationSchema = Yup.object().shape({
    password: Yup.string().min(6, "Password must be 6 character length").required("Password is required!"),
    email: Yup.string().email("Invalid Email address").required("Email is required!"),
});

const ContentBox1 = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

const Account = () => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [club, setClub] = useState(null);

    useEffect(() => {
        getCurrentUser().then((currentUser) => {
            UsersService.getUserById(currentUser.id).then((profile) => {
                if (profile[0].role.toLowerCase() != "admin") {
                    UsersService.getUserClub(profile[0].id_club).then((club) => {
                        setUser([
                            {
                                id: profile[0].id,
                                role: profile[0].role,
                                name: profile[0].name,
                                email: currentUser.email,
                                avatar: profile[0].avatar,
                                phone: profile[0].phone,
                                club: club[0].name,
                                field: profile[0].field,
                                year: profile[0].year,
                            },
                        ]);
                        setProfile(profile[0]);
                        setClub(club[0]);
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
        field: "",
        year: "",
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
    /*const handleEditFormSubmit = async (values) => {
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
                    const { role, name, phone, club, field, year } = values;

                    await updateProfile(profile.id, {
                        role: "admin",
                        name: name,
                        phone: phone,
                        avatar: selectedFile ? fileUrl : profile.avatar,
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
                        field: field,
                        year: year,
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
    };*/

    //fileUpload
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    if (user && profile) {
        return (
            <>
                <ContentBox1>
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
                                <Typography>Field: {user[0].field}</Typography>
                            </Box>
                        ) : null}
                        {user[0].role.toLowerCase() != "admin" ? (
                            <Box border={1} borderRadius={4} p={2} mt={2} mb={2}>
                                <Typography>Year: {user[0].year}</Typography>
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
                </ContentBox1>
                <Dialog open={openEditDialog} onClose={handleClose}>
                    <DialogTitle>Edit User</DialogTitle>
                    <Formik
                        validationSchema={validationSchema}
                        //onSubmit={handleEditFormSubmit}
                        initialValues={initialValues}
                    >
                        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, submitForm }) => (
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
                                                name="filed"
                                                type="text"
                                                label="Field"
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
                                                name="year"
                                                type="text"
                                                label="Year"
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
