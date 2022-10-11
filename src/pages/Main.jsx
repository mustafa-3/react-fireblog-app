import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { db } from "../auth/Firebase";
import { ref, push, set, onValue, remove } from "firebase/database";

const Main = () => {
  const [name, setName] = useState();
  const [contact, setContact] = useState();
  const [blogList, setBlogList] = useState([]);

  const writeToDatabase = () => {
    const blogRef = ref(db, "blogs");
    const newBlogRef = push(blogRef);
    set(newBlogRef, {
      name: name,
      contact: contact,
    });
  };

  const deleteFromDatabase = (item) => {
    remove(ref(db, `blogs/${item.id}`));
  };

  useEffect(() => {
    const blogRef = ref(db, "blogs");
    onValue(blogRef, (snapshot) => {
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
  }, []);

  console.log(blogList);

  return (
    <>
      <Navbar />
      <form onSubmit={writeToDatabase}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            marginTop: 4,
          }}
        >
          <TextField onChange={(e) => setContact(e.target.value)} />
          <TextField onChange={(e) => setName(e.target.value)} />

          <Button type="submit">Submit</Button>
        </Box>
      </form>

      {blogList.map((item, index) => {
        return (
          <div key={index}>
            <div>{item.name}</div>
            <div>{item.contact}</div>
            <Button onClick={() => deleteFromDatabase(item)}>Remove</Button>
          </div>
        );
      })}
    </>
  );
};

export default Main;
