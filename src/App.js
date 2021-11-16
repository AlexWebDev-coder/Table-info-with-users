/** @format */

import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "./store/userSlice";

import { TableInfo } from "./components/Table";

import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

const App = () => {
  const { users } = useSelector((state) => state);
  const [data, setData] = useState(users.users);
  const [order, setOrder] = useState("asc");

  // get async users
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const dispatch = useDispatch();

  // Sorting function
  const sortArray = (type) => {
    if (order === "asc") {
      const sorting = [...data].sort((a, b) => (a[type] > b[type] ? 1 : -1));
      setData(sorting);
      setOrder("desc");
    } else if (order === "desc") {
      const sorting = [...data].sort((a, b) => (a[type] < b[type] ? 1 : -1));
      setData(sorting);
      setOrder("asc");
    } else return;
  };

  return (
    <div className="table">
      {users.status === "loading" ? (
        <Backdrop className="backdrop" open>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : null}

      <TableInfo
        users={users.users}
        error={users.error}
        data={data}
        order={order}
        setData={setData}
        sortArray={sortArray}
      />
    </div>
  );
};

export { App };
