/** @format */

import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { EditSpecialUsers } from "./EditSpecialUsers";

import { useNavigate } from "react-router";

import { deleteSpecialUser } from "../store/userSlice";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import IconButton from "@mui/material/IconButton";

const SpecialUsers = () => {
  const { specialUsers } = useSelector((state) => state.users);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBack = () => {
    navigate("/");
  };

  const handleDeleteUser = (el) => {
    dispatch(deleteSpecialUser(el.id));
  };

  return (
    <Container sx={{ mt: 5 }}>
      {specialUsers.length === 0 ? (
        <Typography variant="h4">No special users</Typography>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="left">User name</TableCell>
                  <TableCell align="left">Address</TableCell>
                  <TableCell align="left">Phone</TableCell>
                  <TableCell align="left">Website</TableCell>
                  <TableCell align="left">Company name</TableCell>
                  <TableCell align="left">Edit</TableCell>
                  <TableCell align="left">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {specialUsers.map((el) => (
                  <TableRow key={el.id}>
                    <TableCell>{el.id}</TableCell>
                    <TableCell align="left">{el.name}</TableCell>
                    <TableCell align="left">{el.address.suite}</TableCell>
                    <TableCell align="left">{el.phone}</TableCell>
                    <TableCell align="left">{el.website}</TableCell>
                    <TableCell align="left">{el.company.name}</TableCell>
                    <TableCell align="left">
                      <EditSpecialUsers element={el} />
                    </TableCell>
                    <TableCell align="left">
                      <IconButton>
                        <HighlightOffRoundedIcon
                          color="error"
                          onClick={() => handleDeleteUser(el)}
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
      <Button
        sx={{ mt: 3 }}
        size="small"
        variant="outlined"
        onClick={handleBack}
      >
        Back
      </Button>
    </Container>
  );
};

export { SpecialUsers };
