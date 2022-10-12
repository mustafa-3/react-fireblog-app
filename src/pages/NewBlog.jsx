import React from "react";
import Navbar from "../components/Navbar";
import blogImage from "../assets/blogImage.png";
import { Box, Container } from "@mui/system";
import { Button, CardMedia, TextField, Typography } from "@mui/material";
const NewBlog = () => {
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
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="title"
            name="title"
            autoFocus
            placeholder="Add a title to your Blog"
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
