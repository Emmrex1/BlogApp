// import { createSlice } from "@reduxjs/toolkit";

// // Check if token exists in cookies
// export const isTokenPresentInCookies = () => {
//   const token = document.cookie
//     .split(";")
//     .find(cookie => cookie.trim().startsWith("token="));
//   return !!token;
// };

// // Load user from localStorage
// const loadUserFromLocalStorage = () => {
//   try {
//     const serializedState = localStorage.getItem("user");
//     if (serializedState === null) {
//       return { user: null };
//     }
//     return { user: JSON.parse(serializedState) };
//   } catch (error) {
//     return { user: null };
//   }
// };

// const initialState = loadUserFromLocalStorage();

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setUser: (state, action) => {
//       state.user = action.payload.user;
//       localStorage.setItem("user", JSON.stringify(state.user));
//     },
//     logout: (state) => {
//       state.user = null;
//       localStorage.removeItem("user");
//     },
//   },
// });

// export const { setUser, logout } = authSlice.actions;

// export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

// Check if token exists in cookies
export const isTokenPresentInCookies = () => {
  const token = document.cookie
    .split(";")
    .find(cookie => cookie.trim().startsWith("token="));
  return !!token;
};

// Load user from localStorage
const loadUserFromLocalStorage = () => {
  try {
    const serializedUser = localStorage.getItem("user");
    if (serializedUser === null) {
      return {
        user: null,
        isAuthenticated: false,
      };
    }

    return {
      user: JSON.parse(serializedUser),
      isAuthenticated: true,
    };
  } catch (error) {
    return {
      user: null,
      isAuthenticated: false,
    };
  }
};

const initialState = loadUserFromLocalStorage();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
