import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signup: (state, { payload }) => {},
    login: (state, { payload }) => {},
  },
});

// actions
export const { signup, login } = authSlice.actions;

// selector
export const authSelector = (state) => state.auth;

// reducer
export const authReducer = authSlice.reducer;

// async functions
const url = "http://localhost:8000";

export function signupFn() {
  return async (dispatch) => {
    dispatch();
  };
}
