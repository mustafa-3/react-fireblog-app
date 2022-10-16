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
import { db, dbRef } from "../auth/Firebase";
import { child, get, ref, remove } from "firebase/database";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Navbar from "../components/Navbar";
import { Button } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";

export default function RecipeReviewCard() {
  const [data, setData] = useState("");
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();
  const { state } = useLocation();

  const deleteFromDatabase = () => {
    remove(ref(db, `blogs/${id}`));
    navigate("/");
  };

  useEffect(() => {
    get(child(dbRef, `blogs/${id}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setData(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const { currentUser } = useContext(AuthContext);

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
            <CardHeader title={data.title} subheader={state.date} />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {data.content}
              </Typography>
            </CardContent>
            <Box
              sx={{
                marginLeft: 2,
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Avatar sx={{ bgcolor: red[500], fontSize: ".5rem" }} />
              <Typography variant="body2" color="black">
                {state.author}
              </Typography>
            </Box>

            <CardActions
              disableSpacing
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <IconButton
                aria-label="add to favorites"
                onClick={() => setToggle(!toggle)}
                sx={{
                  color: toggle ? "red" : "grey",
                  display: { xs: "none", sm: "block" },
                }}
              >
                <FavoriteIcon />
              </IconButton>

              <Box
                sx={{
                  display: "flex",
                  gap: { xs: 0.2, sm: 1 },
                }}
              >
                {currentUser.email === state.author && (
                  <>
                    <Button variant="contained" onClick={() => navigate("/")}>
                      UPDATE
                    </Button>
                    <Button variant="contained" onClick={deleteFromDatabase}>
                      DELETE
                    </Button>
                  </>
                )}

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
