import * as React from "react";
import { useContext, useEffect } from "react";
import Cards from "../components/Cards";
import Navbar from "../components/Navbar";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { BlogContext } from "../context/BlogContextProvider";
import { ref, onValue } from "firebase/database";
import { db } from "../auth/Firebase";
import { Container } from "@mui/material";

const Main = () => {
  const { blogList, setBlogList } = useContext(BlogContext);
  // console.log(blogList);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  useEffect(() => {
    const userRef = ref(db, "blogs");
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      const blogArray = [];
      for (let id in data) {
        blogArray.push({
          id,
          ...data[id],
        });
      }
      setBlogList(blogArray);
    });
  }, [setBlogList]);

  return (
    <>
      <Navbar />
      <Container>
        <Box >
          <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {blogList.map((item, index) => {
              return (
                <Grid item key={index}>
                  <Item >
                    <Cards blogList={item} />
                  </Item>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Main;
