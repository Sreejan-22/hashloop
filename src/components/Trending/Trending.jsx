import trending from "../../assets/trending.png";
import "./Trending.css";

const Trending = () => {
  return (
    <div className="feed-right">
      <input type="text" placeholder="Search" className="search" />
      <div className="trending">
        <h5>Trending</h5>
        {[1, 2, 3, 4].map((item) => (
          <>
            <div className="trending-project">
              <div className="trending-project-desc">
                <p>A better Twitter</p>
                <h6>by Rahul Mehra</h6>
              </div>
              <img src={trending} alt="" className="trending-project-img" />
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Trending;
