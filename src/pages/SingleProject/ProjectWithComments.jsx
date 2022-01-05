import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { projectSelector, fetchProjects } from "../../slices/project.slice";
import Layout from "../../components/Layout/Layout";
import Project from "../../components/Project/Project";
import PageHeader from "../../components/PageHeader/PageHeader";
import { CircularProgress } from "@mui/material";
import "./ProjectWithComments.css";

const SingleProject = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { currentProjects, projectsLoading } = useSelector(projectSelector);
  const project = currentProjects.find(
    (item) => item._id === history.location.pathname.slice(10)
  );

  useEffect(() => {
    dispatch(fetchProjects());
  }, [history.location.pathname, dispatch]);

  return (
    <Layout>
      <>
        <PageHeader text="Project" />
        {project === undefined || projectsLoading ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "5rem",
            }}
          >
            <CircularProgress color="primary" />
          </div>
        ) : (
          <div className="feed-content">
            <Project project={project} />
          </div>
        )}
      </>
    </Layout>
  );
};

export default SingleProject;
