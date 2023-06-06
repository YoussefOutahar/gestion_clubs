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
} from "@mui/material";
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


const PaginationTable= ({ MyData, tableHeading }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box width="100%" overflow="auto">
      <StyledTable>
        <TableHead>
          <TableRow>
          {tableHeading.map((heading, index) => (
             <TableCell align="center" key={index}>
             {heading}
           </TableCell>
         ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {MyData
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((data, index) => (
              <TableRow key={index}>
                {Object.values(data).map((value, index) => (
                  <TableCell align="center" key={index}>
                    {value}
                  </TableCell>
                ))}
                {/*<TableCell align="center">{subscriber.Event}</TableCell>
                <TableCell align="center">{subscriber.date}</TableCell>
                <TableCell align="center">{subscriber.Cost}</TableCell>
                <TableCell align="center">{subscriber.Earned}</TableCell>
                <TableCell align="center">{subscriber.supplementary_budget}</TableCell>
                <TableCell align="right">
                  <IconButton>
                    <Icon color="error">close</Icon>
                  </IconButton>
            </TableCell>*/}
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

export default PaginationTable;
