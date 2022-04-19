import React from "react";
import { Helmet } from "react-helmet-async";

const ChangeTitle = ({ title }) => {
  return (
    <Helmet>
      <title>{title}-Ema Jhon</title>
    </Helmet>
  );
};

export default ChangeTitle;
