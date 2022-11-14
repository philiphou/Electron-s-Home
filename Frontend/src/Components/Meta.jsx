import React from "react";
import {Helmet} from "react-helmet";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};
Meta.defaultProps = {
  title: "Welcome to PhilipHome",
  description: "products with good quality",
  keywords: "Girl, Boy, Toddler, clothes",
};

export default Meta;
