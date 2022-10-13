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
import { useNavigate } from "react-router-dom";

export default function Cards({ blogList }) {
  const { title, imageUrl, content, id } = blogList;

  console.log(blogList);

  const navigate = useNavigate();

  return (
    <Card
      sx={{ maxWidth: 345 }}
      onClick={() => navigate(`/detail/${id}`, { state: blogList })}
    >
      <CardMedia
        component="img"
        height="194"
        image={imageUrl}
        alt="Paella dish"
      />
      <CardHeader title={title} subheader="September 14, 2016" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" />
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
