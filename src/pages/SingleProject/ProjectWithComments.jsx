import { useHistory } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import Project from "../../components/Project/Project";
import PageHeader from "../../components/PageHeader/PageHeader";

import "./ProjectWithComments.css";

const SingleProject = () => {
  const history = useHistory();
  const currentProject = history.location.state.project;
  console.log(currentProject);

  return (
    <Layout>
      <>
        <PageHeader text="Project" />
        <div className="feed-content">
          <Project {...currentProject} />
        </div>
      </>
    </Layout>
  );
};

export default SingleProject;
