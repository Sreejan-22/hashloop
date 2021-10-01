import { Link } from "react-router-dom";
import trending from "../../assets/trending.png";
import profile from "../../assets/profile.png";
import "./Trending.css";

const Trending = () => {
  return (
    <div className="feed-right">
      <input type="text" placeholder="Search" className="search" />
      <div className="trending">
        <h5>Trending</h5>
        <>
          {[1, 2, 3, 4].map((item, index) => (
            <div className="trending-project" key={`trending-${index}`}>
              <div className="trending-project-desc">
                <p>A better Twitter</p>
                <h6>by Rahul Mehra</h6>
              </div>
              <img src={trending} alt="" className="trending-project-img" />
            </div>
          ))}
        </>
      </div>
      <div className="follow-suggestions">
        <h5>Follow Suggestions</h5>
        <>
          {[1, 2, 3, 4].map((item, index) => (
            <div className="follow-profile-container" key={`follow-${index}`}>
              <Link to="/profile" className="follow-profile">
                <img src={profile} alt="" className="follow-profile-img" />
                <span>Mahesh Sharma</span>
              </Link>
              <button className="follow-btn">Follow</button>
            </div>
          ))}
        </>
      </div>
    </div>
  );
};

export default Trending;
