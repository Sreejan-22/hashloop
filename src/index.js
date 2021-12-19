import React from "react";
import ReactDOM from "react-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
// import { authReducer } from "./slices/auth.slice";
import { projectReducer } from "./slices/project.slice";
import { trendingReducer } from "./slices/trending.slice";
import "./index.css";
import App from "./App";

const store = configureStore({
  reducer: {
    project: projectReducer,
    trending: trendingReducer,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <>
        <App />
      </>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
