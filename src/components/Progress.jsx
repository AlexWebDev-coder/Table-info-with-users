/** @format */

import React from "react";

import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

const Progress = (props) => {
  const { users } = props;

  const getUsersStatus = users.status === "loading";

  return (
    <>
      {getUsersStatus ? (
        <Backdrop className="backdrop" open>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : null}
    </>
  );
};

export { Progress };
