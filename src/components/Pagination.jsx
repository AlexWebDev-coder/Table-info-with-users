/** @format */
import React from "react";

import PropTypes from "prop-types";

import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";

const PaginationFC = (props) => {
  const { totalPosts, postsPerPage, setCurrentPage, currentPage } = props;

  return (
    <>
      <Typography>Page: {currentPage}</Typography>
      <Pagination
        count={Math.ceil(totalPosts / postsPerPage)}
        page={currentPage}
        onChange={(_, val) => setCurrentPage(val)}
      />
    </>
  );
};

PaginationFC.propTypes = {
  totalPosts: PropTypes.number.isRequired,
  postsPerPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

export { PaginationFC };
