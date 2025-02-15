import * as React from 'react';
import { Card, CardMedia, Avatar, Typography, Box } from '@mui/material';

const ProfileHeader = ({ user }) => {
    return (
        <Card sx={{
            width: '100%',
            marginBottom: '20px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '10px',
            overflow: 'visible'
        }}>
            <CardMedia
                component="img"
                height="200"
                image="./test/kandy.jpg" // This could be dynamic if the user has a cover photo
                alt="Cover photo"
                sx={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
            />
            <Box sx={{ position: 'relative', textAlign: 'center', padding: '20px' }}>
                <Avatar
                    src={user.profilePic || './test/profile.jpg'} // Dynamic profile picture
                    sx={{
                        width: 100,
                        height: 100,
                        position: 'absolute',
                        top: -50,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        border: '4px solid white'
                    }}
                />
                <Typography variant="h6" sx={{ marginTop: '60px', fontWeight: 'bold' }}>
                    {user.firstName} {user.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ marginTop: '10px' }}>
                    Bio: {user.bio || 'Loving life and living it to the fullest!'}
                </Typography>
            </Box>
        </Card>
    );
}

export default ProfileHeader;
