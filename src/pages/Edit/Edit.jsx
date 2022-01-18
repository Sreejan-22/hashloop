import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import PageHeader from "../../components/PageHeader/PageHeader";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {} from "react-toastify";

import { CircularProgress } from "@mui/material";
import "./Edit.css";
import { allTags, baseUrl } from "../../utils/constants";
import { getUser } from "../../utils/auth";
import { notifyError } from "../../utils/notifyToasts";

const projectTags = [...allTags];

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
    "&:hover": {
      color: "white",
      backgroundColor: "#bdbdbd",
    },
  },
  input: {
    border: "1.5px solid rgb(75, 75, 75)",
    outline: "none",
    borderRadius: "8px",
  },
  loaderWrapper: {
    position: "absolute",
    top: "40px",
    left: "50%",
    display: "flex",
    justifyContent: "center",
  },
  loader: {
    zIndex: "5",
  },
  wrapper: {
    position: "fixed",
    top: "0px",
    left: "0px",
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: "5",
  },
});

const Edit = () => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const currentProject = history.location.state.project;
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(currentProject.projectName);
  const [details, setDetails] = useState(currentProject.details);
  const [currentTag, setCurrentTag] = useState("");
  const [tags, setTags] = useState(currentProject.tags || []);
  const [code, setCode] = useState(currentProject.code);
  const [live, setLive] = useState(currentProject.live || "");
  const [img, setImg] = useState(currentProject.image || null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let submitData = {
      projectName: name,
      details,
      code,
    };

    if (tags.length) {
      submitData.tags = tags;
    } else {
      submitData.tags = [];
    }

    if (live.length) {
      submitData.live = live;
    } else {
      submitData.live = null;
    }

    setLoading(true);

    if (img && typeof img !== "string") {
      const formData = new FormData();
      formData.append("image", img);

      try {
        const res = await fetch(`${baseUrl}/upload`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${getUser().token}`,
          },
          body: formData,
        });

        const data = await res.json();
        console.log(data);
        if (data.success) {
          submitData.image = data.imageUrl;
        } else {
          notifyError("Failed to upload image");
          setLoading(false);
          return;
        }
      } catch (err) {
        console.log(err);
        notifyError("Failed to upload image");
        setLoading(false);
        return;
      }
    }

    // update project
    try {
      const res = await fetch(`${baseUrl}/projects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getUser().token}`,
        },
        body: JSON.stringify(submitData),
      });
      const data = await res.json();
      if (data.success) {
        setLoading(false);
        history.push("/");
      } else {
        setLoading(false);
        notifyError(data.message);
      }
    } catch (err) {
      setLoading(false);
      notifyError("Failed to update project");
    }
  };

  return (
    <Layout>
      <PageHeader text="Edit project" />
      <form className="create-project-container" onSubmit={handleSubmit}>
        <label htmlFor="project-name" className="create-label">
          Project Name*
        </label>
        <input
          type="text"
          id="project-name"
          className="create-project-input"
          required
          defaultValue={name}
          onChange={(e) => setName(e.target.value)}
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
          defaultValue={details}
          onChange={(e) => setDetails(e.target.value)}
        ></textarea>
        <label htmlFor="project-tags" className="create-label">
          Tags
        </label>
        <input
          list="tags"
          id="project-tags"
          className="create-project-input"
          value={currentTag || ""}
          onChange={(e) => setCurrentTag(e.target.value)}
        />
        <datalist id="tags">
          {projectTags.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </datalist>
        <ThemeProvider theme={theme}>
          <Button
            variant="contained"
            className={classes.button}
            color="primary"
            style={{ textTransform: "capitalize" }}
            onClick={() => {
              if (currentTag.length) {
                if (!tags.includes(currentTag)) {
                  const temp = [...tags];
                  temp.push(currentTag);
                  setTags(temp);
                }
                setCurrentTag("");
              }
            }}
          >
            Add
          </Button>
        </ThemeProvider>
        <div className="display-tags">
          {tags.map((item, index) => (
            <ThemeProvider theme={theme} key={item}>
              <Button
                variant="contained"
                disableElevation
                endIcon={<CloseIcon />}
                sx={{ borderRadius: 4, mb: 1 }}
                onClick={() => {
                  const temp = [...tags];
                  temp.splice(index, 1);
                  setTags(temp);
                }}
              >
                {item}
              </Button>
              &nbsp;&nbsp;
            </ThemeProvider>
          ))}
        </div>
        <label htmlFor="project-code" className="create-label">
          Github (or Gitlab) Link*
        </label>
        <input
          type="text"
          id="project-code"
          className="create-project-input"
          required
          defaultValue={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <label htmlFor="project-link" className="create-label">
          Link to the live project
        </label>
        <input
          type="text"
          id="project-link"
          className="create-project-input"
          defaultValue={live}
          onChange={(e) => setLive(e.target.value)}
        />
        <label htmlFor="project-img" className="create-label">
          Image
        </label>
        <input
          type="file"
          name=""
          id="project-img"
          onChange={(e) => {
            if (e.target.files.length) {
              let imgData = e.target.files[0];
              setImg(imgData);
            }
          }}
        />
        {currentProject.image && (
          <>
            <br />
            <p>Original image Preview</p>
            <br />
            <img
              src={currentProject.image}
              alt=""
              style={{ height: "200px", width: "100%", objectFit: "cover" }}
            />
          </>
        )}
        <br />
        <br />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
      {loading ? (
        <>
          <div className={classes.loaderWrapper}>
            <CircularProgress className={classes.loader} />
          </div>
          <div className={classes.wrapper}></div>
        </>
      ) : null}
    </Layout>
  );
};

export default Edit;
