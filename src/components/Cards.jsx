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
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

export default function Cards({ blogList }) {
  const { title, imageUrl, content, id } = blogList;
  const [toggle, setToggle] = useState(false);

  console.log(blogList);

  const navigate = useNavigate();

  return (
    <Card sx={{ width: 345 }}>
      <CardMedia
        component="img"
        height="194"
        image={imageUrl}
        alt="Paella dish"
        sx={{ cursor: "pointer" }}
        onClick={() => navigate(`/detail/${id}`, { state: blogList })}
      />
      <CardHeader title={title} subheader="September 14, 2016" />
      <CardContent sx={{ height: "10rem" }}>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" />
      <CardActions
        disableSpacing
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <IconButton
          aria-label="add to favorites"
          sx={{ color: toggle ? "red" : "grey" }}
          onClick={() => setToggle(!toggle)}
        >
          <FavoriteIcon />
        </IconButton>
        <Box>
          <Button
            variant="outlined"
            onClick={() => navigate(`/detail/${id}`, { state: blogList })}
          >
            VIEW MORE
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}
