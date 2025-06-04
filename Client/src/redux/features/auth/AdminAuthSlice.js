// src/redux/features/auth/adminAuthSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Load from localStorage (if available)
const adminData = JSON.parse(localStorage.getItem("adminAuth"));

const initialState = {
  admin: adminData?.admin || null,
  token: adminData?.token || null,
};

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.admin = action.payload.admin;
      state.token = action.payload.token;
      localStorage.setItem(
        "adminAuth",
        JSON.stringify({ admin: action.payload.admin, token: action.payload.token })
      );
    },
    logoutAdmin : (state) => {
      state.admin = null;
      state.token = null;
      localStorage.removeItem("adminAuth");
    },
  },
});

export const { setAdmin, logoutAdmin  } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
