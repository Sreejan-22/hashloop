import { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  handleServerError,
  handleSignupError,
} from "../../utils/handleSignupError";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createTheme, TextField, ThemeProvider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { CircularProgress } from "@mui/material";
import amico from "../../assets/amico.svg";
import "./Signup.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#82869A",
    },
  },
});

const useStyles = makeStyles({
  root: {
    fontFamily: "DM Sans",
  },
  textField: {
    width: "510",
    marginBottom: "1.5rem",
    color: "textPrimary",
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

const Signup = () => {
  const classes = useStyles();
  const [name, setName] = useState({
    text: "",
    error: false,
    errorText: null,
  });
  const [username, setUsername] = useState({
    text: "",
    error: false,
    errorText: null,
  });
  const [email, setEmail] = useState({
    text: "",
    error: false,
    errorText: null,
  });
  const [password, setPassword] = useState({
    text: "",
    error: false,
    errorText: null,
  });
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  // const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    setName({ ...name, error: false });
    setUsername({ ...username, error: false });
    setEmail({ ...email, error: false });
    setPassword({ ...password, error: false });

    if (!name.text.length) {
      setName({ ...name, error: true });
    }
    if (!username.text.length) {
      setUsername({ ...username, error: true });
    }
    if (!email.text.length) {
      setEmail({ ...email, error: true });
    }
    if (!password.text.length) {
      setPassword({ ...password, error: true });
    }

    if (
      name.text.length &&
      username.text.length &&
      email.text.length &&
      password.text.length
    ) {
      setLoading(true);

      fetch(`${process.env.REACT_APP_URL}/signup`, {
        method: "POST",
        body: JSON.stringify({
          name: name.text,
          email: email.text,
          username: username.text,
          password: password.text,
        }),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          if (data.success) {
            const userData = {
              name: name.text,
              username: username.text,
              email: email.text,
              token: data.token,
            };
            localStorage.setItem("user", JSON.stringify(userData));
            history.push("/");
          } else {
            // notify errors
            if ("serverError" in data) {
              handleServerError(data.message);
            } else {
              handleSignupError(data.errors);
            }
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={`signup-wrapper ${classes.root}`}>
        <div className="left-signup-part">
          <img src={amico} alt="" style={{ width: "80%", height: "100%" }} />
        </div>
        <div className="right-signup-part">
          <div className="signup-heading">Sign Up</div>
          <div className="signup-subheading">Welcome!</div>
          <form noValidate autoComplete="off" className="signup-form">
            <TextField
              label="Name"
              type="text"
              variant="standard"
              className={classes.textField}
              required
              onChange={(e) => setName({ ...name, text: e.target.value })}
              error={name.error}
              helperText={name.errorText}
            />
            <TextField
              label="Username"
              type="text"
              variant="standard"
              className={classes.textField}
              required
              onChange={(e) =>
                setUsername({ ...username, text: e.target.value })
              }
              error={username.error}
              helperText={username.errorText}
            />
            <TextField
              label="Email"
              type="text"
              variant="standard"
              className={classes.textField}
              required
              onChange={(e) => setEmail({ ...email, text: e.target.value })}
              error={email.error}
              helperText={email.errorText}
            />
            <TextField
              label="Password"
              type="password"
              variant="standard"
              className={classes.textField}
              required
              onChange={(e) =>
                setPassword({ ...password, text: e.target.value })
              }
              error={password.error}
              helperText={password.errorText}
            />
            <button className="signup-submit-btn" onClick={handleSubmit}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
      {loading ? (
        <>
          <div className={classes.loaderWrapper}>
            <CircularProgress className={classes.loader} />
          </div>
          <div className={classes.wrapper}></div>
        </>
      ) : null}
      <ToastContainer />
    </ThemeProvider>
  );
};

export default Signup;
