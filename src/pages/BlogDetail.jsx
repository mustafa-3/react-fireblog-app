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
import { child, get, ref, remove, update } from "firebase/database";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Navbar from "../components/Navbar";
import { Button, TextField } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import Modal from "@mui/material/Modal";
import { BlogContext } from "../context/BlogContextProvider";

export default function BlogDetail() {
  const [data, setData] = useState("");
  const [toggle, setToggle] = useState(false);
  const { title, setTitle, imageUrl, setImageUrl, content, setContent } =
    useContext(BlogContext);

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

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const editBlogPost = (e) => {
    e.preventDefault();
    update(ref(db, "blogs/" + state.id), {
      title: title,
      content: content,
      image: imageUrl,
    });
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="md">
        <Box sx={{ height: "100vh" }}>
          <Card sx={{ marginTop: 4 }}>
            <CardMedia
              component="img"
              image={data.imageUrl || "https://picsum.photos/1600/900 "}
              alt="Blog Image"
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
                    <Button variant="contained" onClick={handleOpen}>
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
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} component="form" noValidate onSubmit={editBlogPost}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                label="title"
                name="title"
                autoFocus
                placeholder="Edit your title "
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="Image"
                label="Image"
                name="Image"
                autoFocus
                placeholder="Edit your Image URL"
                onChange={(e) => setImageUrl(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="content"
                label="content"
                name="content"
                placeholder="Edit your content"
                autoFocus
                onChange={(e) => setContent(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 1 }}
              >
                Edit Post
              </Button>
            </Box>
          </Modal>
        </div>
      </Container>
    </>
  );
}
