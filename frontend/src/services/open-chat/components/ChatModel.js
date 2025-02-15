import React, { useState } from 'react';
import { Box, IconButton, AppBar, Toolbar, Typography, Modal } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import AddFriendDialog from './AddFriendDialog';
import SearchUsersDialog from './SearchUsersDialog'; // Import the new search dialog

const style = {
    position: 'absolute',
    top: '0%',
    right: '0%',
    width: '50vw',
    height: '100vh',
    bgcolor: 'background.paper',
    boxShadow: 24,
    overflow: 'hidden',
    display: 'flex',
};

const ChatModel = ({ open, handleClose }) => {
    const [chats, setChats] = useState([]);
    const [selectedChatIndex, setSelectedChatIndex] = useState(null);
    const [addFriendDialogOpen, setAddFriendDialogOpen] = useState(false);
    const [searchDialogOpen, setSearchDialogOpen] = useState(false); // State for search dialog

    const selectChat = (index) => {
        setSelectedChatIndex(index);
    };

    const startChat = (user) => {
        const existingChat = chats.find(chat => chat.user._id === user._id);
        if (existingChat) {
            setSelectedChatIndex(chats.indexOf(existingChat));
        } else {
            const newChat = {
                user,
                messages: []
            };
            setChats([...chats, newChat]);
            setSelectedChatIndex(chats.length);
        }
        setSearchDialogOpen(false);
    };

    const sendMessage = (message) => {
        if (message.trim()) {
            const updatedChats = [...chats];
            updatedChats[selectedChatIndex].messages.push({ text: message, sender: 'You', isSent: true });
            setChats(updatedChats);
        }
    };

    return (
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box sx={style}>
                <Box sx={{ width: '300px', borderRight: '1px solid #ddd' }}>
                    <AppBar position="static" color="default">
                        <Toolbar>
                            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                                Chats
                            </Typography>
                            <IconButton color="inherit" onClick={() => setSearchDialogOpen(true)}> {/* Open the search dialog */}
                                <AddIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <ChatList chats={chats} selectChat={selectChat} />
                </Box>
                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    {selectedChatIndex !== null && (
                        <ChatWindow chat={chats[selectedChatIndex]} sendMessage={sendMessage} />
                    )}
                </Box>
                <AddFriendDialog open={addFriendDialogOpen} handleClose={() => setAddFriendDialogOpen(false)} />
                <SearchUsersDialog open={searchDialogOpen} handleClose={() => setSearchDialogOpen(false)} startChat={startChat} />
            </Box>
        </Modal>
    );
};

export default ChatModel;
