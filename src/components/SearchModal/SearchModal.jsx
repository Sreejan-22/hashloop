import Search from "../../components/Search/Search";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import "./SearchModal.css";

const SearchModal = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose} className="search-modal">
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Search
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
      <DialogContent>
        <div className="search-container">
          <Search />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
