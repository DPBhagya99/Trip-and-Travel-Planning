import * as React from 'react';
import { Box, Modal, Typography, Divider, CircularProgress } from '@mui/material';
import ProfileHeader from './ProfileHeader';
import Post from './Post';
import UserDetails from './UserDetails';
import { useAuthContext } from '../../../authentication/hooks/useAuthContext';

const style = {
    position: 'absolute',
    top: '0%',
    right: '0%',
    width: '46vw',
    height: '100vh',
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto',
};

const ProfileModal = ({ open, handleClose }) => {
    const [userDetails, setUserDetails] = React.useState(null);
    const [posts, setPosts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const { user } = useAuthContext();

    React.useEffect(() => {
        if (!open || !user) return; // Ensure the modal is open and user is available

        const fetchData = async () => {
            try {
                // Fetch user details
                const userResponse = await fetch(`/api/users/${user._id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`,
                    },
                });
                const userData = await userResponse.json();

                // Fetch user posts using POST method
                const postsResponse = await fetch('/api/posts/getMyPosts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`,
                    },
                    body: JSON.stringify({ userId: user._id }),
                });
                const postsData = await postsResponse.json();

                setUserDetails(userData);
                setPosts(postsData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [open, user]); // Depend on `user` instead of `user._id`

    if (!user) {
        return null; // Don't render the modal if user data is not available
    }

    if (loading) {
        return (
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <CircularProgress />
                </Box>
            </Modal>
        );
    }

    if (!userDetails) {
        return null; // Or display some error message
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <ProfileHeader user={userDetails} />
                <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: '20px' }}>
                    <UserDetails user={userDetails} />
                    <Divider orientation="vertical" flexItem />
                    <Box sx={{ flexGrow: 1, paddingLeft: '20px' }}>
                        <Typography variant="h6" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
                            Recent Posts
                        </Typography>
                        {posts.length > 0 ? (
                            posts.map((post) => (
                                <Post key={post._id} post={post} />
                            ))
                        ) : (
                            <Typography variant="body2" color="text.secondary">
                                No posts available.
                            </Typography>
                        )}
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default ProfileModal;
