import { Box, Button, Paper, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../store/useStore";
import LogoDevIcon from "@mui/icons-material/LogoDev";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setUser, setSnackbarMessage } = useStore();

  const handleLogin = () => {
    const payload = {
      username,
      email,
      password,
    };
    axios
      .post("/api/v1/users/login", payload)
      .then((response) => {
        setSnackbarMessage(true, "User logged in successfully!", "success");
        setUser(response.data?.data?.user);
        navigate("/task-list");
      })
      .catch(() => {
        setSnackbarMessage(true, "Login failed!", "error");
      });
  };

  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      m={"auto"}
      height={"100vh"}
    >
      <Paper sx={{ borderRadius: "16px" }}>
        <Box
          bgcolor={"rgb(251, 251, 251)"}
          width={560}
          borderRadius={"16px"}
          padding={"16px 24px"}
        >
          <Box
            color={"#ed6c02"}
            fontWeight={600}
            fontSize={"24px"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            margin={"16px 0px 0px"}
          >
            <LogoDevIcon color="warning" fontSize="large" sx={{ mb: 2 }} />
          </Box>
          <Box
            color={"#ed6c02"}
            fontWeight={600}
            fontSize={"24px"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            margin={"0px 0px 16px"}
          >
            Sign In
          </Box>
          <Box
            display={"flex"}
            flexDirection={"column"}
            gap={"16px"}
            marginBottom={"16px"}
          >
            <Box>
              <TextField
                fullWidth
                label="Username"
                color="warning"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Box>
            <Box
              color={"#ed6c02"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              Or
            </Box>
            <Box>
              <TextField
                fullWidth
                label="Email"
                color="warning"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                label="Password"
                color="warning"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Button
                fullWidth
                variant="contained"
                color="warning"
                onClick={handleLogin}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
export default Login;
