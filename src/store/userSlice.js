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

export const fetchDeleteUsers = createAsyncThunk(
  "delete/deleteUsers",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      dispatch(deleteUsers(id));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUsersEdit = createAsyncThunk(
  "edit/fetchUsersEdit",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users`,
        {
          method: "PUT",
        }
      );

      if (!response.ok) {
        throw new Error("Can't add task. Server error");
      }

      dispatch(editSpecialUser(data));
    } catch (error) {
      return rejectWithValue("Something went wrong");
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

    editSpecialUser: (state, action) => {
      state.specialUsers = state.specialUsers.map((el) =>
        el.id === action.payload.id ? action.payload : el
      );
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

export const {
  addSpecialUser,
  editSpecialUser,
  deleteUsers,
  deleteSpecialUser,
} = usersSlice.actions;
export default usersSlice.reducer;
