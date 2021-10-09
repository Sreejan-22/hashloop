import { useHistory } from "react-router";
import Layout from "../../components/Layout/Layout";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";
import { BiArrowBack } from "react-icons/bi";
import "./Create.css";
import { allTags } from "../../utils/constants";

const theme = createTheme({
  palette: {
    primary: {
      main: "#e0e0e0",
    },
  },
});

const useStyles = makeStyles({
  button: {
    alignSelf: "flex-end",
  },
  input: {
    border: "1.5px solid rgb(75, 75, 75)",
    outline: "none",
    borderRadius: "8px",
  },
});

const Create = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Layout>
      <div className="profile-page-header">
        <BiArrowBack onClick={() => history.goBack()} />
        &nbsp;&nbsp;&nbsp;
        <span>Create a new project</span>
      </div>
      <form className="create-project-container">
        <label htmlFor="project-name" className="create-label">
          Project Name*
        </label>
        <input
          type="text"
          id="project-name"
          className="create-project-input"
          required
        />
        <label htmlFor="project-details" className="create-label">
          Description*
        </label>
        <textarea
          name=""
          id="project-details"
          cols="30"
          aria-multiline
          className="create-project-input"
          style={{
            fontFamily: `"Montserrat", sans-serif`,
            minHeight: "80px",
            outline: "none",
          }}
          required
        ></textarea>
        <label htmlFor="project-tags" className="create-label">
          Tags
        </label>
        <input list="tags" id="project-tags" className="create-project-input" />
        <datalist id="tags">
          {allTags.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </datalist>
        <ThemeProvider theme={theme}>
          <Button
            variant="contained"
            className={classes.button}
            color="primary"
            style={{ textTransform: "capitalize" }}
          >
            Add
          </Button>
        </ThemeProvider>
        <label htmlFor="project-code" className="create-label">
          Github (or Gitlab) Link*
        </label>
        <input
          type="text"
          id="project-code"
          className="create-project-input"
          required
        />
        <label htmlFor="project-link" className="create-label">
          Link to the live project
        </label>
        <input type="text" id="project-link" className="create-project-input" />
        <label htmlFor="project-img" className="create-label">
          Image
        </label>
        <input type="file" name="" id="project-img" />
        <br />
        <br />
        <Button variant="contained">Submit</Button>
      </form>
    </Layout>
  );
};

export default Create;
