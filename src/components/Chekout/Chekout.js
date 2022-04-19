import React from "react";
import { Link } from "react-router-dom";
import ChangeTitle from "../ChangeTitle/ChangeTitle";

const Chekout = () => {
  return (
    <div
      style={{ width: "400px", margin: "auto" }}
      className="border mt-5 pb-5"
    >
      <ChangeTitle title="Checkout" />
      <h2>Please filed out this form!</h2>
      <form action="">
        <div className="row">
          <div className="col-6">
            <input type="text" name="text" required placeholder="First Name" />
          </div>
          <div className="col-6">
            <input type="text" name="text" required placeholder="Last Name" />
          </div>
        </div>
        <input type="email" name="email" value="kjfashf@mgail.com" disabled />
        <div className="row">
          <div className="col-4">
            <input type="text" placeholder="City" name="city" />
          </div>
          <div className="col-4">
            <input type="number" placeholder="Zip" name="zip" />
          </div>
          <div className="col-4">
            <input type="text" placeholder="State" name="state" />
          </div>
        </div>
        <Link
          to="/thankyou"
          className="p-2 bg-success text-light d-block text-center rounded"
        >
          Submit
        </Link>
      </form>
    </div>
  );
};

export default Chekout;
