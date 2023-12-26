import React from "react";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import authStore from "../stores/authStore";

export default function RequireAuth(props) {
  const { checkLoggedIn, checkAuth } = authStore();

  useEffect(() => {
    if (checkLoggedIn === null) {
      checkAuth();
    }
  }, [checkLoggedIn, checkAuth]);

  if (checkLoggedIn === null) {
    return <div>Loading ....</div>;
  }
  if (checkLoggedIn === false) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div>{props.children}</div>
    </>
  );
}
