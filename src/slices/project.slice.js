import { createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../utils/constants";

const initialState = {
  allProjects: [],
  projectsLoading: false,
  projectsError: false,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    loadProjects: (state) => {
      state.projectsLoading = true;
    },
    getProjectsSuccess: (state, { payload }) => {
      state.allProjects = payload;
      state.projectsError = false;
      state.projectsLoading = false;
    },
    getProjectsFailure: (state) => {
      state.projectsError = true;
      state.projectsLoading = false;
    },
  },
});

// actions
export const { fetchProjects } = projectSlice.actions;

// selector
export const projectSelector = (state) => state.project;

// reducer
export const projectReducer = projectSlice.reducer;

// async functions
export function fetchProjects() {
  return async (dispatch) => {
    dispatch(loadProjects());

    try {
      const res = await fetch(`${baseUrl}/projects`);
      let data = await res.json();
      dispatch(getProjectsSuccess(data));
    } catch (err) {
      dispatch(getProjectsFailure());
    }
  };
}
