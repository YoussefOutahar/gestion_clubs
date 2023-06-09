import React, { useState, useEffect } from "react";
import { Box,TextField, IconButton, List, ListItem, ListItemText,styled } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { MatxLoading } from "../../components";
import { getForumFromClub } from "../../DataBase/Clients/ForumsClient";
import { getMembreClub } from "../../DataBase/Clients/MembersClient";
import { getCurrentUser, getUserMember } from "../../DataBase/Clients/UsersClient";
import { getMessagesByForum, addMessage } from "../../DataBase/Clients/MessagesClient";
import SimpleCard from '../../components/SimpleCard';

const Forums = () => {
    const [user, setUser] = useState();
    const [forum, setforums] = useState();

    useEffect(() => {
        getCurrentUser().then((CurrentUser) => {
            getUserMember(CurrentUser.id).then((member) => {
                getMembreClub(member[0].id).then((club) => {
                    getForumFromClub(club[0].id).then((forum) => {
                        setUser(CurrentUser);
                        setforums(forum[0]);
                    });
                });
            });
        });
    }, []);

    const [message, setMessage] = React.useState("");
    const [messages, setMessages] = React.useState([]);

    useEffect(() => {
        if (forum) {
            getMessagesByForum(forum.id).then((messages) => {
                setMessages(messages);
            });
        }
    }, [forum]);

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

            setMessages([...messages, newMessage]);
            setMessage("");
        }
    };
    return (
        <SimpleCard>
            <Box sx={{ position: "relative", marginLeft: "1%", marginRight: "1%", marginTop: "1%" }}>
            <div className="header">
                <h1>Forums</h1>
            </div>

            {forum ? (
                <Box sx={{ flex: "1 1 auto", borderRadius: "4px", overflow: "auto", p: 1 }}>
                    <Box
                        sx={{
                            borderRadius: "4px",
                            overflow: "auto",
                            maxHeight: "350px",
                            p: 1,
                        }}
                    >
                        <List>
                            {messages.map((msg, index) => (
                                <ListItem
                                    key={msg.id}
                                    sx={{
                                        textAlign: msg.user_id === user.id ? "right" : "left",
                backgroundColor: msg.user_id === user.id ? "lightBlue" : "grey",
                borderRadius: "4px",
                marginBottom: "8px",
                marginLeft: msg.user_id === user.id ? "auto" : "initial",
                maxWidth: "65%",
                wordWrap: "break-word",
                                    }}
                                >
                                    <ListItemText primary={msg.content} secondary={msg.date_creation}/>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                    <Box
                        sx={{ position: "relative", flexShrink: 0, display: "flex", alignItems: "center" }}
                    >
                        <TextField
                            label="Message"
                            value={message}
                            onChange={handleInputChange}
                            variant="outlined"
                            fullWidth
                            sx={{ mr: 1 }}
                        />
                        <IconButton color="primary" onClick={handleSendMessage}>
                            <SendIcon />
                        </IconButton>
                    </Box>
                </Box>
            ) : (
                <div className="centered-and-flexed">
                    <MatxLoading />
                </div>
            )}
        </Box>
        </SimpleCard>
    );
};

export default Forums;
