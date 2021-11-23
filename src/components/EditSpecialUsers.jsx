/** @format */

import React, { useState } from "react";

import { useDispatch } from "react-redux";

import { fetchUsersEdit } from "../store/userSlice";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import IconButton from "@mui/material/IconButton";

const EditSpecialUsers = (element) => {
  const { props } = element;

  const [data, setData] = useState(props);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleEdit = () => {
    fetchUsersEdit(data);
    handleClose();
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  console.log(data);
  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <ModeEditOutlinedIcon color="info" />
      </IconButton>
      <Dialog open={open}>
        <DialogTitle>Edit this user</DialogTitle>
        <DialogContent className="editUsers">
          <TextField
            name="name"
            autoFocus
            margin="dense"
            value={data.name}
            label="User name"
            onChange={(e) => handleChange(e)}
          />
          <TextField
            name="suite"
            margin="dense"
            value={data.suite}
            label="Address"
            onChange={(e) => handleChange(e)}
          />
          <TextField
            name="phone"
            margin="dense"
            value={data.phone}
            label="Phone"
            onChange={(e) => handleChange(e)}
          />
          <TextField
            name="website"
            margin="dense"
            value={data.website}
            label="Website"
            onChange={(e) => handleChange(e)}
          />
          <TextField
            name="company"
            margin="dense"
            value={data.company.suite ? data.company.suite : data.suite}
            label="Company name"
            onChange={(e) => handleChange(e)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="warning">
            Cancel
          </Button>
          <Button onClick={handleEdit}>Edit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export { EditSpecialUsers };
