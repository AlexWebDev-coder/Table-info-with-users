/** @format */

import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import {
  addSpecialUser,
  deleteUsers,
  fetchDeleteUsers,
} from "../store/userSlice";

import { useNavigate } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import IconButton from "@mui/material/IconButton";

import { SortingIcon } from "./SortingIcon";
import { PaginationFC } from "./Pagination";

const TableInfo = (props) => {
  const { users, error, data, order, setData, sortArray } = props;
  const { specialUsers } = useSelector((state) => state.users);

  const dispatch = useDispatch();
  let navigate = useNavigate();

  // render list array
  useEffect(() => setData(users), [users]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);
  const totalPosts = data.length;

  const handleAdd = (user) => {
    dispatch(addSpecialUser(user));
  };

  const handleDelete = (user) => {
    dispatch(deleteUsers(user.id));
    // fetchDeleteUsers(user.id);
    console.log(users);
  };

  const navigateSpecialUser = () => navigate("/specialUsers");

  return (
    <>
      <Box className="pagination">
        <PaginationFC
          data={data}
          totalPosts={totalPosts}
          postsPerPage={postsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <Box>
          <IconButton onClick={navigateSpecialUser}>
            <AddShoppingCartIcon color="info" />
          </IconButton>
          <span className="badge" id="lblCartCount">
            {specialUsers.length}
          </span>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell onClick={() => sortArray("id")}>
                ID
                <SortingIcon order={order} />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="left" onClick={() => sortArray("username")}>
                User Name
                <SortingIcon order={order} />
              </TableCell>
              <TableCell align="left">Phone</TableCell>
              <TableCell align="left" onClick={() => sortArray("email")}>
                E-mail
                <SortingIcon order={order} />
              </TableCell>
              <TableCell align="left" onClick={() => sortArray("website")}>
                Website
                <SortingIcon order={order} />
              </TableCell>
              <TableCell align="left">Company name</TableCell>

              <TableCell align="left">Add</TableCell>
              <TableCell align="left">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPosts &&
              currentPosts.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell align="left">{user.username}</TableCell>
                  <TableCell align="left">{user.phone}</TableCell>
                  <TableCell align="left">{user.email}</TableCell>
                  <TableCell align="left">{user.website}</TableCell>
                  <TableCell align="left">{user.company.name}</TableCell>
                  <TableCell align="left">
                    <IconButton>
                      <AddCircleOutlineIcon
                        color="info"
                        onClick={() => handleAdd(user)}
                      />
                    </IconButton>
                  </TableCell>
                  <TableCell align="left">
                    <IconButton>
                      <HighlightOffRoundedIcon
                        color="error"
                        onClick={() => handleDelete(user)}
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        {error && (
          <Typography variant="h4" sx={{ m: 2 }}>
            {error}
          </Typography>
        )}
      </TableContainer>
    </>
  );
};

TableInfo.propTypes = {
  users: PropTypes.array.isRequired,
  error: PropTypes.string,
  data: PropTypes.array.isRequired,
  order: PropTypes.string.isRequired,
  setData: PropTypes.func.isRequired,
  sortArray: PropTypes.func.isRequired,
};

TableInfo.defaultProps = {
  users: [],
  currentPosts: [],
};

export { TableInfo };
