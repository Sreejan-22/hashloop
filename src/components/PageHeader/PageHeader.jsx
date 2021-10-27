import { useHistory } from "react-router-dom";
import SearchModal from "../SearchModal/SearchModal";
import MaterialMenu from "../MaterialMenu/MaterialMenu";
import { BiArrowBack } from "react-icons/bi";
import "./PageHeader.css";

const PageHeader = ({ text }) => {
  const history = useHistory();

  return (
    <div className="profile-page-header">
      <div className="page-header-content">
        <BiArrowBack onClick={() => history.goBack()} />
        &nbsp;&nbsp;&nbsp;
        <span>{text}</span>
      </div>
      <div className="header-search-icon">
        <SearchModal />
      </div>
      <MaterialMenu />
    </div>
  );
};

export default PageHeader;
