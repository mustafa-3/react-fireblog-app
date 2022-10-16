import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { Link } from "@mui/material";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Profile() {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  return (
    <>
      <Navbar />
      <Container
        maxWidth="sm"
        sx={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          padding: "3rem",
        }}
      >
        <Card
          sx={{
            display: { sm: "block", md: "flex" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
                {currentUser.displayName}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                {currentUser.email}
              </Typography>
            </CardContent>
            <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
          <CardMedia
            component="img"
            sx={{
              maxWidth: 350,
            }}
            image={`https://i.pravatar.cc/`}
            alt="Live from space album cover"
          />
        </Card>
      </Container>
    </>
  );
}
