import { Box,Icon, IconButton, styled, Table, TableBody, TableCell, TableHead, TablePagination, TableRow,Select,MenuItem,TextField,} from "@mui/material";
  import SearchIcon from "@mui/icons-material/Search";
  import React, { useState, useEffect } from "react";
import supabase from "../../DataBase/Clients/SupabaseClient";
  
  const StyledTable = styled(Table)(() => ({
    whiteSpace: "pre",
    "& thead": {
      "& tr": {
        "& th": { paddingLeft: 0, paddingRight: 0 },
      },
    },
    "& tbody": {
      "& tr": {
        "& td": { paddingLeft: 0, textTransform: "capitalize" },
      },
    },
  }));
  
  const GestionMembers = () => {

    const [members, setMembers] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
      const fetchMembers = async () => {
        const { data, error } = await supabase.from("Member").select(
          `
            id_etd,
            id_club,
            role,
            Etudiants (
              id_etd
            )
          `
        )
        //.eq("id_club", 1);

        if (error) {
          console.error("Error fetching Membres:", error.message);
        } else {
          setMembers(data);
          console.log("Fetched data:", data);
        }
      };
  
      fetchMembers();
    }, []);
 
    const handleChangePage = (_, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
    const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
      setPage(0);
    };
  
    const filtredMembers = members.filter(
      (membre) =>
        (membre.Etudiants.nom.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  
    return (
      <Box width="100%" overflow="auto">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          mb={2}
          mt={1}
        >
          <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '40px', fontWeight: '400' }}>Club Members</h1>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
          p={2}
          bgcolor="background.paper"
          borderRadius={8}
        >
          <div>
            <TextField
              label="Search by name"
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                endAdornment: (
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />
          </div>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          boxShadow={1}
          bgcolor="background.paper"
          p={2}
          borderRadius={8}
        >
          <StyledTable>
          <TableHead>
    <TableRow>
      <TableCell align="left">
        <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '20px', fontWeight: '400' }}>Name</span>
      </TableCell>
      <TableCell align="center">
        <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '20px', fontWeight: '400' }}>Field</span>
      </TableCell>
      <TableCell align="center">
        <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '20px', fontWeight: '400' }}>Role</span>
      </TableCell>
      <TableCell align="center">
        <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '20px', fontWeight: '400' }}>Email</span>
      </TableCell>
      <TableCell align="right">
        <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '20px', fontWeight: '400' }}>Action</span>
      </TableCell>
    </TableRow>
  </TableHead>
            <TableBody>
              {filtredMembers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((membre, index) => (
                  <TableRow key={index}>
                    <TableCell align="left">{membre.Etudiants.nom}</TableCell>
                    <TableCell align="center">{membre.Etudiants.filiere}</TableCell>
                    <TableCell align="center">{membre.role}</TableCell>
                    <TableCell align="left">{membre.Etudiants.email}</TableCell>
                    <TableCell align="right">
                      <IconButton>
                        <Icon color="error">close</Icon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </StyledTable>
        </Box>
        <TablePagination
          sx={{ px: 2 }}
          page={page}
          component="div"
          rowsPerPage={rowsPerPage}
          count={filtredMembers.length}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
          nextIconButtonProps={{ "aria-label": "Next Page" }}
          backIconButtonProps={{ "aria-label": "Previous Page" }}
        />
      </Box>
    );
  };
  
  export default GestionMembers;
  