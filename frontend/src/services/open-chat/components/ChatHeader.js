import * as React from 'react';
import { Box, Avatar, Typography } from '@mui/material';

const ChatHeader = ({ chat }) => {
    const isOnline = true; // This should be dynamic based on actual user status
    const lastLogin = "Last seen today at 3:45 PM"; // This should be dynamic based on actual last login time

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', padding: 2, borderBottom: '1px solid #ddd', backgroundColor: '#f5f5f5' }}>
            <Avatar src={chat.avatar} sx={{ marginRight: 2 }} />
            <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {chat.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {isOnline ? 'Online' : lastLogin}
                </Typography>
            </Box>
        </Box>
    );
};

export default ChatHeader;
