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
import { getCurrentUser, getUsersByClub, getProfileById, updateUserRole,deleteProfile } from "../../DataBase/services/UsersService";

const GestionMembers = () => {
    const [users, setUsers] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [filter, setFilter] = useState("all");
    const [currentUserData, setCurrentUserData] = useState("");
    const [newRole, setNewRole] = useState("");

    useEffect(() => {
        async function fetchUsers() {
            const currentUser = await getCurrentUser();
            if (currentUser) {
                console.log(currentUser)
                const userProfile = await getProfileById(currentUser.id);
                if (userProfile.length > 0) {
                    setCurrentUserData(userProfile);
                    console.log(userProfile)
                    const userClubId = userProfile[0].id_club;
                    const clubMembers = await getUsersByClub(userClubId);
                    setUsers(clubMembers);
                }
            }
        }

        fetchUsers();
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

    const handleSaveRole = async () => {
        if (editUser && newRole) {
            await updateUserRole(editUser.id, newRole);
            const updatedUserData = await getProfileById(editUser.id);

            // Update the local users state with the updated user data
            if (updatedUserData.length > 0) {
                const updatedUsers = users.map((user) => {
                    if (user.id === updatedUserData[0].id) {
                        return updatedUserData[0];
                    }
                    return user;
                });
                setUsers(updatedUsers);
            }
        }
        setOpenEditDialog(false);
    };

    const handleConfirmDelete = async () => {
        deleteProfile(deleteUser.id);
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
                            <MenuItem value="info">Informatique</MenuItem>
                            <MenuItem value="auto">Automobile</MenuItem>
                            <MenuItem value="Denatire">Denatire</MenuItem>
                            {/* Add more filter options here */}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <TableContainer component={Paper} style={{ marginTop: "20px", paddingLeft: "10px" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Study Field</TableCell>
                            <TableCell>Annee</TableCell>
                            {currentUserData && (currentUserData[0].role_club === "President" || currentUserData[0].role_club === "VicePresident") && (
                                <TableCell>Actions</TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(
                            (user) =>
                                (filter === "all" || user.field.toLowerCase() === filter) &&
                                (searchText === "" ||
                                    user.name.toLowerCase().includes(searchText.toLowerCase())) && (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.role_club}</TableCell>
                                        <TableCell>{user.phone}</TableCell>
                                        <TableCell>{user.field}</TableCell>
                                        <TableCell>{user.year}</TableCell>
                                        {currentUserData && (currentUserData[0].role_club === "President" || currentUserData[0].role_club === "VicePresident") && (
                                            <TableCell>
                                                <Button
                                                    variant="outlined"
                                                    color="primary"
                                                    style={{ marginRight: '3px', marginBottom: '1px'}}
                                                    onClick={() => handleEdit(user)}
                                                >
                                                    Edit Role
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    color="secondary"
                                                    onClick={() => handleDelete(user)}
                                                >
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        )}
                                    </TableRow>
                                )
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={openEditDialog} onClose={handleClose}>
                <DialogTitle>Edit user's role</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel>New Role</InputLabel>
                        <Select
                            value={newRole}
                            onChange={(e) => setNewRole(e.target.value)}
                            label="New Role"
                        >
                            <MenuItem value="President">President</MenuItem>
                            <MenuItem value="VicePresident">VicePresident</MenuItem>
                            <MenuItem value="Secretary">Secretary</MenuItem>
                            <MenuItem value="Financer">Financer</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveRole} color="primary">
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
