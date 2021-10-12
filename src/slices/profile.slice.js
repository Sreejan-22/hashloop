import { createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../utils/constants";

// sample user data
/*
profile: {
  profileId: "n3o87fanero3i7df",
  email: "user@gmail.com",
  username: "user123",
  pic: "",
  cover: "",
  bio: "",
  city: "",
  country: "",
  skills: {
    type: [String],
  },
  github: "",
  twitter: "",
  linkedin: "",
  portfolio: "",
  followers: "",
  following: "",
}
*/

export const initialState = {
  profile: null,
  profileLoading: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
});

// actions
export const {} = profileSlice.actions;

// selector
export const profileSelector = (state) => state.profile;

// reducer
export const profileReducer = profileSlice.reducer;

// // async functions
// const url = "http://localhost:8000";

// export function signupFn() {
//   return async (dispatch) => {
//     dispatch();
//   };
// }
