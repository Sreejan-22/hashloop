import { Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import PageHeader from "../../components/PageHeader/PageHeader";
import "./Notifications.css";

const Notifications = () => {
  return (
    <Layout>
      <PageHeader text="Notifications" />
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
