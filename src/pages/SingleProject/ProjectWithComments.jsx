import Layout from "../../components/Layout/Layout";
import Project from "../../components/Project/Project";
import PageHeader from "../../components/PageHeader/PageHeader";

import "./ProjectWithComments.css";

const SingleProject = () => {
  return (
    <Layout>
      <>
        <PageHeader text="Project" />
        <div className="feed-content">
          <Project />
        </div>
      </>
    </Layout>
  );
};

export default SingleProject;
