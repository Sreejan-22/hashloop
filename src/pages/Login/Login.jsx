import { createTheme, TextField, ThemeProvider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import sign from "../../assets/sign.svg";
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
          <img src={sign} alt="" style={{ width: "100%", height: "100%" }} />
        </div>
        <div className="right-signin-part">
          <div className="signin-heading">Sign In</div>
          <div className="signin-subheading">Welcome Back!</div>
          <form noValidate autoComplete="off" className="signin-form">
            <TextField
              label="Email"
              type="text"
              className={classes.textField}
              required
            />
            <TextField
              label="Password"
              type="password"
              className={classes.textField}
              required
            />
            <a href="#" class="forgot-password-text">
              Forgot Password?
            </a>
            <br />
            <input
              type="submit"
              value="Sign In"
              className="signin-submit-btn"
            />
          </form>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Login;
