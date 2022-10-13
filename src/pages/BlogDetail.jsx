import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { dbRef } from "../auth/Firebase";
import { child, get } from "firebase/database";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Navbar from "../components/Navbar";
import { Button } from "@mui/material";

export default function RecipeReviewCard() {
  const [data, setData] = useState("");
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    get(child(dbRef, `blogs/${id}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          // console.log(snapshot.val());
          setData(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);
  console.log(data);
  return (
    <>
      <Navbar />

      <Container maxWidth="md">
        <Box sx={{ height: "100vh" }}>
          <Card sx={{ marginTop: 4 }}>
            <CardMedia
              component="img"
              image={data.imageUrl}
              alt="Paella dish"
              sx={{ maxHeight: 500 }}
            />
            <CardHeader title={data.title} subheader="September 14, 2016" />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {data.content}
              </Typography>
            </CardContent>
            <Box sx={{ marginLeft: 2 }}>
              {<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" />}
            </Box>

            <CardActions
              disableSpacing
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <IconButton
                aria-label="add to favorites"
                onClick={() => setToggle(!toggle)}
                sx={{ color: toggle ? "red" : "grey" }}
              >
                <FavoriteIcon />
              </IconButton>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button variant="outlined" onClick={() => navigate("/")}>
                  UPDATE
                </Button>
                <Button variant="outlined" onClick={() => navigate(-1)}>
                  DELETE
                </Button>
              </Box>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button variant="outlined" onClick={() => navigate("/")}>
                  HOME
                </Button>
                <Button variant="outlined" onClick={() => navigate(-1)}>
                  BACK
                </Button>
              </Box>
            </CardActions>
          </Card>
        </Box>
      </Container>
    </>
  );
}
