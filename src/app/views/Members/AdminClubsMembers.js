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
import { getAllProfilesByRole,deleteProfile } from "../../DataBase/services/UsersService";
import ClubsService from "../../DataBase/services/ClubsService";

const AdminClubsMembers = () => {
    const [users, setUsers] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        // Define an async function to fetch users and set them to the state
        const fetchUsers = async () => {
            try {
                const userProfiles = await getAllProfilesByRole();
                // Get club information for each user
                for (const user of userProfiles) {
                    const clubInfo = await ClubsService.getClub(user.id_club);
                    user.club = clubInfo[0].name;
                }
                setUsers(userProfiles);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        // Call the async function within the useEffect hook
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

    //logic of the dialogs
    const handleSave = async () => {
        console.log(editUser);
        setOpenEditDialog(false);
    };

    const handleConfirmDelete = async () => {
        // deleteProfile(deleteUser.id);
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
                            <MenuItem value="President">President</MenuItem>
                            <MenuItem value="VicePresident">Vice President</MenuItem>
                            <MenuItem value="Financer">Financer</MenuItem>
                            <MenuItem value="Secretary">Secretary</MenuItem>
                            <MenuItem value="Member">Membre</MenuItem>
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
                            <TableCell>Club</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Study Field</TableCell>
                            <TableCell>Annee</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(
                            (user) =>
                                (filter === "all" || user.role_club === filter) &&
                                (searchText === "" ||
                                    user.name.toLowerCase().includes(searchText.toLowerCase())) && (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.role_club}</TableCell>
                                        <TableCell>{user.club}</TableCell>
                                        <TableCell>{user.phone}</TableCell>
                                        <TableCell>{user.field}</TableCell>
                                        <TableCell>{user.year}</TableCell>
                                        <TableCell>
                                            {/*<Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                style={{ marginRight: "8px" }}
                                                onClick={() => handleEdit(user)}
                                            >
                                                Edit
                                            </Button>*/}
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                size="small"
                                                onClick={() => handleDelete(user)}
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

export default AdminClubsMembers;
