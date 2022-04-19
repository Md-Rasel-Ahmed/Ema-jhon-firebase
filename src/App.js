import "./App.css";
import Header from "./components/Header/Header";
import Shop from "./components/Shoping/Shop";
import { Route, Routes } from "react-router-dom";
import Singup from "./components/Singup/Singup";
import Singin from "./components/Singin/Singin";
import React, { useState } from "react";
import ReviewOrder from "./components/ReviewOrder/ReviewOrder";
import RequirAuth from "./components/RequirAuth/RequirAuth";
import Chekout from "./components/Chekout/Chekout";
import ThankYou from "./components/ThankYou/ThankYou";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import UpdateProfile from "./components/UpdateProfile/UpdateProfile";
import UpdatePassword from "./components/UpdateProfile/UpdatePassword";
import Profile from "./components/UpdateProfile/Profile";
import EditProfile from "./components/UpdateProfile/EditProfile";
import MouseParticles from "react-mouse-particles";
import Preloaders from "./components/UpdateProfile/Preloaders";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./firebase-init";
import { sendEmailVerification } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
function App() {
  const [account, setAccount] = useState(false);
  const [user, setUser] = useAuthState(auth);
  const [isVeri, setIsVeri] = useState(false);
  const handleEmailVerified = () => {
    console.log("done");
    sendEmailVerification(auth.currentUser).then(() => {
      toast("Verification code sended");
    });
  };
  return (
    <React.Fragment>
      <div className="App">
        <Header setAccount={setAccount} account={account}></Header>
        <br />
        <br />
        <br />
        {user?.emailVerified === false ? (
          <div
            className=" mt-2 py-1 text-center w-50 mx-auto alert alert-warning alert-dismissible fade show"
            role="alert"
          >
            <p>
              Verify your email{" "}
              <a href="#" onClick={handleEmailVerified}>
                Click here
              </a>{" "}
            </p>
            <button
              type="button"
              className="btn-close btn-danger p-2"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        ) : (
          ""
        )}
        <Routes>
          <Route path="/" element={<Shop></Shop>}></Route>
          <Route path="/singup" element={<Singup></Singup>}></Route>
          {user?.emailVerified === true && (
            <Route path="/chekout" element={<Chekout></Chekout>}></Route>
          )}
          <Route
            path="/chekout"
            element={
              <RequirAuth>
                {user?.emailVerified === true && <Chekout></Chekout>}
              </RequirAuth>
            }
          ></Route>
          <Route path="/thankyou" element={<ThankYou></ThankYou>}></Route>
          <Route
            path="/resetPassword"
            element={<ResetPassword></ResetPassword>}
          ></Route>
          <Route
            path="/revieworder"
            element={<ReviewOrder></ReviewOrder>}
          ></Route>
          <Route path="/login" element={<Singin></Singin>}></Route>
          <Route
            path="/updateprofile"
            element={
              <RequirAuth>
                <UpdateProfile setAccount={setAccount}></UpdateProfile>
              </RequirAuth>
            }
          >
            <Route
              path="updatepassword"
              element={<UpdatePassword></UpdatePassword>}
            ></Route>
            <Route path="profile" element={<Profile></Profile>}></Route>
            <Route
              path="editprofile"
              element={<EditProfile></EditProfile>}
            ></Route>
            <Route path="preloader" element={<Preloaders></Preloaders>}></Route>
          </Route>
        </Routes>
      </div>
      <MouseParticles g={1} color="random" cull="col,image-wrapper" />
      <Toaster />
    </React.Fragment>
  );
}

export default App;
