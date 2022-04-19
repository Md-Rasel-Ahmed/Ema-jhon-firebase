import React, { useState } from "react";
import { useUpdatePassword } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../firebase-init";
import ChangeTitle from "../ChangeTitle/ChangeTitle";
const UpdatePassword = () => {
  const [updatePassword, updating, error] = useUpdatePassword(auth);
  const [password, setPassword] = useState("");
  const [oldPass, setOldPass] = useState("");
  const chekOldPass = () => {
    if (!password) {
      return toast.error("Please provide the valid passowrd");
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
      <div className="containe">
        <div className="row">
          <div className="col-12">
            <form className="mx-auto">
              <p>Password must be at least 6 characters</p>
              <input
                style={{ width: "250px" }}
                type="password"
                value={password}
                placeholder="Enter your New password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                style={{ width: "250px" }}
                onClick={async (e) => {
                  chekOldPass();
                  e.preventDefault();
                  password.length > 5 && (await updatePassword(password));
                }}
              >
                Update Pass
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="text-center">
        <Link to="/login">Go To Login page</Link>
      </div>
    </div>
  );
};

export default UpdatePassword;
