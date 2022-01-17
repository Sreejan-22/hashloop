import { createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../utils/constants";
import { getUser } from "../utils/auth";
import { notifyError, notifySuccess } from "../utils/notifyToasts";

const initialState = {
  savedProjects: [],
  loading: false,
  error: false,
};

const savedSlice = createSlice({
  initialState,
  name: "saved",
  reducers: {
    loadSavedProjects: (state) => {
      state.loading = true;
    },
    getSavedProjectsSuccess: (state, { payload }) => {
      state.savedProjects = payload;
      state.loading = false;
      state.error = false;
    },
    getSavedProjectsFailure: (state) => {
      state.error = false;
      state.loading = false;
    },
  },
});

// actions
export const {
  loadSavedProjects,
  getSavedProjectsSuccess,
  getSavedProjectsFailure,
} = savedSlice.actions;

// selector
export const savedSelector = (state) => state.saved;

// reducer
export const savedReducer = savedSlice.reducer;

// async functions

// get saved projects
export function fetchSavedProjects() {
  return async (dispatch) => {
    dispatch(loadSavedProjects());

    try {
      const res = await fetch(`${baseUrl}/saved/${getUser().username}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getUser().token}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        dispatch(getSavedProjectsSuccess(data.savedProjects));
      } else {
        dispatch(getSavedProjectsFailure());
        notifyError("Failed to fetch bookmarked projects");
      }
    } catch (err) {
      dispatch(getSavedProjectsFailure());
      notifyError("Failed to fetch bookmarked projects");
    }
  };
}

// save a project
export function saveProject(projectId, username) {
  return async (dispatch) => {
    try {
      const res = await fetch(`${baseUrl}/saved/${projectId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getUser().token}`,
        },
        body: JSON.stringify({
          username,
        }),
      });
      const data = await res.json();
      if (data.success) {
        notifySuccess("Project bookmarked");
      } else {
        notifyError("Failed to bookmark project");
      }
    } catch (err) {
      notifyError("Failed to bookmark project");
    }
  };
}
