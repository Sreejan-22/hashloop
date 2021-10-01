import { useHistory, Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { BiArrowBack } from "react-icons/bi";
import "./Notifications.css";

const Notifications = () => {
  const history = useHistory();

  return (
    <Layout>
      <div className="profile-page-header">
        <BiArrowBack onClick={() => history.goBack()} />
        &nbsp;&nbsp;&nbsp;
        <span>Notifications</span>
      </div>
      <div className="notifs-container">
        <div className="notif">
          <b>
            <Link to="/profile">Mahesh Sharma</Link>
          </b>{" "}
          &nbsp; started following you
        </div>
        <div className="notif">
          <b>
            <Link to="/profile">Mahesh Sharma</Link>
          </b>{" "}
          &nbsp; upvoted your project
        </div>
        <div className="notif">
          <b>
            <Link to="/profile">Mahesh Sharma</Link>
          </b>{" "}
          &nbsp; started following you
        </div>
      </div>
    </Layout>
  );
};

export default Notifications;
