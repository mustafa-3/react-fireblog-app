import React, { useState } from "react";
import Navbar from "../components/Navbar";
import blogImage from "../assets/blogImage.png";
import { Box, Container } from "@mui/system";
import { Button, CardMedia, TextField, Typography } from "@mui/material";
import { db } from "../auth/Firebase";
import { ref, push, set, get, child } from "firebase/database";
import { useContext } from "react";
import BlogContextProvider, {
  BlogContext,
} from "../context/BlogContextProvider";

const NewBlog = () => {
  const { blogList, setBlogList } = useContext(BlogContext);
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");

  const writeToDatabase = (e) => {
    e.preventDefault();
    const blogRef = ref(db, "blogs");
    const newBlogRef = push(blogRef);
    set(newBlogRef, {
      title: title,
      imageUrl: imageUrl,
      content: content,
    });
  };


  // console.log(blogList);

  return (
    <>
      <Navbar />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 100px)",
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: "14rem" }}
          image={blogImage}
          alt="green iguana"
        />
        <Typography sx={{ margin: ".5rem", fontSize: "1.3rem" }}>
          New Blog
        </Typography>
        <Box
          component="form"
          onSubmit={writeToDatabase}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="title"
            name="title"
            autoFocus
            placeholder="Add a title to your Blog"
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="Image"
            label="Image"
            type="text"
            id="Image"
            placeholder="Image URL"
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="content"
            label="content"
            name="content"
            autoFocus
            placeholder="Please enter your content"
            onChange={(e) => setContent(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            ADD NEW BLOG
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default NewBlog;
