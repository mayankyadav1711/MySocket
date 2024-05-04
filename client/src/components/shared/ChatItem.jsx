import React, { memo } from "react";
import { Link } from "../styles/StyledComponents";
import { Box, Stack, Typography } from "@mui/material";
import AvatarCard from "./AvatarCard";
import { motion } from "framer-motion";

const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeleteChat,
}) => {
  return (
    
  
    <Link
      sx={{
        padding: "0",
      }}
      to={`/chat/${_id}`}
      onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
    >
      <motion.div
        initial={{ opacity: 0, y: "-100%" }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 * index }}
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          backgroundColor: sameSender ? "rgb(38, 38, 38)" : "rgba(255, 255, 255,0.5)",
          color: sameSender ? "white" : "unset",
          borderRadius: sameSender ? "15px" : "15px",
          position: "relative",
          padding: "1rem",
          borderBottom: "1px solid #cfd8dc", // One-line separation
        }}
      >
        <AvatarCard avatar={avatar} />

        <Stack>
          <Typography fontFamily="'SF Pro', sans-serif">{name}</Typography>
          {newMessageAlert && (
            <Typography fontFamily="'SF Pro', sans-serif"><span> </span>{newMessageAlert.count} New Message</Typography>
          )}
        </Stack>

        {isOnline && (
          <Box
            sx={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "green",
              position: "absolute",
              top: "50%",
              right: "1rem",
              transform: "translateY(-50%)",
            }}
          />
        )}
      </motion.div>
    </Link>
 
  );
};

export default memo(ChatItem);
