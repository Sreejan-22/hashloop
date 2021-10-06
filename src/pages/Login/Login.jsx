import { createTheme, TextField, ThemeProvider } from "@mui/material";
import { makeStyles } from "@mui/styles";
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
            />
            <TextField
              label="Password"
              type="password"
              variant="standard"
              className={classes.textField}
              required
            />
            <a
              href="https://github.com/Sreejan-22"
              className="forgot-password-text"
            >
              Forgot Password?
            </a>
            <br />
            <input
              type="submit"
              value="Sign In"
              variant="standard"
              className="signin-submit-btn"
            />
          </form>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Login;
