import { Box, Button } from "@mui/material";
import React from "react";
import useStore from "../store/useStore";

const Counter: React.FC = () => {
  const { counter, increment, decrement, reset } = useStore();
  return (
    <Box id="container"
    padding={"16px 0px"}
    height={"calc(100vh - 107px)"}
    sx={{ overflowY: "auto" }}>
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <Box
          borderRadius={"8px"}
          margin={"16px"}
          bgcolor={"#EEF6EE"}
          fontFamily={"Roboto"}
          fontWeight={500}
          color={"##043C61"}
          padding={"20px"}
          border={"1px solid #96B999"}
        >
          {counter}
        </Box>
      </Box>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={2}
      >
        <Button variant="contained" color="success" onClick={increment}>
          Increment
        </Button>
        <Button variant="contained" color="error" onClick={decrement}>
          Decrement
        </Button>
        <Button variant="contained" color="info" onClick={reset}>
          Reset
        </Button>
      </Box>
    </Box>
  );
};
export default Counter;
