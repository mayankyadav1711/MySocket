import React, { useState } from "react";
import { Stack, TextField, InputAdornment, IconButton } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import ChatItem from "../shared/ChatItem";

const ChatList = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessagesAlert = [
    {
      chatId: "",
      count: 0,
    },
  ],
  handleDeleteChat,
}) => {
  const [searchText, setSearchText] = useState("");

  // Filter chats based on search text
  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (

       <div style={{ position: "relative", width: "100%", height: "100vh", backgroundColor: "rgb(232, 230, 230)", backgroundImage:`url("https://i.ibb.co/7GK6Gnr/gi-Dck-OUM5a.png")` }}>
      <TextField
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        variant="outlined"
        placeholder="Search"
        margin="normal"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton sx={{ backgroundColor: "white" }}>
                <SearchIcon  />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          backgroundColor: "rgb(232, 230, 230)",
          backgroundImage:`url("https://i.ibb.co/7GK6Gnr/gi-Dck-OUM5a.png")`,
          "& .MuiOutlinedInput-root": {
            borderRadius: "5px",
            "& fieldset": {
              borderColor: "transparent",
            },
            "&:hover fieldset": {
              borderColor: "transparent",
            },
            "&.Mui-focused fieldset": {
              borderColor: "transparent",
            },
          },
          "& .MuiOutlinedInput-input": {
            backgroundColor: "white", // Grey background color for typing area
            borderRadius: "5px",
            padding: "10px",
            marginRight: "12px",
          },
        }}
      />
      <Stack
        width={w}
        direction={"column"}
        overflow={"auto"}
        height={"100%"}
        sx={{
          backgroundImage: `url('https://i.ibb.co/7GK6Gnr/gi-Dck-OUM5a.png')`, // Replace 'your-background-image-url' with the actual URL
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          borderRadius: "10px",
          backgroundColor: "rgb(232, 230, 230)", // Add a semi-transparent black background color
          padding: "20px", // Add padding to create space between the background and the content
        }}
      >
        {filteredChats.map((data, index) => {
          const { avatar, _id, name, groupChat, members } = data;

          const newMessageAlert = newMessagesAlert.find(
            ({ chatId }) => chatId === _id
          );

          const isOnline = members?.some((member) =>
            onlineUsers.includes(member)
          );

          return (
            <ChatItem
              index={index}
              newMessageAlert={newMessageAlert}
              isOnline={isOnline}
              avatar={avatar}
              name={name}
              _id={_id}
              key={_id}
              groupChat={groupChat}
              sameSender={chatId === _id}
              handleDeleteChat={handleDeleteChat}
            />
          );
        })}
      </Stack>
    </div>
  );
};

export default ChatList;
