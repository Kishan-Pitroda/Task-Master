import React from "react";
import {
  Routes,
  Route,
  NavLink,
  useNavigate,
} from "react-router-dom";
import Counter from "./components/Counter";
import Display from "./components/Display";
import { Box, Button } from "@mui/material";
import TaskList from "./components/TaskList";
import "./App.css";
import Login from "./components/Login";
import useStore from "./store/useStore";
import LogoDevIcon from "@mui/icons-material/LogoDev";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import LandingPage from "./components/LandingPage";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";

const App: React.FC = () => {
  const { user, setUser, getTaskList } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .post("/api/v1/users/logout")
      .then(() => {
        setUser(null);
        getTaskList();
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box>
      {user && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          bgcolor={"rgb(251, 251, 251)"}
          position={"sticky"}
          boxShadow={"2px 2px 2px 2px rgba(29, 26, 26, 0.1)"}
          top={"0px"}
          zIndex={1000}
          paddingRight={"16px"}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            gap={4}
            padding="16px"
          >
            <Box paddingTop={"4px"} marginRight={"20px"}>
              <LogoDevIcon color="warning" fontSize="large" />
            </Box>
            <NavLink
              to="/task-list"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Task List
            </NavLink>
            <NavLink
              to="/display-counter"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Counter Display Page
            </NavLink>
            <NavLink
              to="/update-counter"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Edit Counter Page
            </NavLink>
          </Box>
          <Box>
            <Button color="error" variant="contained" onClick={handleLogout}>
              <Box paddingRight={"8px"}>Logout</Box>
              <LogoutIcon color="inherit" />
            </Button>
          </Box>
        </Box>
      )}
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/display-counter" element={<Display />} />
          <Route path="/update-counter" element={<Counter />} />
          <Route path="/task-list" element={<TaskList />} />
        </Route>
      </Routes>
    </Box>
  );
};

export default App;
