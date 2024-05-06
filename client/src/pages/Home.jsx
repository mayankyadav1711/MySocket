import React from "react";
import AppLayout from "../components/layout/AppLayout";
import { Box, Typography } from "@mui/material";
import { grayColor } from "../constants/color";


const Home = () => {
  return (
    <Box
      sx={{

        // https://i.ibb.co/Bwp0pt4/Picsart-24-05-06-12-26-52-604.jpg
        backgroundImage: `url("https://i.ibb.co/6W4L0gQ/Picsart-24-05-06-12-27-03-543.png")`, // Use the imported SVG file as background image
        backgroundColor: "#f5f5dc63", // Replace with your desired background color
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
