import {
  faEnvelope,
  faKey,
  faVoicemail,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sendPasswordResetEmail } from "firebase/auth";
import React from "react";
import { useUpdatePassword } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../firebase-init";
import ChangeTitle from "../ChangeTitle/ChangeTitle";

const ResetPassword = () => {
  //   const [updatePassword, updating, error] = useUpdatePassword(auth);
  const navigate = useNavigate();
  const updateUserPassword = (e) => {
    let email = e.target.email.value;
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then((result) => {
        // Password reset email sent!
        // ..
        toast.success("Please Check your email");
        console.log(result);
        navigate("/login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // ..
        toast.error("Sorry! " + errorMessage.slice(22, -2), {
          style: {
            backgroundColor: "red",
            color: "#fff",
          },
        });
      });
  };

  return (
    <div>
      <ChangeTitle title="Reset Password" />
      <form className="position-relative" onSubmit={updateUserPassword}>
        <p>Reset your password</p>
        <div className="input-group mb-3">
          <span
            style={{ height: "39px" }}
            className="input-group-text"
            id="basic-addon1"
          >
            <FontAwesomeIcon icon={faEnvelope} />
          </span>
          <input
            name="email"
            type="email"
            required
            className="form-control"
            placeholder="Email"
            aria-label="email"
            aria-describedby="basic-addon1"
          />
        </div>
        <button>Reset</button>
      </form>
      <div className="text-center">
        <Link to="/login">Go to login page</Link>
      </div>
    </div>
  );
};

export default ResetPassword;
