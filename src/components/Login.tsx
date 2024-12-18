import { Alert, Box, Button, Paper, Snackbar, TextField } from "@mui/material";
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
  const [isError, setIsError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { setUser } = useStore();

  const handleLogin = () => {
    const payload = {
      username,
      email,
      password,
    };
    axios
      .post("/api/v1/users/login", payload)
      .then((response) => {
        setIsSuccess(true);
        setTimeout(() => {
          setUser(response.data?.data?.user);
          navigate("/task-list");
        }, 6000);
      })
      .catch(() => {
        setIsError(true);
      });
  };

  const closeSnackbar = () => {
    setIsError(false);
    setIsSuccess(false);
  };

  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      m={"auto"}
      height={"100vh"}
    >
      <Snackbar
        open={isSuccess || isError}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={closeSnackbar}
          severity={isSuccess ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {isSuccess ? "User logged in successfully!" : "Error while login"}
        </Alert>
      </Snackbar>
      <Paper>
        <Box
          bgcolor={"rgb(251, 251, 251)"}
          width={560}
          borderRadius={"8px"}
          padding={"16px 24px"}
        >
          <Box
            color={"#ed6c02"}
            fontWeight={600}
            fontFamily={"Roboto"}
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
            fontFamily={"Roboto"}
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
              fontFamily={"Roboto"}
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
