import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";

const handleDownload = (e, totalMarkdown) => {
  const element = document.createElement("a");
  const blob = new Blob([totalMarkdown]);
  element.download = "README.md";
  element.href = window.URL.createObjectURL(blob);
  element.click();
};

const Header = (props) => {
  const { totalMarkdown } = props;
  return (
    <Box>
      <AppBar position="relative" sx={{ padding: 1.5 }} color="inherit">
        <Toolbar variant="dense">
          <Typography variant="h5" color="inherit" component="div">
            <RouterLink
              to="/"
              style={{
                color: "black",
                textDecorationLine: "none",
                cursor: "pointer",
              }}
            >
              <strong>readme.so-clone</strong>
            </RouterLink>
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => handleDownload(e, totalMarkdown)}
          >
            <strong>Download</strong>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
