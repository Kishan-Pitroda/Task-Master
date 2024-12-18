import React from "react";
import { Box, Button, Container } from "@mui/material";
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
        <LogoDevIcon color="warning" fontSize="large" />
        <Box
          color="#ed6c02"
          fontWeight={600}
          fontSize="2.5rem"
          marginBottom="16px"
        >
          Welcome to TaskMaster
        </Box>
        <Box color="#FFF" fontWeight={400} fontSize="18px" lineHeight="1.5">
          TaskMaster is a simple and efficient task list application designed to
          help you manage your tasks with ease. Built with React for the front
          end, Express for the backend, and MongoDB for data storage, TaskMaster
          ensures a seamless experience for organizing your daily activities.
        </Box>
        <Box color="#FFF" paddingTop="16px" fontSize="14px" lineHeight="1.5">
          Create, edit, and keep track of your tasks effortlessly. Sign in now
          to get started and boost your productivity!
        </Box>
        <Button
          variant="contained"
          color="warning"
          onClick={handleLogin}
          sx={{ mt: 3 }}
        >
          Sign In
        </Button>
      </Box>
    </Container>
  );
};

export default LandingPage;
