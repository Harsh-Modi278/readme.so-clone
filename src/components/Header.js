import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const Header = () => {
  return (
    <Box>
      <AppBar position="static" sx={{ padding: 1.5 }} color="inherit">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            Readme.so Clone
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button variant="contained" color="primary">
            Download
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
