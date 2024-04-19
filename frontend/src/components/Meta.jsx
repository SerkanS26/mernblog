import React from "react";
import { Helmet } from "react-helmet-async";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome To MERN BLOG",
  description: "Read and Write your own Blogs here",
  keywords: "Javascript, MERN, MongoDB, Express, React, NodeJS",
};
export default Meta;
