import { useState } from "react";
import { compareDate } from "../utils.js"
import Badge from "./Badge.js";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

// columns for the table
const columns = [
  { id: "name", label: "Name" },
  { id: "vaccine_date", label: "Vaccination Date" },
  { id: "vaccine_status", label: "Vaccination Status" },
];

export default function StyledTable({ rows, currentDate }) {
  // State vatiables and handlers for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value);
    setPage(0);
  };

  /*
    To get the badgeColor based on the person.vaccination_date
    If person.vaccination_date <= currentDate -> GREEN else -> RED
  */
  const getBadgeColor = (date) => {
    return  compareDate(date, currentDate) ? "#00b300" : "#ff6666";
  };

  // Iterate over the rows and if the column is vaccination_status render a badge else render text.
  return (
    <Paper className="table-paper">
          <TableContainer className="table-container">
            <Table stickyHeader className="table-content" aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id} >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((person) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={person.person_id}
                      >
                        <TableCell>{person.person_name}</TableCell>
                        <TableCell>{person.vaccination_date}</TableCell>
                        <TableCell>
                          <Badge 
                            label={compareDate(person.vaccination_date, currentDate) ? "Vaccine Done" : "Vaccine Pending"}
                            bgColor={getBadgeColor(person.vaccination_date)}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
  );
}
