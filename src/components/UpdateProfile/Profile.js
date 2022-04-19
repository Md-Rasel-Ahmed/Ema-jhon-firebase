import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sendEmailVerification } from "firebase/auth";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import auth from "../../firebase-init";
import ChangeTitle from "../ChangeTitle/ChangeTitle";
const Profile = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState("");
  const [userId, setUserId] = useState("");
  const user = auth.currentUser;
  useEffect(() => {
    if (user !== null) {
      // The user object has basic properties such as display name, email, etc.
      const displayName = user.displayName;
      const email = user.email;
      const photoURL = user.photoURL;
      const emailVerified = user.emailVerified;
      console.log(emailVerified);
      setDisplayName(displayName);
      setEmail(email);
      setUserId(user.uid);
      setIsEmailVerified(emailVerified.toString());
      // The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.
      const uid = user.uid;
    }
  }, []);
  const handleEmailVerified = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      toast.success("Verification code sended");
    });
  };
  return (
    <div>
      <ChangeTitle title="Profile" />
      <h3>USER ID :{userId.slice(20)}</h3>
      <p>FULL NAME :{displayName}</p>
      <p>EMAIL :{email}</p>
      <p>
        EMAIL VERIFIED :<strong>{isEmailVerified}</strong>
        {isEmailVerified === "false" && (
          <button
            onClick={handleEmailVerified}
            className="fs-5 ms-2 btn btn-link bg-dark text-lowercase "
          >
            varifi email
          </button>
        )}
      </p>
      <Link className="btn btn-success" to="/updateprofile/editprofile">
        <FontAwesomeIcon icon={faEdit} /> Edit Profile
      </Link>
    </div>
  );
};

export default Profile;
