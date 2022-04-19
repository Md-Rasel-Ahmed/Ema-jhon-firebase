import {
  faArrowAltCircleLeft,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteUser, signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../../firebase-init";
import "./account.css";
import ChangeTitle from "../ChangeTitle/ChangeTitle";

const Account = (props) => {
  const [user] = useAuthState(auth);
  // handle sing out
  const handleSingOut = () => {
    props.setAccount(false);
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <>
      <ChangeTitle title="Account"></ChangeTitle>
      <div className="account">
        <p>Name : {user?.displayName}</p>
        <p>Email : {user?.email}</p>
        <Link to="/updateprofile" className="btn btn-danger">
          View Profile
        </Link>
        <br />
        <hr />
        <button className="btn mt-4" onClick={handleSingOut}>
          <FontAwesomeIcon icon={faArrowAltCircleLeft} /> Logout
        </button>

        <p></p>
      </div>
    </>
  );
};

export default Account;
