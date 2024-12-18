import { Box } from "@mui/material";
import React from "react";
import useStore from "../store/useStore";

const Display: React.FC = () => {
  const { counter } = useStore();
  return (
    <Box
      id="container"
      padding={"16px 0px"}
      height={"calc(100vh - 110px)"}
      sx={{ overflowY: "auto" }}
    >
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <Box
          borderRadius={"8px"}
          margin={"16px"}
          bgcolor={"#EEF6EE"}
          fontWeight={500}
          color={"##043C61"}
          padding={"20px"}
          border={"1px solid #96B999"}
        >
          {counter}
        </Box>
      </Box>
    </Box>
  );
};
export default Display;
