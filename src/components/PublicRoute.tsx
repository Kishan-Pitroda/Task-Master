import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useStore from "../store/useStore";

const PublicRoute: React.FC = () => {
  const { user } = useStore();

  return user ? <Navigate to="/task-list" replace /> : <Outlet />;
};

export default PublicRoute;
