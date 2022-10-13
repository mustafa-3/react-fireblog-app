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
import ShareIcon from "@mui/icons-material/Share";
import { dbRef } from "../auth/Firebase";
import { child, get } from "firebase/database";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Navbar from "../components/Navbar";

export default function RecipeReviewCard() {
  const [data, setData] = useState("");

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

      <Container maxWidth="sm">
        <Box sx={{ bgcolor: "#cfe8fc", height: "100vh" }}>
          <Card sx={{ maxWidth: 845, marginTop: 4 }}>
            <CardMedia
              component="img"
              image={data.imageUrl}
              alt="Paella dish"
            />
            <CardHeader title={data.title} subheader="September 14, 2016" />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {data.content}
              </Typography>
            </CardContent>
            <Box>
              {<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" />}
            </Box>

            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Box>
      </Container>
    </>
  );
}
