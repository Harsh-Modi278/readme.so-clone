import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link as RouterLink } from "react-router-dom";
import Footer from "../components/Footer";
import Link from "@mui/material/Link";

const Home = () => {
  return (
    <Box>
      <AppBar position="relative" sx={{ padding: 1.5 }} color="inherit">
        <Toolbar variant="dense">
          <Typography variant="h5" color="inherit" noWrap>
            <RouterLink
              to="/"
              style={{
                color: "inherit",
                textDecorationLine: "none",
                cursor: "pointer",
              }}
            >
              <strong>readme.so-clone</strong>
            </RouterLink>
          </Typography>
        </Toolbar>
      </AppBar>
      {/* <main> */}
        <Box
          sx={{
            // bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              readme.so-clone
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              My attempt at cloning the famous README editor{" "}
              <Link
                color="inherit"
                href="https://readme.so/"
                target="_blank"
                sx={{ textDecoration: "none" }}
              >
                readme.so
              </Link>
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">
                <RouterLink
                  to="/editor"
                  style={{
                    color: "inherit",
                    textDecorationLine: "none",
                    cursor: "pointer",
                  }}
                >
                  Go to Editor
                </RouterLink>
              </Button>
            </Stack>
          </Container>
        </Box>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // border: "2px solid lightgrey",
            // borderRadius: "5px",
            marginLeft: "50px",
            marginRight: "50px",
            backgroundImage:"white"
          }}
        >
          <img
            src="/assets/editor_demo_ss.png"
            alt="editor demo screenshot"
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </div>
      {/* </main> */}
      <Footer />
    </Box>
  );
};

export default Home;
