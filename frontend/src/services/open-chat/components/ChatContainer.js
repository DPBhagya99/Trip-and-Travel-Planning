// src/services/open-chat/components/ChatContainer.js
import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import SearchUsersDialog from './SearchUsersDialog';

const ChatContainer = () => {
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [searchDialogOpen, setSearchDialogOpen] = useState(false);

    const startChat = (user) => {
        // Check if the user already exists in the chat list
        const existingChat = chats.find(chat => chat._id === user._id);
        
        if (!existingChat) {
            const newChat = {
                _id: user._id,
                name: `${user.firstName} ${user.lastName}`,
                avatar: user.profilePic || '', // Use the user's profile picture if available
                lastMessage: '',
                messages: [], // Initialize with an empty messages array
            };
            
            setChats([...chats, newChat]);
            setSelectedChat(newChat); // Open the new chat window
        } else {
            setSelectedChat(existingChat); // Open the existing chat window
        }

        setSearchDialogOpen(false); // Close the search dialog
    };

    const selectChat = (chat) => {
        setSelectedChat(chat); // Ensure the selected chat is set correctly
    };

    const sendMessage = (message) => {
        if (selectedChat) {
            const updatedChats = chats.map(chat => {
                if (chat._id === selectedChat._id) {
                    const updatedMessages = [...chat.messages, { content: message, sender: "me", timestamp: new Date() }];
                    return { ...chat, messages: updatedMessages, lastMessage: message };
                }
                return chat;
            });

            setChats(updatedChats);
            setSelectedChat({ ...selectedChat, messages: [...selectedChat.messages, { content: message, sender: "me", timestamp: new Date() }] });
        }
    };

    return (
        <Box display="flex" height="100vh">
            <Box width="300px" borderRight="1px solid #ddd">
                <Button variant="contained" color="primary" onClick={() => setSearchDialogOpen(true)}>
                    Start New Chat
                </Button>
                <ChatList chats={chats} selectChat={selectChat} />
            </Box>
            <Box flexGrow={1}>
                {selectedChat ? (
                    <ChatWindow chat={selectedChat} sendMessage={sendMessage} />
                ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                        <p>Select a chat to start the conversation</p>
                    </Box>
                )}
            </Box>
            <SearchUsersDialog
                open={searchDialogOpen}
                handleClose={() => setSearchDialogOpen(false)}
                startChat={startChat}
            />
        </Box>
    );
};

export default ChatContainer;
