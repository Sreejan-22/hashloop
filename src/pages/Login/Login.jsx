import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { notifyError } from "../../utils/notifyToasts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createTheme, TextField, ThemeProvider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { doesPropertyExist } from "../../utils/doesPropertyExist";
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
  const initialState = {
    email: "",
    password: "",
    isSubmitting: "",
  };
  const [loginData, setLoginData] = useState(initialState);
  const [email, setEmail] = useState({
    text: "",
    error: false,
  });
  const [password, setPassword] = useState({
    text: "",
    error: false,
  });
  const [guestLoading, setGuestLoading] = useState(false);

  const handleInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const toggleLoading = (type, value) => {
    if (type === "guest") {
      setGuestLoading(value);
    } else {
      setLoginData({ ...loginData, isSubmitting: value });
    }
  };

  const login = async (e, isGuestLogin) => {
    e.preventDefault();

    const type = isGuestLogin ? "guest" : "user";
    const jsonData = isGuestLogin
      ? {
          email: process.env.REACT_APP_TEST_EMAIL,
          password: process.env.REACT_APP_TEST_PASSWORD,
        }
      : { email: loginData.email, password: loginData.password };

    setEmail({ ...email, error: false });
    setPassword({ ...password, error: false });

    toggleLoading(type, true);

    try {
      const res = await fetch(`${process.env.REACT_APP_URL}/login`, {
        method: "POST",
        body: JSON.stringify(jsonData),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await res.json();

      if (data.success) {
        let temp = [...data.savedProjects];
        if (temp.length) {
          temp = temp.map((item) => item.projectId);
        }
        const userData = {
          name: data.user.name,
          username: data.user.username,
          email: data.user.email,
          token: data.token,
          profile_id: data.profile._id,
          pic: doesPropertyExist("pic", data.profile) ? data.profile.pic : null,
          savedProjects: temp,
        };
        localStorage.setItem("user", JSON.stringify(userData));
        history.push("/");
      } else {
        toggleLoading(type, false);
        notifyError(data.message);
      }
    } catch (err) {
      toggleLoading(type, false);
      notifyError("Something went wrong");
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
          <form className="signin-form" onSubmit={(e) => login(e, false)}>
            <TextField
              label="Email"
              name="email"
              type="email"
              variant="standard"
              className={classes.textField}
              required
              disabled={loginData.isSubmitting || guestLoading}
              value={loginData.email}
              onChange={handleInputChange}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              variant="standard"
              className={classes.textField}
              required
              disabled={loginData.isSubmitting || guestLoading}
              value={loginData.password}
              onChange={handleInputChange}
            />
            <button
              type="submit"
              className={`signin-submit-btn ${
                loginData.isSubmitting || guestLoading ? "btn-disabled" : ""
              }`}
              disabled={guestLoading}
            >
              {!loginData.isSubmitting ? "Sign In" : "Loading..."}
            </button>
          </form>
          <div style={{ alignSelf: "center" }}>
            Don't have an account?{" "}
            <Link to="/signup" className="link-to-signup">
              Sign up
            </Link>
          </div>
          <button
            className={`login-test-btn ${
              loginData.isSubmitting || guestLoading ? "btn-disabled" : ""
            }`}
            onClick={(e) => login(e, true)}
            disabled={loginData.isSubmitting}
          >
            {!guestLoading ? "Login with test credentials" : "Loading..."}
          </button>
        </div>
      </div>
      <ToastContainer />
    </ThemeProvider>
  );
};

export default Login;
