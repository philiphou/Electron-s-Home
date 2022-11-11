import React from "react";

const Meta = ({ title, description, keywords }) => {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </>
  );
};
Meta.defaultProps = {
  title: "Welcome to PhilipHome",
  description: "products with good quality",
  keywords: "Girl, Boy, Toddler, clothes",
};

export default Meta;
