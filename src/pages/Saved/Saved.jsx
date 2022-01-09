import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  projectSelector,
  fetchSavedProjects,
} from "../../slices/project.slice";
import Layout from "../../components/Layout/Layout";
import Project from "../../components/Project/Project";
import PageHeader from "../../components/PageHeader/PageHeader";
import {} from "react-toastify";

import "./Saved.css";
import { CircularProgress } from "@mui/material";

const Saved = () => {
  const dispatch = useDispatch();
  const { currentProjects, projectsLoading } = useSelector(projectSelector);

  useEffect(() => {
    dispatch(fetchSavedProjects());
  }, [dispatch]);

  return (
    <Layout>
      <PageHeader text="Saved" />
      {projectsLoading ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CircularProgress color="primary" />
        </div>
      ) : (
        <div className="feed-content">
          <>
            {currentProjects.length ? (
              currentProjects.map((item) => (
                <Project key={item._id} project={item} />
              ))
            ) : (
              <h3 style={{ marginTop: "2rem", textAlign: "center" }}>
                You haven't bookmarked anything on Hashloop yet!
              </h3>
            )}
          </>
        </div>
      )}
    </Layout>
  );
};

export default Saved;
