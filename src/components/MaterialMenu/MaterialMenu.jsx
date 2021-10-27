import * as React from "react";
import { useHistory } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import "./MaterialMenu.css";
import { isAuthenticated } from "../../utils/auth";
import { getUser } from "../../utils/auth";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const MaterialMenu = () => {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        id="demo-customized-button"
        aria-controls="demo-customized-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        onClick={handleClick}
        className="menu-icon"
      >
        <MoreHorizIcon />
      </IconButton>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            history.push("/");
          }}
          disableRipple
        >
          <HomeIcon />
          Feed
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            history.push("/explore");
          }}
          disableRipple
        >
          <ExploreIcon />
          Explore
        </MenuItem>
        {isAuthenticated() ? (
          <div>
            <MenuItem
              onClick={() => {
                handleClose();
                history.push(`/profile/${getUser().username}`);
              }}
              disableRipple
            >
              <PersonIcon />
              Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                history.push("/saved");
              }}
              disableRipple
            >
              <BookmarkIcon />
              Saved
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                localStorage.removeItem("user");
                if (history.location.pathname === "/") {
                  window.location.reload();
                } else {
                  history.push("/");
                }
              }}
              disableRipple
            >
              <LogoutIcon />
              Logout
            </MenuItem>
          </div>
        ) : null}
      </StyledMenu>
    </div>
  );
};

export default MaterialMenu;
