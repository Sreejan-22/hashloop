import { styled } from "@mui/material/styles";
import Menu from "@mui/material/Menu";

export const StyledMenu = styled((props) => (
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
    borderRadius: 20,
    boxShadow: "0px 2px 24px 2px rgba(0, 6, 148, 0.08);",
    width: "150px",
    padding: 10,
  },
}));

export const StyledCommentMenu = styled((props) => (
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
    boxShadow: "0px 2px 24px 2px rgba(0, 6, 148, 0.08);",
    width: "150px",
  },
}));
