import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  trendingSelector,
  fetchTrendingProjects,
} from "../../slices/trending.slice";
import Search from "../Search/Search";
import { CircularProgress } from "@mui/material";
import {} from "react-toastify";

import "./Trending.css";
import { notifyError } from "../../utils/notifyToasts";
import { isAuthenticated, getUser } from "../../utils/auth";
import { doesPropertyExist } from "../../utils/doesPropertyExist";

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
      <Search />
      {trendingLoading ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            // marginTop: "5rem",
          }}
        >
          <CircularProgress size="2rem" />
        </div>
      ) : trendingProjects.length ? (
        <div className="trending">
          <h5>Trending</h5>
          <>
            {[...new Set(trendingProjects)].map((item) => (
              <div
                to={`/projects/${item._id}`}
                className="trending-project"
                key={item._id}
                onClick={() => {
                  history.push(`/projects/${item._id}`, { project: item });
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
      ) : null}
      <div className="follow-suggestions">
        <h5>Profile Suggestions</h5>
        <>
          {trendingProjects.length
            ? trendingProjects.map((item, index) => {
                if (isAuthenticated() && item.username === getUser().username) {
                  return null;
                } else {
                  return (
                    <div
                      className="follow-profile-container"
                      key={`follow-${index}`}
                    >
                      <Link
                        to={`/profile/${item.username}`}
                        className="follow-profile"
                      >
                        <img
                          src={
                            doesPropertyExist("pic", item.authorId)
                              ? item.authorId.pic
                              : "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
                          }
                          alt=""
                          className="follow-profile-img"
                        />
                        <span>{item.author}</span>
                      </Link>
                      <Link
                        to={`/profile/${item.username}`}
                        className="view-profile-btn"
                      >
                        view profile
                      </Link>
                    </div>
                  );
                }
              })
            : null}
        </>
      </div>
    </div>
  );
};

export default Trending;
