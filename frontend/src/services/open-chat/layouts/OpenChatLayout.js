import * as React from 'react';
import { Grid } from '@mui/material';

//Layout

//Pages
import ChatPage from '../pages/ChatPage';
import MapPage from '../pages/MapPage';
import SettingsPage from '../pages/SettingsPage';

const OpenChatLayout = () => {

    return(
        <Grid container spacing={0} xs={12} sx={{ margin: 0 }}>
            <Grid item xs={5} sx={{  margin: 0, padding: 0, height: '100vh', overflowY: 'scroll', overflowX: 'hidden' }}>
                <ChatPage />
            </Grid>
            <Grid item xs={1} sx={{ backgroundColor: 'white' ,  margin: 0, padding: 0 }}>
                <SettingsPage />
            </Grid>
            <Grid item xs={6} sx={{ backgroundColor: 'red' ,  margin: 0, padding: 0 , height: '100vh', overflowY: 'hidden' }}>
                <MapPage />
            </Grid>
        </Grid>
    )
}

export default OpenChatLayout;