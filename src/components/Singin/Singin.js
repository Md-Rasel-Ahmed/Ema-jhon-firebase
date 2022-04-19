import React, { useEffect, useState } from "react";
import "./singin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faG } from "@fortawesome/free-solid-svg-icons";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  useSignInWithEmailAndPassword,
  useSignInWithFacebook,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import auth from "../../firebase-init";
import { css } from "@emotion/react";
import { RingLoader } from "react-spinners";
import toast from "react-hot-toast";
import ChangeTitle from "../ChangeTitle/ChangeTitle";

const Singin = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, googleUser, gLoading, gError] =
    useSignInWithGoogle(auth);
  const [signInWithFacebook, fbUser, fbLoading, fbError] =
    useSignInWithFacebook(auth);

  const navigate = useNavigate();
  const location = useLocation();
  // hande singin
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: black;
  `;
  if (loading) {
    return (
      <RingLoader
        className="text-primary"
        loading={loading}
        css={override}
        size={70}
      />
    );
  }
  const handleSingin = async (e) => {
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;
    await signInWithEmailAndPassword(email, password);
  };
  let from = location.state?.from?.pathname || "/";
  if (googleUser || user || fbUser) {
    toast.success("Login successfull");
    navigate(from, { replace: true });
  }
  // if (googleUser || user || fbUser) {
  //   navigate("/");
  // }

  return (
    <div className="mt-4">
      <ChangeTitle title="Singin"></ChangeTitle>
      <h1 align="center"> LOGIN NOW!!</h1>
      <div className="loging-form">
        <form onSubmit={handleSingin}>
          <div className="email">
            <input
              className="w-100"
              type="email"
              name="email"
              placeholder="Your Email"
              required
            />
          </div>
          <div className="password">
            <input
              className="w-100"
              type="password"
              name="password"
              placeholder="Your Password"
              required
            />
          </div>
          {error && (
            <small style={{ color: "red" }}>
              Sorry !{error.message.slice(22, -2)}
            </small>
          )}

          <button className="loginBtn w-100">Login</button>
          <br />
          <h5>
            <a
              target="_blank"
              href="https://mail.google.com/mail/u/0/#inbox"
            ></a>
          </h5>
          {/* <a href="#">Forget your password?</a> */}
          <Link to="/resetPassword">Forget your password?</Link>
          <br />
          <Link to="/singup">Create an account</Link>
        </form>
        <div className="or">
          <span className="firstLine"></span>
          <span>or</span>
          <span className="secondLine"></span>
        </div>
        <div>
          <button onClick={() => signInWithGoogle()} className="googleBtn">
            <FontAwesomeIcon icon={faG} />
            Singin with Google
          </button>
        </div>
        <div className="facebook">
          <button
            onClick={async () => {
              await signInWithFacebook();
              fbError && toast.error(fbError.message.slice(22, -2));
            }}
            className="facebookBtn ms-2 w-100  mt-3"
          >
            <img
              style={{ width: "30px", height: "30px", marginRight: "20px" }}
              src="https://www.teahub.io/photos/full/11-115962_facebook-logo-png-transparent-background-facebook-png.png"
              alt=""
            />
            Singin with facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default Singin;
