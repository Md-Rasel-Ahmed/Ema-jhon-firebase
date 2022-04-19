import React, { useState } from "react";
import { useUpdatePassword } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../../firebase-init";
import ChangeTitle from "../ChangeTitle/ChangeTitle";
const UpdatePassword = (props) => {
  const [updatePassword, updating, error] = useUpdatePassword(auth);
  const [password, setPassword] = useState("");
  const [oldPass, setOldPass] = useState("");
  const chekOldPass = () => {
    if (!oldPass) {
      toast.error("Please provide the valid passowrd");
      return false;
    }
    if (props.password !== oldPass) {
      toast.error("Sorry! Old password din,t match!");
      return false;
    }
    if (password.length > 5) {
      toast.success("Password updated successfully", {
        style: {
          backgroundColor: "green",
          color: "#fff",
        },
      });
    }
  };

  return (
    <div>
      <ChangeTitle title="Update Password" />
      <h3 align="center">Update your password</h3>
      <form action="">
        <p>Update your passowrd</p>
        <input
          type="password"
          value={oldPass}
          placeholder="Enter your old password"
          onChange={(e) => setOldPass(e.target.value)}
          required
        />
        <small>Password must be at least 6 characters</small>
        <input
          type="password"
          value={password}
          placeholder="Enter your New password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          style={{ width: "340px" }}
          onClick={async (e) => {
            chekOldPass();
            e.preventDefault();
            password.length > 5 && (await updatePassword(password));
          }}
        >
          Update Pass
        </button>
      </form>
      <div className="text-center">
        <Link to="/login">Go To Login page</Link>
      </div>
    </div>
  );
};

export default UpdatePassword;
