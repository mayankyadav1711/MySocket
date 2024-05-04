import React from "react";
import { Avatar, Stack, Typography, IconButton } from "@mui/material";
import {
  Face as FaceIcon,
  AlternateEmail as UserNameIcon,
  CalendarToday as CalendarIcon, // Changed the Calendar icon
  Info as BioIcon // New icon for bio
} from "@mui/icons-material";
import moment from "moment";
import { transformImage } from "../../lib/features";
import {
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
  Instagram as InstagramIcon,
} from "@mui/icons-material"; // Importing social icons

const Profile = ({ user }) => {
  return (
    <Stack
      spacing={"2rem"}
      direction={"column"}
      alignItems={"center"}
      sx={{
        backgroundColor: "rgb(244, 245, 243)",
        padding: "2rem",
        borderRadius: "12px",
        backgroundImage: `url('https://i.ibb.co/7GK6Gnr/gi-Dck-OUM5a.png')`, // Background image
        backgroundSize: "cover",
      }}
    >
      <Avatar
        src={user?.avatar?.url}
        sx={{
          width: 200,
          height: 200,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid white",
        }}
      />
      <ProfileCard heading={"Bio"} text={user?.bio}  /> {/* Updated icon for Bio */}
      <ProfileCard
        heading={"Username"}
        text={user?.username}
        Icon={<UserNameIcon />}
      />
      <ProfileCard heading={"Name"} text={user?.name} Icon={<FaceIcon />} />
      <ProfileCard
        heading={"Joined"}
        text={moment(user?.createdAt).fromNow()}
        Icon={<CalendarIcon />} // Changed the Calendar icon
      />
      {/* Adding social icons */}
     <Stack direction="row" spacing={2}>
  <IconButton
    href="https://www.linkedin.com/"
    target="_blank"
    sx={{ color: "#0077B5", fontSize: "1.5rem" }} // Increased size
  >
    <LinkedInIcon />
  </IconButton>
  <IconButton
    href="https://github.com/"
    target="_blank"
    sx={{ color: "#211F1F", fontSize: "1.5rem" }} // Increased size
  >
    <GitHubIcon />
  </IconButton>
  <IconButton
    href="https://www.instagram.com/"
    target="_blank"
    sx={{ color: "#C13584", fontSize: "1.5rem" }} // Increased size
  >
    <InstagramIcon />
  </IconButton>
</Stack>

    </Stack>
  );
};

const ProfileCard = ({ text, Icon, heading }) => (
  <Stack
    direction={"row"}
    alignItems={"center"}
    spacing={"1rem"}
    textAlign={"center"}
  >
    {Icon && Icon}

    <Stack>
      <Typography variant="body1" fontWeight={"bold"}>{text}</Typography>
      <Typography color={"gray"} fontWeight={"bold"} variant="caption">
        {heading}
      </Typography>
    </Stack>
  </Stack>
);

export default Profile;
