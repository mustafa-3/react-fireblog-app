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
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

const Main = () => {
  const { blogList, setBlogList } = useContext(BlogContext);
  const [isLoading, setIsLoading] = useState(false);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  useEffect(() => {
    setIsLoading(true);
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
      setIsLoading(false);
      setBlogList(blogArray);
    });
  }, [setBlogList]);

  return (
    <>
      <Navbar />
      <Container>
        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
            <CircularProgress />
          </Box>
        )}

        <Box>
          <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: ".5rem",
            }}
          >
            {blogList.map((item, index) => {
              return (
                <Grid item key={index}>
                  <Item>
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
