import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../../firebase-init";
import { css } from "@emotion/react";
import { RingLoader } from "react-spinners";

const RequirAuth = ({ children }) => {
  const [user, UserLoading] = useAuthState(auth);
  let [loading, setLoading] = useState(true);
  let location = useLocation();
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: black;
  `;
  if (UserLoading) {
    return (
      <RingLoader
        className="text-primary"
        loading={loading}
        css={override}
        size={70}
      />
    );
  }
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
};

export default RequirAuth;
