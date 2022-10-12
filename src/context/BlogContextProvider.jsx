import React, { createContext, useState } from "react";
export const BlogContext = createContext();

const BlogContextProvider = ({ children }) => {
  const [blogList, setBlogList] = useState([]);

  return (
    <BlogContext.Provider value={{ blogList, setBlogList }}>
      {children}
    </BlogContext.Provider>
  );
};

export default BlogContextProvider;
