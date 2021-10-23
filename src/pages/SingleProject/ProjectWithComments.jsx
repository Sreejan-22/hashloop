import { useHistory } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import Project from "../../components/Project/Project";
import PageHeader from "../../components/PageHeader/PageHeader";

import "./ProjectWithComments.css";

const SingleProject = () => {
  const history = useHistory();
  const currentProject = history.location.state.project;

  return (
    <Layout>
      <>
        <PageHeader text="Project" />
        <div className="feed-content">
          <Project project={currentProject} />
        </div>
      </>
    </Layout>
  );
};

export default SingleProject;
