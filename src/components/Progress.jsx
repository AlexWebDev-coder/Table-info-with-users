/** @format */

import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

export default function () {
  return (
    <Backdrop className="backdrop" open>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
