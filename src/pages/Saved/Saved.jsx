import { useHistory } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import Project from "../../components/Project/Project";
import { BiArrowBack } from "react-icons/bi";
import "./Saved.css";

const Saved = () => {
  const history = useHistory();

  return (
    <Layout>
      <div className="profile-page-header">
        <BiArrowBack onClick={() => history.goBack()} />
        &nbsp;&nbsp;&nbsp;
        <span>Saved</span>
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

export default Saved;
