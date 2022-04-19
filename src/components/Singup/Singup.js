import React, { useEffect, useState } from "react";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useSendEmailVerification,
  useSignInWithFacebook,
  useSignInWithGoogle,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import "./singup.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompress, faG, faMessage } from "@fortawesome/free-solid-svg-icons";
import auth from "../../firebase-init";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import toast from "react-hot-toast";
import ChangeTitle from "../ChangeTitle/ChangeTitle";

const Singup = () => {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const [signInWithFacebook, facebookUser, facebookLoading, facebookError] =
    useSignInWithFacebook(auth);
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);
  const [sendEmailVerification] = useSendEmailVerification(auth);
  const [isCheck, setIsCheck] = useState(true);
  const [errors, setErrors] = useState("");
  const [name, setName] = useState("");
  // hande sinup with firebase
  const handleSingUp = async (e) => {
    e.preventDefault();
    // let name = e.target.name.value;
    let name = e.target.lName.value;
    // setName(name);
    let email = e.target.email.value;
    // let phone = e.target.number.value;
    let check = e.target.check.check;
    console.log(check);
    let password = e.target.password.value;
    let confirmPassowrd = e.target.confirmPassowrd.value;
    if (password === confirmPassowrd) {
      await createUserWithEmailAndPassword(email, password);
      await updateProfile({ displayName: name });
      await sendEmailVerification();
      if (error) {
        toast.error(error.message.slice(22, -2), {
          style: { backgroundColor: "red", color: "#fff" },
        });
      }
      setErrors("");
    } else {
      setErrors("Confirm Password did not match!");
      return false;
    }
  };
  // console.log(user);
  let navigate = useNavigate();
  if (user || gUser || facebookUser) {
    toast.success("Sing up succesfull");
    navigate("/");
  }
  console.log(isCheck);
  return (
    <div className="mt-4 pb-5">
      <ChangeTitle title="Singup" />
      <h1 align="center">REGISTER NOW!!</h1>
      <div className="singup-form">
        <form onSubmit={handleSingUp}>
          <div className="row">
            <div className="col-6">
              <div className="name">
                <input
                  className="w-100"
                  name="name"
                  type="text"
                  placeholder="First Name"
                  required
                />
              </div>
            </div>
            <div className="col-6">
              <div className="lName">
                <input
                  className="w-100"
                  name="lName"
                  type="text"
                  placeholder="Last Name"
                  required
                />
              </div>
            </div>
          </div>
          <div className="email">
            <input
              className="w-100"
              type="email"
              name="email"
              placeholder="Your Email"
              required
            />
          </div>
          <div className="phone">
            <input
              className="w-100"
              type="number"
              name="number"
              placeholder="Phone Number (Optional)"
              // required
            />
          </div>
          <div className="password">
            <input
              className="w-100"
              type="password"
              name="password"
              placeholder=" Password"
              required
            />
            <small>Password must be at least 6 characters</small>
          </div>
          <div className="password">
            <input
              className="w-100"
              type="password"
              name="confirmPassowrd"
              placeholder="Confirm Password"
              required
            />
          </div>
          <div className="form-check py-2">
            <input
              onClick={(e) => setIsCheck(!isCheck)}
              className="form-check-input"
              type="checkbox"
              value=""
              name="check"
              id="flexCheckChecked"
            />
            <label
              className="form-check-label ms-2 mt-1"
              htmlFor="flexCheckChecked"
            >
              Accept terms and conditions
            </label>
          </div>
          <small style={{ color: "red" }}>{errors}</small>
          <button disabled={isCheck} className="loginBtn w-100">
            Sing Up
          </button>
          <br />
          <p>
            Already have a new account?<Link to="/login">Login</Link>
          </p>
        </form>
        <div className="or">
          <span className="firstLine"></span>
          <span>or</span>
          <span className="secondLine"></span>
        </div>
        <div className="google-login">
          <button onClick={() => signInWithGoogle()} className="googleBtn">
            <FontAwesomeIcon icon={faG} />
            Singup with Google
          </button>
        </div>
        <div className="facebook">
          <button
            onClick={() => signInWithFacebook()}
            className="facebookBtn ms-2 w-100  mt-3"
          >
            <img
              style={{ width: "30px", height: "30px", marginRight: "20px" }}
              src="https://www.teahub.io/photos/full/11-115962_facebook-logo-png-transparent-background-facebook-png.png"
              alt=""
            />
            Singup with facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default Singup;
