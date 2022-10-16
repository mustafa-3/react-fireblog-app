import React, { createContext, useState } from "react";
export const BlogContext = createContext();

const BlogContextProvider = ({ children }) => {
  const [blogList, setBlogList] = useState([]);
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");

  return (
    <BlogContext.Provider
      value={{
        blogList,
        setBlogList,
        title,
        setTitle,
        imageUrl,
        setImageUrl,
        content,
        setContent,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export default BlogContextProvider;
