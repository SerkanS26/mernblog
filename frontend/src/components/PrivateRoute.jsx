import React from "react";

// React-Router-Dom
import { Outlet, Navigate } from "react-router-dom";

// Redux
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
