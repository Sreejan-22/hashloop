import { createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../utils/constants";

const initialState = {
  allProjects: [],
  projectsLoading: false,
  projectsError: false,
  userProjects: [],
  userProjectsLoading: false,
  userProjectsError: false,
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
    loadUserProjects: (state) => {
      state.userProjectsLoading = true;
    },
    getUserProjectsSuccess: (state, { payload }) => {
      state.userProjects = payload;
      state.userProjectsError = false;
      state.userProjectsLoading = false;
    },
    getUserProjectsFailure: (state) => {
      state.userProjectsError = true;
      state.userProjectsLoading = false;
    },
  },
});

// actions
export const {
  loadProjects,
  getProjectsSuccess,
  getProjectsFailure,
  loadUserProjects,
  getUserProjectsSuccess,
  getUserProjectsFailure,
} = projectSlice.actions;

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
      if (data.success) {
        dispatch(getProjectsSuccess(data.projects));
      } else {
        throw data.message;
      }
    } catch (err) {
      dispatch(getProjectsFailure());
    }
  };
}

export function fetchProjectsOfUser(username) {
  return async (dispatch) => {
    dispatch(loadProjects());

    try {
      const res = await fetch(`${baseUrl}/projects/${username}`);
      let data = await res.json();
      if (data.success) {
        dispatch(getUserProjectsSuccess(data.projects));
      } else {
        throw data.message;
      }
    } catch (err) {
      dispatch(getUserProjectsFailure());
    }
  };
}
