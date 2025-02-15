// src/services/open-chat/components/ChatWindow.js
import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

const ChatWindow = ({ chat, sendMessage }) => {
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (message.trim()) {
            sendMessage(message);
            setMessage('');
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box sx={{ flexGrow: 1, overflowY: 'auto', padding: 2, backgroundColor: '#f9f9f9' }}>
                {chat.messages.length > 0 ? (
                    chat.messages.map((msg, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                justifyContent: msg.sender === "me" ? 'flex-end' : 'flex-start',
                                marginBottom: 1,
                            }}
                        >
                            <Typography
                                variant="body2"
                                sx={{
                                    backgroundColor: msg.sender === "me" ? '#DCF8C6' : '#FFF',
                                    padding: 1,
                                    borderRadius: 2,
                                    maxWidth: '70%',
                                    wordBreak: 'break-word',
                                    position: 'relative',
                                }}
                            >
                                {msg.content}
                            </Typography>
                        </Box>
                    ))
                ) : (
                    <Typography variant="body2" color="textSecondary">Start a conversation</Typography>
                )}
            </Box>
            <Box sx={{ padding: 1, borderTop: '1px solid #ddd', display: 'flex' }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message"
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <Button onClick={handleSend} variant="contained" color="primary" sx={{ marginLeft: 1 }}>
                    Send
                </Button>
            </Box>
        </Box>
    );
};

export default ChatWindow;
