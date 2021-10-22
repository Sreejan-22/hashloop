import { createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../utils/constants";

const initialState = {
  trendingProjects: [],
  trendingLoading: false,
  trendingError: false,
};

const trendingSlice = createSlice({
  name: "trending",
  initialState,
  reducers: {
    loadTrendingProjects: (state) => {
      state.trendingLoading = true;
    },
    getTrendingProjectsSuccess: (state, { payload }) => {
      state.trendingProjects = payload;
      state.trendingLoading = false;
      state.trendingError = false;
    },
    getTrendingProjectsFailure: (state) => {
      state.trendingLoading = false;
      state.trendingError = true;
    },
  },
});

// actions
export const {
  loadTrendingProjects,
  getTrendingProjectsSuccess,
  getTrendingProjectsFailure,
} = trendingSlice.actions;

// selector
export const trendingSelector = (state) => state.trending;

// reducer
export const trendingReducer = trendingSlice.reducer;

// async functions
export function fetchTrendingProjects() {
  return async (dispatch) => {
    dispatch(loadTrendingProjects());

    try {
      const res = await fetch(`${baseUrl}/trending`);
      const data = await res.json();
      if (data.success) {
        dispatch(getTrendingProjectsSuccess(data.trendingProjects));
      } else {
        dispatch(getTrendingProjectsFailure());
      }
    } catch (err) {
      dispatch(getTrendingProjectsFailure());
    }
  };
}
