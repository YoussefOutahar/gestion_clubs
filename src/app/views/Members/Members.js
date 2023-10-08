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
import { getAllProfiles, getUserMember} from "../../DataBase/services/UsersService";
import { getMembreClub , getEtudiant } from "../../DataBase/services/MembersService";
import { getCurrentUser } from "../../DataBase/services/UsersService";

const GestionMembers = () => {
    const [users, setUsers] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        getCurrentUser().then((currentUser) => {
            getUserMember(currentUser.id).then((currentUserMembre) => {
                getAllProfiles().then((data) => {
                    data.forEach(async (user) => {
                        getUserMember(user.id).then((member) => {
                            getMembreClub(member[0].id).then((club) => {
                                if (user.role.toLowerCase() != "admin" && currentUserMembre[0].id_club == club[0].id) {
                                    setUsers((users) => [
                                        ...users,
                                        {
                                            id: user.id,
                                            name: user.name,
                                            email: user.email,
                                            role: member[0].role,
                                            club: club[0].nom,
                                            phone: user.phone,
                                            filliere: user.filliere,
                                            annee: user.annee,
                                        },
                                    ]);
                                }
                            });
                        });
                    });
                });
            });
        }); 
    }, []);

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [editUser, setEditUser] = useState(null);
    const [deleteUser, setDeleteUser] = useState(null);

    //Opening Dialogs
    const handleEdit = (user) => {
        setOpenEditDialog(true);
        setEditUser(user);
    };

    const handleDelete = (user) => {
        setOpenDeleteDialog(true);
        setDeleteUser(user);
    };

    //Closing Dialogs
    const handleClose = () => {
        setOpenEditDialog(false);
        setOpenDeleteDialog(false);
    };

    //logic of the dialogs
    const handleSave = async () => {
        console.log(editUser);
        setOpenEditDialog(false);
    };

    const handleConfirmDelete = async () => {
        // deleteProfile(deleteUserId);
        console.log(deleteUser);
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
                            <TableCell>Annee</TableCell>
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
                                        <TableCell>{user.annee}</TableCell>
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
