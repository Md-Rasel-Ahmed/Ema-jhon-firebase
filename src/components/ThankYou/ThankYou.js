import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import ChangeTitle from "../ChangeTitle/ChangeTitle";

const ThankYou = () => {
  return (
    <div style={{ width: "400px", margin: "auto" }}>
      <ChangeTitle title="Thank you" />
      <h2 className="text-success">Thank your for order</h2>
      <h4 className="text-success">Your order successful</h4>
      <Link className="btn btn-primary" to="/">
        <FontAwesomeIcon icon={faArrowAltCircleLeft} /> Go to home
      </Link>
    </div>
  );
};

export default ThankYou;
