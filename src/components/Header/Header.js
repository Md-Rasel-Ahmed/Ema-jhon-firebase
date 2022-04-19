import img from "../../images/Logo.svg";
import "./header.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase-init";
import { signOut } from "firebase/auth";
import Account from "../Account/Account";

const Header = (props) => {
  const [disPlay, setDisPlay] = useState("");
  const [user] = useAuthState(auth);
  const showAccount = () => {
    if (props.account) {
      props.setAccount(false);
    }
    if (!props.account) {
      props.setAccount(true);
    }
  };
  let userNameStyle = {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    border: "1px solid #ddd",
    textTransform: "uppercase",
    textAlign: "center",
    marginTop: "10px",
    cursor: "pointer",
    position: "relative",
  };
  let imgStyle = {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    position: "absolute",
    left: "0",
    top: "0",
  };
  return (
    <div className="bg-dark">
      <nav className="fixed-top bg-dark ">
        <div className="logo d-flex">
          <Link to="/">
            <img src={img} alt="" />
          </Link>
          <Link className="nav-link text-light mt-2 " to="/revieworder">
            HOME
          </Link>
          <Link className="nav-link text-light mt-2" to="/revieworder">
            ORDERS
          </Link>
        </div>
        <div className="menus">
          <ul className="p-0">
            {user ? (
              <div
                style={userNameStyle}
                className="bg-primary"
                onClick={showAccount}
              >
                <h2 className="mt-1">
                  {!user.photoURL && user.displayName?.slice(0, 1)}
                </h2>
                {user.photoURL && (
                  <img style={imgStyle} src={user.photoURL} alt="P" />
                )}

                {/* {user.photoURL && <img src={user.photoURL} />} */}
              </div>
            ) : (
              <Link
                style={{
                  backgroundColor: "orange",
                  height: "35px",
                  marginTop: "10px",
                  padding: "5px",
                  borderRadius: "4px",
                  color: "#fff",
                }}
                to="/singup"
              >
                Singup
              </Link>
            )}
          </ul>
          <div style={{ position: "absolute", top: "0", right: "0" }}>
            {props.account && (
              <Account
                setAccount={props.setAccount}
                account={props.account}
              ></Account>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
