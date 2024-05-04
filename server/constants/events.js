const ALERT = "ALERT";
const REFETCH_CHATS = "REFETCH_CHATS";

const NEW_ATTACHMENT = "NEW_ATTACHMENT";
const NEW_MESSAGE_ALERT = "NEW_MESSAGE_ALERT";

const NEW_REQUEST = "NEW_REQUEST";
const NEW_MESSAGE = "NEW_MESSAGE";

const START_TYPING = "START_TYPING";
const STOP_TYPING = "STOP_TYPING";

const CHAT_JOINED = "CHAT_JOINED";
const CHAT_LEAVED = "CHAT_LEAVED";

const ONLINE_USERS = "ONLINE_USERS";

export {
  ALERT,
  REFETCH_CHATS,
  NEW_ATTACHMENT,
  NEW_MESSAGE_ALERT,
  NEW_REQUEST,
  NEW_MESSAGE,
  START_TYPING,
  STOP_TYPING,
  CHAT_JOINED,
  CHAT_LEAVED,
  ONLINE_USERS,
};

// ALERT: Generic alert event.
// REFETCH_CHATS: Event to trigger a refresh of chat data.
// NEW_ATTACHMENT: Event for receiving a new attachment in a chat.
// NEW_MESSAGE_ALERT: Event to alert users about a new message.
// NEW_REQUEST: Event for receiving a new request (possibly from a user).
// NEW_MESSAGE: Event for receiving a new message in a chat.
// START_TYPING and STOP_TYPING: Events for indicating when a user starts or stops typing in a chat.
// CHAT_JOINED and CHAT_LEAVED: Events for notifying when a user joins or leaves a chat.
// ONLINE_USERS: Event for updating the list of online users in real-time.
