import { useHistory } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import Project from "../../components/Project/Project";
import { BiArrowBack } from "react-icons/bi";

import "./SingleProject.css";

const SingleProject = () => {
  const history = useHistory();
  return (
    <Layout>
      <>
        <div className="profile-page-header">
          <BiArrowBack onClick={() => history.goBack()} />
          &nbsp;&nbsp;&nbsp;
          <span>Project</span>
        </div>
        <div className="feed-content">
          <Project />
        </div>
      </>
    </Layout>
  );
};

export default SingleProject;
