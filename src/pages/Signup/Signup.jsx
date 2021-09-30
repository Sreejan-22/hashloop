import { createTheme, TextField, ThemeProvider } from "@mui/material";
import { makeStyles } from "@mui/styles";
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
});

const Signup = () => {
  const classes = useStyles();

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
            />
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
