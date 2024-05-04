import React from "react";
import AppLayout from "../components/layout/AppLayout";
import { Box, Typography } from "@mui/material";
import { grayColor } from "../constants/color";


const Home = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url("https://i.ibb.co/Vq8K2kZ/Picsart-24-05-04-23-36-54-582.png")`, // Use the imported SVG file as background image
        backgroundColor: "rgb(255, 255, 255)", // Replace with your desired background color
        backgroundSize: "cover", // Cover the entire box
        backgroundRepeat: "no-repeat", // Do not repeat the image
        height: "100%",
      }}
    >
      {/* <Typography p={"2rem"} variant="h5" textAlign={"center"}>
        Select a friend to chat
      </Typography> */}
    </Box>
  );
};

export default AppLayout()(Home);
