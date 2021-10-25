import { useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  projectSelector,
  fetchProjectsWithTag,
  makeProjectsWithTagNull,
} from "../../slices/project.slice";
import { CircularProgress } from "@mui/material";
import Layout from "../../components/Layout/Layout";
import Project from "../../components/Project/Project";
import PageHeader from "../../components/PageHeader/PageHeader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ExploreAll.css";
import { allTags } from "../../utils/constants";

const ExploreAll = () => {
  // const [show, setShow] = useState("trending");
  const [currentTag, setCurrentTag] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const { projectsWithTag, projectsWithTagLoading } =
    useSelector(projectSelector);

  const showProjectsWithTag = (tag) => {
    setCurrentTag(tag);
    dispatch(fetchProjectsWithTag(tag));
  };

  return (
    <Layout>
      <PageHeader text="Explore" />
      {/* <div className="tags-sticky-wrapper"> */}
      <div className="tags-wrapper">
        <div className="tags-container">
          <h5>Tags</h5>
          <div className="profile-tags explore-tags">
            {allTags.map((item, index) => (
              <button
                className="profile-tag"
                key={`tag-${index}`}
                onClick={() => showProjectsWithTag(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        {/* <div className="topic-projects">
          <p
            className={show === "trending" ? "selected" : ""}
            onClick={() => setShow("trending")}
          >
            Trending Projects
          </p>
          <div className="topic-projects-space"></div>
          <p
            className={show === "new" ? "selected" : ""}
            onClick={() => setShow("new")}
          >
            New Projects
          </p>
        </div> */}
        {currentTag.length ? (
          <div style={{ marginBottom: "1rem", textAlign: "center" }}>
            Projects with tag "{currentTag}"
          </div>
        ) : null}
      </div>
      {/* </div> */}
      {/* <div className="feed-content">
        <>
          {[1, 2].map((item) => (
            <Project />
          ))}
        </>
      </div> */}
      <div className="feed-content">
        {projectsWithTagLoading ? (
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
          <>
            {projectsWithTag === null ? null : projectsWithTag.length ? (
              projectsWithTag.map((item) => (
                <Project project={item} key={item._id} />
              ))
            ) : (
              <div>Currently there are no projects with this tag</div>
            )}
          </>
        )}
      </div>
      <ToastContainer />
    </Layout>
  );
};

export default ExploreAll;
