import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  trendingSelector,
  fetchTrendingProjects,
} from "../../slices/trending.slice";
import { CircularProgress } from "@mui/material";
import trending from "../../assets/trending.png";
import profile from "../../assets/profile.png";
import "./Trending.css";
import { notifyError } from "../../utils/notifyToasts";

const Trending = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { trendingProjects, trendingLoading, trendingError } =
    useSelector(trendingSelector);

  useEffect(() => {
    dispatch(fetchTrendingProjects());
  }, [dispatch]);

  if (trendingError) {
    notifyError("An error occurred");
  }

  return (
    <div className="feed-right">
      <input type="text" placeholder="Search" className="search" />
      {trendingLoading && <CircularProgress />}
      {trendingProjects.length && (
        <div className="trending">
          <h5>Trending</h5>
          <>
            {trendingProjects.map((item) => (
              <div
                to={`/projects/${item._id}`}
                className="trending-project"
                key={item._id}
                onClick={() => {
                  const {
                    username,
                    author,
                    projectName,
                    details,
                    tags,
                    code,
                    live,
                    image,
                    createdAt,
                    upvotes,
                    upvoters,
                  } = item;
                  const id = item._id;
                  const project = {
                    username,
                    author,
                    projectName,
                    details,
                    tags,
                    code,
                    live,
                    image,
                    createdAt,
                    upvotes,
                    upvoters,
                    id,
                  };
                  history.push(`/projects/${id}`, { project });
                }}
              >
                <div
                  className={`trending-project-desc ${
                    "image" in item ? "trending-project-desc2" : ""
                  }`}
                >
                  <p>{item.projectName}</p>
                  <h6>by {item.author}</h6>
                </div>
                {"image" in item && (
                  <img
                    src={"image" in item ? item.image : ""}
                    alt=""
                    className="trending-project-img"
                  />
                )}
              </div>
            ))}
          </>
        </div>
      )}
      <div className="follow-suggestions">
        <h5>Follow Suggestions</h5>
        <>
          {[1, 2, 3].map((item, index) => (
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
