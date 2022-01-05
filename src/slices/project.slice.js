import { createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../utils/constants";
import { notifyError } from "../utils/notifyToasts";

const initialState = {
  allProjects: [],
  currentProjects: [],
  projectsLoading: false,
  projectsError: false,
  userProjects: [],
  userProjectsLoading: false,
  userProjectsError: false,
  upvoteError: false,
  projectsWithTag: null,
  projectsWithTagLoading: false,
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
      state.currentProjects = payload;
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
      state.currentProjects = payload;
      state.userProjectsError = false;
      state.userProjectsLoading = false;
    },
    getUserProjectsFailure: (state) => {
      state.userProjectsError = true;
      state.userProjectsLoading = false;
    },
    updateUpvoteCount: (state, { payload }) => {
      let projectIndex;
      let project;
      state.currentProjects.forEach((item, index) => {
        if (item._id === payload.id) {
          projectIndex = index;
          project = item;
        }
      });
      project.upvotes = payload.newCount;
      project.upvoters = payload.newUpvotersList;
      state.currentProjects[projectIndex] = project;
    },
    setUpvoteError: (state, { payload }) => {
      state.upvoteError = payload;
    },
    loadProjectsWithTag: (state) => {
      state.projectsWithTagLoading = true;
    },
    getProjectsWithTagSuccess: (state, { payload }) => {
      state.projectsWithTag = payload;
      state.currentProjects = payload;
      state.projectsWithTagLoading = false;
    },
    getProjectsWithTagFailure: (state) => {
      state.projectsWithTagLoading = false;
    },
    makeProjectsWithTagNull: (state) => {
      state.projectsWithTag = null;
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
  updateUpvoteCount,
  loadProjectsWithTag,
  getProjectsWithTagSuccess,
  getProjectsWithTagFailure,
  makeProjectsWithTagNull,
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

export function fetchProjectsWithTag(tag) {
  return async (dispatch) => {
    dispatch(loadProjectsWithTag());

    try {
      const res = await fetch(`${baseUrl}/tags/${tag}`);
      const data = await res.json();

      if (data.success) {
        dispatch(getProjectsWithTagSuccess(data.projects));
      } else {
        dispatch(getProjectsWithTagFailure());
        notifyError("Failed to fetch projects with this tag");
      }
    } catch (err) {
      dispatch(getProjectsWithTagFailure());
      notifyError("Failed to fetch projects with this tag");
    }
  };
}

// export async function updateUpvoteCountDB(id, token, newCount, newUpvoterList) {
//   return async (dispatch) => {
//     try {
//       const res = await fetch(`${baseUrl}/upvotes/${id}`, {
//         method: "PUT",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           newCount,
//           newUpvoterList,
//         }),
//       });
//       const data = await res.json();
//       if (!data.success) {
//         dispatch(setUpvoteError(true))
//       }
//     } catch (err) {
//       dispatch(setUpvoteError(true));
//     }
//   };
// }
