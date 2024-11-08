import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function PrivateRoute({ Component, role, props }) {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/");
    }
  }, [navigate, user]);

  if (user) {
    return <Component {...props} />;
  } else {
    return null;
  }
}
