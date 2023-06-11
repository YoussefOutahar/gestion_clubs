import React, { useState, useEffect } from "react";
import {
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
} from "@mui/material";
import { getAllProfiles, getUserMember } from "../../DataBase/Clients/UsersClient";
import { getMembreClub } from "../../DataBase/Clients/MembersClient";

const GestionMembers = () => {
    const [users, setUsers] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        getAllProfiles().then((data) => {
            data.forEach(async (user) => {
                getUserMember(user.id).then((member) => {
                    if (member[0].role.toLowerCase() != "admin") {
                        getMembreClub(member[0].id).then((club) => {
                            setUsers((users) => [
                                ...users,
                                {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email,
                                    role: user.role,
                                    club: club[0].nom,
                                    phone: user.phone,
                                    studyField: user.studyField,
                                    niveau: user.niveau,
                                },
                            ]);
                        });
                    }
                });
            });
        });
        console.log(users);
    }, []);

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    //Opening Dialogs
    const handleEdit = (userId) => {
        setOpenEditDialog(true);
        // Handle user edit based on the user ID
        // ...
    };

    const handleDelete = (user) => {
        setOpenDeleteDialog(true);
    };

    //Closing Dialogs
    const handleClose = () => {
        setOpenEditDialog(false);
        setOpenDeleteDialog(false);
    };

    //logic of the dialogs
    const handleSave = async () => {
        // Save user based on the user ID
        // ...
        setOpenEditDialog(false);
    };

    const handleConfirmDelete = async () => {
        // Delete user based on the user ID
        // ...
        setOpenDeleteDialog(false);
    };

    return (
        <div style={{ margin: "20px" }}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        label="Search"
                        value={searchText}
                        onChange={handleSearchChange}
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel>Filter</InputLabel>
                        <Select value={filter} onChange={handleFilterChange} label="Filter">
                            <MenuItem value="all">All</MenuItem>
                            <MenuItem value="admin">Admin</MenuItem>
                            <MenuItem value="user">User</MenuItem>
                            {/* Add more filter options here */}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <TableContainer component={Paper} style={{ marginTop: "20px" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Club</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Study Field</TableCell>
                            <TableCell>Niveau</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(
                            (user) =>
                                (filter === "all" || user.role.toLowerCase() === filter) &&
                                (searchText === "" ||
                                    user.name.toLowerCase().includes(searchText.toLowerCase())) && (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.role}</TableCell>
                                        <TableCell>{user.club}</TableCell>
                                        <TableCell>{user.phone}</TableCell>
                                        <TableCell>{user.studyField}</TableCell>
                                        <TableCell>{user.niveau}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                style={{ marginRight: "8px" }}
                                                onClick={() => handleEdit(user.id)}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                size="small"
                                                onClick={() => handleDelete(user.id)}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={openEditDialog} onClose={handleClose}>
                <DialogTitle>Edit User</DialogTitle>
                <DialogContent>
                    <p>test</p>
                    {/* <TextField
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    /> */}
                    {/* Add more form fields here */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openDeleteDialog} onClose={handleClose}>
                <DialogTitle>Delete User</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to delete this user?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} color="primary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default GestionMembers;
