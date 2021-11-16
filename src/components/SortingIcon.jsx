/** @format */

import React from "react";

import PropTypes from "prop-types";

import IconButton from "@mui/material/IconButton";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";

const SortingIcon = ({ order }) => {
  return (
    <>
      {order === "asc" ? (
        <IconButton>
          <ArrowCircleDownIcon />
        </IconButton>
      ) : (
        <IconButton>
          <ArrowCircleUpIcon />
        </IconButton>
      )}
    </>
  );
};

SortingIcon.propTypes = {
  order: PropTypes.string.isRequired,
};

export { SortingIcon };
