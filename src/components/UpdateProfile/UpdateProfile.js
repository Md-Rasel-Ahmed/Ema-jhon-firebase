import { faKey, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteUser, reauthenticateWithCredential } from "firebase/auth";
import React from "react";
import toast from "react-hot-toast";
import { Link, Outlet } from "react-router-dom";
import auth from "../../firebase-init";
const user = auth.currentUser;

const UpdateProfile = (props) => {
  // Delete user from firebase account
  const users = auth.currentUser;
  const delteUser = () => {
    props.setAccount(false);
    deleteUser(users)
      .then(() => {
        if (users) {
          // user reAuthentication
          const credential = reAuthen();
          reauthenticateWithCredential(user, credential)
            .then(() => {})
            .catch((error) => {});
          toast.success("Your account has been deleted", {
            style: {
              backgroundColor: "green",
              color: "#fff",
            },
          });
        }
      })
      .catch((error) => {
        toast.error(error.message.slice(22, -2), {
          style: {
            backgroundColor: "red",
            color: "#fff",
          },
        });
      });
  };
  // user re authenticated
  const reAuthen = () => {
    let email = prompt("Enter Your Email");
    let pass = prompt("Enter your password");
  };
  return (
    <div>
      <div className="container pe-0 bg-dark  mt-5">
        <div className="row   p-5">
          <div className="col-lg-4 col-sm-12 text-light border p-3">
            <div className="list-group text-center">
              <Link
                className="mb-3 list-group-item list-group-item-action active text-uppercase"
                to="/updateprofile/updatepassword"
              >
                <FontAwesomeIcon icon={faKey} /> Update Password
              </Link>

              <Link
                className="mb-3 list-group-item list-group-item-action text-uppercase"
                to="/updateprofile/profile"
              >
                <FontAwesomeIcon icon={faUser} /> Your Profile
              </Link>

              <button
                type="button"
                className="mb-3 list-group-item list-group-item-action"
              >
                <Link to="/updateprofile/preloader">Preloader</Link>
              </button>
              <button
                type="button"
                className="mb-3 list-group-item list-group-item-action"
              >
                A fourth button item
              </button>
              <button onClick={delteUser} className="btn btn-danger">
                <FontAwesomeIcon icon={faTrash} /> Delete Account
              </button>
            </div>
          </div>
          <div className="col-lg-8 col-sm-12 text-light border p-3 mt-lg-0 mt-2">
            <Outlet />
          </div>
        </div>
      </div>
      <div className="text-center">
        <Link to="/">Go to home page</Link>
      </div>
    </div>
  );
};

export default UpdateProfile;
