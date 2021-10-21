import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import GitHubIcon from "@mui/icons-material/GitHub";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © 2021  "}
      <Link
        color="inherit"
        href="https://github.com/Harsh-Modi278"
        target="_blank"
        style={{ textDecoration: "none" }}
      >
        Harsh-Modi278
      </Link>{" "}
      <Link
        color="inherit"
        href="https://github.com/Harsh-Modi278/readme.so-clone"
        target="_blank"
      >
        <GitHubIcon fontSize="70%" />
      </Link>{" "}
    </Typography>
  );
}

function Footer(props) {
  return (
    <footer
      style={{
        marginTop: "5vh",
        marginBottom: "5vh",
        color: "inherit",
        padding: "20px",
      }}
    >
      <Container maxWidth="sm">
        <Copyright />
      </Container>
    </footer>
  );
}

export default Footer;
