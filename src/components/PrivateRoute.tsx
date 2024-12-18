import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useStore from "../store/useStore";

const PrivateRoute: React.FC = () => {
  const { user } = useStore();

  return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
