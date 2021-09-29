import { createTheme, TextField, ThemeProvider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import sign from "../../assets/sign.svg";
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
});

const Signup = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={`signup-wrapper ${classes.root}`}>
        <div className="left-signup-part">
          <img src={sign} alt="" style={{ width: "100%", height: "100%" }} />
        </div>
        <div className="right-signup-part">
          <div className="signup-heading">Sign Up</div>
          <div className="signup-subheading">Welcome!</div>
          <form noValidate autoComplete="off" className="signup-form">
            <TextField
              // id="standard-password-input"
              label="Name"
              type="text"
              // autoComplete="current-password"
              className={classes.textField}
              required
            />
            <TextField
              // id="standard-password-input"
              label="Email"
              type="text"
              // autoComplete="current-password"
              className={classes.textField}
              required
            />
            <TextField
              // id="standard-password-input"
              label="Password"
              type="password"
              // autoComplete="current-password"
              className={classes.textField}
              required
            />
            <input
              type="submit"
              value="Sign Up"
              className="signup-submit-btn"
            />
          </form>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Signup;
