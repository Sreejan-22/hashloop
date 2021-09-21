import Menu from "../Menu/Menu";
import Trending from "../Trending/Trending";
import "./Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <div className="layout-left-container">
        <div className="layout-left">
          <Menu />
        </div>
      </div>
      <div className="layout-content-container">{children}</div>
      <div className="layout-right-container">
        <Trending />
      </div>
    </div>
  );
};

export default Layout;
