/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getUsers = createAsyncThunk(
  "get/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      if (!response.ok) throw new Error("Something went wrong");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  users: [],
  specialUsers: [],
  status: null,
  error: null,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addSpecialUser: (state, action) => {
      state.specialUsers.push(action.payload);
    },

    deleteUsers: (state, action) => {
      state.users = state.users.filter((el) => el.id !== action.payload);
    },
    deleteSpecialUser: (state, action) => {
      state.specialUsers = state.specialUsers.filter(
        (el) => el.id !== action.payload
      );
    },
  },
  extraReducers: {
    [getUsers.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [getUsers.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.users = action.payload;
    },
    [getUsers.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  },
});

export const { addSpecialUser, deleteUsers, deleteSpecialUser } =
  usersSlice.actions;
export default usersSlice.reducer;
