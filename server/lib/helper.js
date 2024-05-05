import { userSocketIDs } from "../index.js";

// Function to get the other member in a chat
export const getOtherMember = (members, userId) =>
  members.find((member) => member._id.toString() !== userId.toString());

  // Function to get sockets based on user IDs
export const getSockets = (users = []) => {
  const sockets = users.map((user) => userSocketIDs.get(user.toString()));
  return sockets;
};

// Function to convert a file to base64 string
export const getBase64 = (file) =>
  `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
