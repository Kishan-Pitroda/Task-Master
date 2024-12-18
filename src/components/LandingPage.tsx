import React from "react";
import { Box, Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoDevIcon from "@mui/icons-material/LogoDev";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        textAlign="center"
      >
        <LogoDevIcon color="warning" fontSize="large" sx={{ mb: 2 }} />
        <Typography variant="h3" gutterBottom color="#ed6c02">
          Welcome to TaskMaster
        </Typography>
        <Typography variant="h6">
          TaskMaster is a simple and efficient task list application designed to
          help you manage your tasks with ease. Built with React for the front
          end, Express for the backend, and MongoDB for data storage, TaskMaster
          ensures a seamless experience for organizing your daily activities.
        </Typography>
        <Typography variant="body1">
          Create, edit, and keep track of your tasks effortlessly. Sign in now
          to get started and boost your productivity!
        </Typography>
        <Button
          variant="contained"
          color="warning"
          onClick={handleLogin}
          sx={{ mt: 3 }}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default LandingPage;
