import { useState } from "react";
import { useHistory } from "react-router-dom";
import { baseUrl } from "../../utils/constants";
import { notifyError } from "../../utils/notifyToasts";
import { doesPropertyExist } from "../../utils/doesPropertyExist";
import "./Search.css";

const Search = () => {
  const history = useHistory();
  const [focus, setFocus] = useState(false);
  const [searchProfiles, setSearchProfiles] = useState([]);

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
    <>
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
                        doesPropertyExist("pic", item)
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
    </>
  );
};

export default Search;
