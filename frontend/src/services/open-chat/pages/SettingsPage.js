import { Box, Fab } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import ProfileModel from '../components/ProfileModel';
import Person2Icon from '@mui/icons-material/Person2';
import ChatIcon from '@mui/icons-material/Chat';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import SwitchAccessShortcutAddIcon from '@mui/icons-material/SwitchAccessShortcutAdd';
import ChatModel from '../components/ChatModel';
import AddPostModel from '../components/AddPostModel';
import AddShortModel from '../components/AddShortModel';

const SettingsPage = () => {
    const [openProfile, setOpenProfile] = useState(false);
    const [openChat, setOpenChat] = useState(false);
    const [openAddPost, setOpenAddPost] = useState(false);
    const [openAddShort, setOpenAddShort] = useState(false);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px' }}>
            <Fab color="secondary" aria-label="profile" sx={{ margin: '15px auto' }} onClick={() => setOpenProfile(true)}>
                <Person2Icon />
            </Fab>
            <Fab color="secondary" aria-label="chat" sx={{ margin: '15px auto' }} onClick={() => setOpenChat(true)}>
                <ChatIcon />
            </Fab>
            <Fab color="secondary" aria-label="add post" sx={{ margin: '15px auto' }} onClick={() => setOpenAddPost(true)}>
                <HistoryEduIcon />
            </Fab>
            <Fab color="secondary" aria-label="add short" sx={{ margin: '15px auto' }} onClick={() => setOpenAddShort(true)}>
                <SwitchAccessShortcutAddIcon />
            </Fab>
            <Fab color="secondary" aria-label="edit" sx={{ margin: '15px auto' }}>
                <EditIcon />
            </Fab>
            <ProfileModel open={openProfile} handleClose={() => setOpenProfile(false)} />
            <ChatModel open={openChat} handleClose={() => setOpenChat(false)} />
            <AddPostModel open={openAddPost} handleClose={() => setOpenAddPost(false)} />
            <AddShortModel open={openAddShort} handleClose={() => setOpenAddShort(false)} />
        </Box>
    );
};

export default SettingsPage;
