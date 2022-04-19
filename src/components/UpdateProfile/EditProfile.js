import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  reauthenticateWithCredential,
  updateEmail,
  updateProfile,
  EmailAuthProvider,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../firebase-init";
import ChangeTitle from "../ChangeTitle/ChangeTitle";
const user = auth.currentUser;

const EditProfile = (props) => {
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const navigate = useNavigate();

  const handleEditName = (e) => {
    setEditName(e.target.value);
  };
  const handleEmail = (e) => {
    setEditEmail(e.target.value);
  };
  let pass = "123456";
  const handleSave = async () => {
    // Update profile name
    if (editName) {
      await updateProfile(auth.currentUser, {
        displayName: editName,
        photoURL: "https://example.com/jane-q-user/profile.jpg",
      })
        .then(() => {
          // Name update
          navigate("/updateprofile/profile");
          toast.success("Edit succesfull!", {
            style: {
              backgroundColor: "green",
              color: "#fff",
            },
          });
        })
        .catch((error) => {
          toast.error(error.message.slice(22, -2), {
            style: {
              backgroundColor: "red",
              color: "#fff",
            },
          });
        });
    }
    //   Email update
    if (editEmail) {
      let credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        pass
      );
      reauthenticateWithCredential(auth.currentUser, credential);
      await updateEmail(auth.currentUser, editEmail)
        .then(() => {
          navigate("/updateprofile/profile");
          toast.success("Edit succesfull!", {
            style: {
              backgroundColor: "green",
              color: "#fff",
            },
          });
        })
        .catch((error) => {
          toast.error(error.message.slice(22, -2), {
            style: {
              backgroundColor: "red",
              color: "#fff",
            },
          });
        });
    }
  };
  return (
    <div>
      <ChangeTitle title="Edit Profile" />
      <h2 className="text-center mb-3">Edit your profile</h2>
      <p className="text-danger text-center">
        If you login with email, you will not be able to update it
      </p>
      <input
        onBlur={handleEditName}
        type="text"
        placeholder="Type your new name..."
      />
      <input
        onBlur={handleEmail}
        name="email"
        type="email"
        placeholder="Type your new email...."
      />
      <br />
      <button className="btn bg-primary" onClick={handleSave}>
        <FontAwesomeIcon className="me-2" icon={faSave} />
        Save
      </button>
      <Link className="btn btn-danger ms-5" to="/updateprofile/profile">
        Cancel
      </Link>
    </div>
  );
};

export default EditProfile;
