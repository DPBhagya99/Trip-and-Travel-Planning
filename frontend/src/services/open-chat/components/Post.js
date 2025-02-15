import React from 'react';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Typography, Badge, Grid } from '@mui/material';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

const Post = ({ post }) => {
    const userName = `${post.userId?.firstName || ''} ${post.userId?.lastName || ''}`;
    const userProfilePic = post.userId?.profilePic;
    const userEmail = post.userId?.email;

    return (
        <Card sx={{ width: '100%', maxWidth: 600, margin: '20px auto', boxShadow: 3 }}>
            <CardHeader
                avatar={
                    <Avatar
                        src={userProfilePic}
                        sx={{ bgcolor: red[500] }}
                        aria-label="user"
                    >
                        {!userProfilePic && userName.charAt(0)} {/* Show first letter if no profile picture */}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={userName}
                subheader={new Date(post.createdAt).toLocaleString()}
            />
            <CardContent>
                <Typography variant="body2" color="text.primary">
                    {post.content}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {userEmail}
                </Typography>
            </CardContent>
            {post.image && (
                <CardMedia
                    component="img"
                    height="300"
                    image={post.image}
                    alt="Post Image"
                />
            )}
            <CardActions disableSpacing>
                <Grid container spacing={1}>
                    <Grid item>
                        <IconButton aria-label="add to favorites">
                            <Badge badgeContent={post.likes.length || 0} color="error">
                                <FavoriteIcon />
                            </Badge>
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton aria-label="comment">
                            <ChatBubbleOutlineIcon />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton aria-label="share">
                            <ShareIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    );
};

export default Post;
