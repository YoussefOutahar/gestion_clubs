import {
    Box,
    Icon,
    IconButton,
    styled,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Select,
    MenuItem,
    TextField,
  } from "@mui/material";
  import { useState } from "react";
  import SearchIcon from "@mui/icons-material/Search";
  
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
  
  const subscribarList = [
    {
      name: "John Doe",
      date: "18 January, 2019",
      amount: 1000,
      status: "close",
      company: "Club 1",
    },
    {
      name: "Kessy Bryan",
      date: "10 January, 2019",
      amount: 9000,
      status: "open",
      company: "Club 2",
    },
    {
        name: "John Doe",
        date: "18 January, 2019",
        amount: 1000,
        status: "close",
        company: "Club 3",
      },
      {
        name: "Kessy Bryan",
        date: "10 January, 2019",
        amount: 9000,
        status: "open",
        company: "Club 1",
      },
      {
        name: "John Doe",
        date: "18 January, 2019",
        amount: 1000,
        status: "close",
        company: "Club 2",
      },
      {
        name: "Kessy Bryan",
        date: "10 January, 2019",
        amount: 9000,
        status: "open",
        company: "Club 3",
      },
    // Add more subscriber objects here...
  ];
  
  const clubOptions = [
    "All clubs",
    "Club 1",
    "Club 2",
    "Club 3",
    // Add more club options here...
  ];
  
  const PaginationTable = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selectedClub, setSelectedClub] = useState("All clubs");
    const [searchQuery, setSearchQuery] = useState("");
  
    const handleChangePage = (_, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
    const handleClubChange = (event) => {
      setSelectedClub(event.target.value);
      setPage(0);
    };
  
    const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
      setPage(0);
    };
  
    const filteredSubscribers = subscribarList.filter(
      (subscriber) =>
        (selectedClub === "All clubs" || subscriber.company.includes(selectedClub)) &&
        subscriber.name.toLowerCase().includes(searchQuery.toLowerCase())
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
            <span>Select members by club: </span>
            <Select value={selectedClub} onChange={handleClubChange}>
              {clubOptions.map((club, index) => (
                <MenuItem key={index} value={club}>
                  {club}
                </MenuItem>
              ))}
            </Select>
          </div>
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
        <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '20px', fontWeight: '400' }}>Club</span>
      </TableCell>
      <TableCell align="center">
        <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '20px', fontWeight: '400' }}>Start Date</span>
      </TableCell>
      <TableCell align="center">
        <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '20px', fontWeight: '400' }}>Status</span>
      </TableCell>
      <TableCell align="center">
        <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '20px', fontWeight: '400' }}>Amount</span>
      </TableCell>
      <TableCell align="right">
        <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '20px', fontWeight: '400' }}>Action</span>
      </TableCell>
    </TableRow>
  </TableHead>
            <TableBody>
              {filteredSubscribers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((subscriber, index) => (
                  <TableRow key={index}>
                    <TableCell align="left">{subscriber.name}</TableCell>
                    <TableCell align="center">{subscriber.company}</TableCell>
                    <TableCell align="center">{subscriber.date}</TableCell>
                    <TableCell align="center">{subscriber.status}</TableCell>
                    <TableCell align="center">${subscriber.amount}</TableCell>
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
          count={filteredSubscribers.length}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
          nextIconButtonProps={{ "aria-label": "Next Page" }}
          backIconButtonProps={{ "aria-label": "Previous Page" }}
        />
      </Box>
    );
  };
  
  export default PaginationTable;
  