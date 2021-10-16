import Tags from "../Tags/Tags";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import OutlinedInput from "@mui/material/OutlinedInput";
import "./EditProfileModal.css";

const EditProfileModal = ({ open, handleClose }) => {
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Edit Profile
          {handleClose ? (
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          ) : null}
        </DialogTitle>
        <DialogContent dividers>
          <label htmlFor="profile-pic">Profile Picture</label>
          <br />
          <input type="file" id="profile-pic" style={{ marginTop: "0.5rem" }} />
          <br />
          <br />
          <label htmlFor="profile-pic">Header Image</label>
          <br />
          <input type="file" id="header-pic" style={{ marginTop: "0.5rem" }} />
          <br />
          <br />
          <OutlinedInput
            placeholder="Bio"
            multiline
            minRows="1"
            style={{
              marginTop: "0.5rem",
            }}
            className="full-width-input"
          />
          <br />
          <br />
          <OutlinedInput
            placeholder="City"
            sx={{ width: "49%", marginRight: "4px" }}
          />
          &nbsp; &nbsp;
          <OutlinedInput placeholder="Country" sx={{ width: "48%" }} />
          <br />
          <br />
          {/* <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={skills}
            sx={{ width: "100%" }}
            renderInput={(params) => <TextField {...params} label="Movie" />}
          /> */}
          <Tags />
          <br />
          <OutlinedInput placeholder="Github" className="full-width-input" />
          <br />
          <br />
          <OutlinedInput placeholder="LinkedIn" className="full-width-input" />
          <br />
          <br />
          <OutlinedInput placeholder="Twitter" className="full-width-input" />
          <br />
          <br />
          <OutlinedInput
            placeholder="Portfolio website"
            className="full-width-input"
          />
        </DialogContent>
        <DialogActions>
          <Button
            size="small"
            color="error"
            variant="contained"
            disableElevation
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            size="small"
            variant="contained"
            disableElevation
            onClick={handleClose}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditProfileModal;
