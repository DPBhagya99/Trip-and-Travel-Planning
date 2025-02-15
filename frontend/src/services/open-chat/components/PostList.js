import React, { useEffect, useState } from 'react';
import Post from './Post';
import { Box } from '@mui/material';
import { useTripContext } from '../../../hooks/useTripContext';
import { useAuthContext } from "../../../authentication/hooks/useAuthContext";

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const { tripData } = useTripContext();
    const { user } = useAuthContext();

    useEffect(() => {
        if (!user || !tripData) {
            console.log('User or tripData not available yet');
            return;
        }

        const fetchPosts = async () => {
            const locationName = tripData.destinations[0].name;
            try {
                const response = await fetch(`/api/posts/getPostsByLocation`, {
                    method: 'POST', // Changed to POST method
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`,
                    },
                    body: JSON.stringify({ locationName }), // Sending locationName in the request body
                });
                const data = await response.json();
                console.log('Fetched posts:', data);
                if (Array.isArray(data)) {
                    setPosts(data);
                } else {
                    console.error('Unexpected data format:', data);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, [user, tripData]);

    if (!tripData || !posts.length) {
        return <Box>No posts available or trip data not loaded.</Box>;
    }

    return (
        <Box>
            {posts.map((post) => (
                <Post key={post._id} post={post} />
            ))}
        </Box>
    );
};

export default PostList;
