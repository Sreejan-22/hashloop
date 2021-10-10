import { useHistory } from "react-router";
import { BiArrowBack } from "react-icons/bi";
import "./PageHeader.css";

const PageHeader = ({ text }) => {
  const history = useHistory();

  return (
    <div className="profile-page-header">
      <BiArrowBack onClick={() => history.goBack()} />
      &nbsp;&nbsp;&nbsp;
      <span>{text}</span>
    </div>
  );
};

export default PageHeader;
