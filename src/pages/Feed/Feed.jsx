import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { projectSelector, fetchProjects } from "../../slices/project.slice";
import Layout from "../../components/Layout/Layout";
import Project from "../../components/Project/Project";
import HomeIcon from "@mui/icons-material/Home";
import { FiEdit } from "react-icons/fi";
import { CircularProgress } from "@mui/material";
import "./Feed.css";

const Feed = () => {
  const dispatch = useDispatch();
  const { allProjects, projectsLoading, projectsError } =
    useSelector(projectSelector);

  useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  return (
    <Layout>
      {projectsLoading && (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "5rem",
          }}
        >
          <CircularProgress color="primary" size="5rem" />
        </div>
      )}
      <>
        <div className="feed-header">
          <HomeIcon />
          &nbsp;&nbsp;
          <span>Feed</span>
        </div>
        <button className="new-project-btn">
          <span>
            <FiEdit style={{ height: "1.2rem", width: "1.2rem" }} />
          </span>
          <span>&nbsp;&nbsp;New Project</span>
        </button>
        <div className="feed-content">
          <>
            {allProjects.map(
              ({
                author,
                projectName,
                details,
                tags,
                code,
                live,
                image,
                createdAt,
                _id,
              }) => (
                <Project
                  author={author}
                  projectName={projectName}
                  details={details}
                  tags={tags}
                  code={code}
                  live={live}
                  image={image}
                  createdAt={createdAt}
                  id={_id}
                  key={_id}
                />
              )
            )}
          </>
        </div>
      </>
    </Layout>
  );
};

export default Feed;
