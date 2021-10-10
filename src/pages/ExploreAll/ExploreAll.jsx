import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import Project from "../../components/Project/Project";
import PageHeader from "../../components/PageHeader/PageHeader";
import "./ExploreAll.css";

const tags = [
  "HTML",
  "CSS",
  "Javascript",
  "React",
  "Node",
  "MongoDB",
  "HTML",
  "CSS",
  "Javascript",
  "React",
  "Node",
  "MongoDB",
  "HTML",
  "CSS",
  "Javascript",
  "React",
  "Node",
  "MongoDB",
];

const ExploreAll = () => {
  const [show, setShow] = useState("trending");

  return (
    <Layout>
      <PageHeader text="Explore" />
      <div className="tags-wrapper">
        <div className="tags-container">
          <h5>Tags</h5>
          <div className="profile-tags explore-tags">
            {tags.map((item, index) => (
              <button className="profile-tag" key={`tag-${index}`}>
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="topic-projects">
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
        </div>
      </div>
      <div className="feed-content">
        <>
          {[1, 2].map((item) => (
            <Project />
          ))}
        </>
      </div>
    </Layout>
  );
};

export default ExploreAll;
