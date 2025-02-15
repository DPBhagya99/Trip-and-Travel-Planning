// src/services/open-chat/components/ChatList.js
import * as React from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemButton } from '@mui/material';

const ChatList = ({ chats = [], selectChat }) => {
    return (
        <List>
            {chats.length > 0 ? (
                chats.map((chat, index) => (
                    <ListItemButton key={index} onClick={() => selectChat(chat)}>
                        <ListItemAvatar>
                            <Avatar src={chat.avatar} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={chat.name}
                            secondary={chat.lastMessage}
                            primaryTypographyProps={{ fontWeight: 'bold' }}
                            secondaryTypographyProps={{ color: 'textSecondary' }}
                        />
                    </ListItemButton>
                ))
            ) : (
                <ListItem>
                    <ListItemText primary="No chats available" />
                </ListItem>
            )}
        </List>
    );
};

export default ChatList;
