import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  trendingSelector,
  fetchTrendingProjects,
} from "../../slices/trending.slice";
import { CircularProgress } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import profile from "../../assets/profile.png";
import "./Trending.css";
import { notifyError } from "../../utils/notifyToasts";
import { baseUrl } from "../../utils/constants";

const Trending = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [focus, setFocus] = useState(false);
  const [searchProfiles, setSearchProfiles] = useState([]);
  const { trendingProjects, trendingLoading, trendingError } =
    useSelector(trendingSelector);

  useEffect(() => {
    dispatch(fetchTrendingProjects());
  }, [dispatch]);

  if (trendingError) {
    notifyError("An error occurred");
  }

  const search = async (query) => {
    try {
      const res = await fetch(`${baseUrl}/search?name=${query}`);
      const data = await res.json();
      if (data.success) {
        setSearchProfiles(data.profilesFound);
      } else {
        notifyError("Failed to fetch search results");
      }
    } catch (err) {
      notifyError("Failed to fetch search results");
    }
  };

  let debounceTimeout = 0;

  const handleSearch = async (e) => {
    const query = e.target.value;
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    if (!query.length) {
      setSearchProfiles([]);
      return;
    }

    debounceTimeout = setTimeout(() => {
      search(query);
    }, 300);
  };

  return (
    <div className="feed-right">
      <input
        type="text"
        placeholder="Search developers"
        className="search"
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={handleSearch}
      />
      {focus && (
        <div className="search-results">
          {searchProfiles.length > 0
            ? searchProfiles.map((item) => {
                return (
                  <div
                    to={`/profile/${item.username}`}
                    className="follow-profile search-profile"
                    key={item._id}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      history.push(`/profile/${item.username}`);
                    }}
                  >
                    <br />
                    &nbsp;&nbsp;
                    <img
                      src={
                        "pic" in item
                          ? item.pic
                          : "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
                      }
                      alt=""
                      className="follow-profile-img"
                    />
                    <span>{item.name}</span>
                  </div>
                );
              })
            : null}
          {/* <Link to="/profile/sam" className="follow-profile search-profile">
            <br />
            &nbsp;&nbsp;
            <img
              src="https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
              alt=""
              className="follow-profile-img"
            />
            <span>Sam Doe</span>
          </Link> */}
        </div>
      )}
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
      )}
      <div className="follow-suggestions">
        <h5>Follow Suggestions</h5>
        <>
          {trendingProjects.length &&
            trendingProjects.map((item, index) => (
              <div className="follow-profile-container" key={`follow-${index}`}>
                <Link
                  to={`/profile/${item.username}`}
                  className="follow-profile"
                >
                  <img src={profile} alt="" className="follow-profile-img" />
                  <span>{item.author}</span>
                </Link>
                <button className="follow-btn">Follow</button>
              </div>
            ))}
        </>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Trending;
