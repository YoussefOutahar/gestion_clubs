import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  styled,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { MatxLoading } from "../../components";
import { getForumFromClub } from "../../DataBase/services/ForumsService";
import { getMembreClub } from "../../DataBase/services/MembersService";
import { getCurrentUser, getUserMember } from "../../DataBase/services/UsersService";
import { getMessagesByForum, addMessage } from "../../DataBase/services/MessagesService";
import SimpleCard from "../../components/SimpleCard";

// Styled components for custom styling
const ForumContainer = styled(Paper)(({ theme }) => ({
  background: "#fff",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(2),
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  maxHeight: "80vh", // Adjust the maximum height as needed
  overflowY: "auto",
}));

const MessageList = styled(List)(({ theme }) => ({
  flex: "1",
  overflowY: "auto",
  width: "100%",
  padding: theme.spacing(2),
}));

const MessageItem = styled(ListItem)(({ theme, isCurrentUser }) => ({
  backgroundColor: isCurrentUser ? "#4caf50" : "#2196f3",
  borderRadius: theme.spacing(2),
  marginBottom: theme.spacing(2),
  wordWrap: "break-word",
  padding: theme.spacing(2),
  color: "#fff",
}));

const Header = styled(Typography)(({ theme }) => ({
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: theme.spacing(2),
}));

const MessageInputContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2),
  borderTop: "1px solid #ccc",
}));

const Forums = () => {
  const [user, setUser] = useState();
  const [forum, setForum] = useState();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [messagesToShow, setMessagesToShow] = useState(10); // Number of messages to display initially
  const messageListRef = useRef();
  const loadingMoreMessagesRef = useRef(false);

  useEffect(() => {
    getCurrentUser().then((CurrentUser) => {
      getUserMember(CurrentUser.id).then((member) => {
        getMembreClub(member[0].id).then((club) => {
          getForumFromClub(club[0].id).then((forum) => {
            setUser(CurrentUser);
            setForum(forum[0]);
          });
        });
      });
    }, []);
  }, []);

  useEffect(() => {
    if (forum) {
      getMessagesByForum(forum.id).then((newMessages) => {
        newMessages.sort((a, b) => b.date_creation - a.date_creation);
        setMessages(newMessages);
      });
    }
  }, [forum]);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = async () => {
    if (message.trim() !== "") {
      const newMessage = {
        forum_id: forum.id,
        user_id: user.id,
        content: message,
      };

      await addMessage(newMessage);

      setMessages([newMessage, ...messages]);
      setMessage("");
    }
  };

  const handleLoadMoreMessages = async () => {
    if (!loadingMoreMessagesRef.current) {
      loadingMoreMessagesRef.current = true;
      const oldestMessageDate = messages[messagesToShow - 1]?.date_creation;
      const olderMessages = await getMessagesByForum(forum.id, oldestMessageDate);

      if (olderMessages.length > 0) {
        setMessages([...olderMessages, ...messages]); // Prepend older messages
        setMessagesToShow(messagesToShow + olderMessages.length); // Increase the number of messages to show
      }

      loadingMoreMessagesRef.current = false;
    }
  };

  return (
    <SimpleCard>
      <ForumContainer>
        <Header variant="h1">Forums</Header>
        {forum ? (
          <Box sx={{ flex: "1", width: "100%", display: "flex", flexDirection: "column" }}>
            <MessageList ref={messageListRef} onScroll={handleLoadMoreMessages}>
              {messages.slice(0, messagesToShow).map((msg, index) => (
                <MessageItem key={msg.id} isCurrentUser={msg.user_id === user.id}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={msg.profilePictureUrl} // Assuming you have a URL for the profile picture
                      alt={msg.username}
                      style={{ width: "40px", height: "40px", borderRadius: "50%", marginRight: "8px" }}
                    />
                    <div>
                      <ListItemText
                        primary={`${msg.username} - ${new Date(msg.date_creation).toLocaleString()}`}
                        secondary={msg.content}
                        secondaryTypographyProps={{ style: { color: "white" } }}
                      />
                    </div>
                  </div>
                </MessageItem>
              ))}
            </MessageList>
            {messages.length > messagesToShow && (
              <div style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
                <Button variant="outlined" onClick={handleLoadMoreMessages}>
                  Load More Messages
                </Button>
              </div>
            )}
            <MessageInputContainer>
              <TextField
                label="Message"
                value={message}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                sx={{ marginRight: 1 }}
                inputProps={{ style: { color: "gray" } }}
              />
              <IconButton color="primary" onClick={handleSendMessage}>
                <SendIcon />
              </IconButton>
            </MessageInputContainer>
          </Box>
        ) : (
          <div className="centered-and-flexed">
            <MatxLoading />
          </div>
        )}
      </ForumContainer>
    </SimpleCard>
  );
};

export default Forums;
