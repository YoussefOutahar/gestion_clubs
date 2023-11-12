import {Box,styled,Table,TableBody,TableCell,TableHead,TablePagination,TableRow,} from "@mui/material";
import { useState } from "react";
  
  const StyledTable = styled(Table)(() => ({
    whiteSpace: "pre",
    "& thead": {
      "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
    },
    "& tbody": {
      "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
    },
  }));
  
  
  const ChargesTable= ({ MyData}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
  
    const handleChangePage = (_, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const formatDate = (timestamp) => {
      const date = new Date(timestamp);
      return date.toLocaleDateString();
    };
  
    return (
      <Box width="100%" overflow="auto">
        <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell align="center">Event Name</TableCell>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Cost</TableCell>
            <TableCell align="center">Earned</TableCell>
            <TableCell align="center">Supplimentary budget</TableCell>
          </TableRow>
        </TableHead>
          <TableBody>
            {MyData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((data, index) => (
                <TableRow key={index}>
                <TableCell align="center">{data.name}</TableCell>
                <TableCell align="center">{formatDate(data.Date)}</TableCell>
                <TableCell align="center">{data.cost}</TableCell>
                <TableCell align="center">{data.earnings}</TableCell>
                <TableCell align="center">{data.supp_budget}</TableCell>
              </TableRow>
              ))}
          </TableBody>
        </StyledTable>
  
        <TablePagination
          sx={{ px: 2 }}
          page={page}
          component="div"
          rowsPerPage={rowsPerPage}
          count={MyData.length}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
          nextIconButtonProps={{ "aria-label": "Next Page" }}
          backIconButtonProps={{ "aria-label": "Previous Page" }}
        />
      </Box>
    );
  };
  
  export default ChargesTable;
  