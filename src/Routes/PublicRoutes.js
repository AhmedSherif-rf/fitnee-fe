import { guestRole } from "./routeConfig";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import functions from "../utils/functions";
import { useNavigate } from "react-router-dom";
import React, { useLayoutEffect } from "react";
import { setGuest } from "../Redux/features/User/userSlice";

export function PublicRoute({ Component, props }) {
  const { isGuest, user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!isGuest && props.role === guestRole) {
      dispatch(setGuest(true));
    }
    if (user) {
      navigate(
        functions.getInitialUrl(
          user?.email === "admin@admin.com" ? "Admin" : user?.role
        )
      );
    }
  }, [dispatch, isGuest, navigate, props.role, user]);

  return <Component {...props} />;
}
