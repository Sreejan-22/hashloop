import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { notifyError } from "../../utils/notifyToasts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createTheme, TextField, ThemeProvider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { CircularProgress } from "@mui/material";
import amico from "../../assets/amico.svg";
import "./Login.css";

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
});

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState({
    text: "",
    error: false,
  });
  const [password, setPassword] = useState({
    text: "",
    error: false,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setEmail({ ...email, error: false });
    setPassword({ ...password, error: false });

    if (!email.text.length) {
      setEmail({ ...email, error: true });
    }
    if (!password.text.length) {
      setPassword({ ...password, error: true });
    }

    if (email.text.length && password.text.length) {
      setLoading(true);

      fetch(`${process.env.REACT_APP_URL}/login`, {
        method: "POST",
        body: JSON.stringify({
          email: email.text,
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
              name: data.user.name,
              username: data.user.username,
              email: data.user.email,
              token: data.token,
              profileId: data.profile.profileId,
            };
            localStorage.setItem("user", JSON.stringify(userData));
            history.push("/");
          } else {
            // notify errors
            if ("serverError" in data) {
              notifyError(data.message);
            } else {
              notifyError(data.message);
            }
          }
        });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={`signin-wrapper ${classes.root}`}>
        <div className="left-signin-part">
          <img src={amico} alt="" style={{ width: "80%", height: "100%" }} />
        </div>
        <div className="right-signin-part">
          <div className="signin-heading">Sign In</div>
          <div className="signin-subheading">Welcome Back!</div>
          <form noValidate autoComplete="off" className="signin-form">
            <TextField
              label="Email"
              type="text"
              variant="standard"
              className={classes.textField}
              required
              onChange={(e) => setEmail({ ...email, text: e.target.value })}
              error={email.error}
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
            />
            <a
              href="https://github.com/Sreejan-22"
              className="forgot-password-text"
            >
              Forgot Password?
            </a>
            <br />
            <button className="signin-submit-btn" onClick={handleSubmit}>
              Sign In
            </button>
          </form>
          <div style={{ alignSelf: "center" }}>
            Don't have an account?{" "}
            <Link to="/signup" className="link-to-signup">
              Sign up
            </Link>
          </div>
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

export default Login;
