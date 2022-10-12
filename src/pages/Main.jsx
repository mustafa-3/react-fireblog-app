import React, { useContext, useEffect } from "react";
import Cards from "../components/Cards";
import Navbar from "../components/Navbar";
import { BlogContext } from "../context/BlogContextProvider";
import { ref, push, set, onValue } from "firebase/database";
import { db } from "../auth/Firebase";

const Main = () => {
  const { blogList, setBlogList } = useContext(BlogContext);
  console.log(blogList);

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
  }, []);

  return (
    <>
      <Navbar />
      <div>a</div>
    </>
  );
};

export default Main;
