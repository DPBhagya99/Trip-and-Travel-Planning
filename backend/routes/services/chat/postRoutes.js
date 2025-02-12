
const express = require('express');
const router = express.Router();
const Post = require('../../../models/services/chat/Post');
const auth = require('../../../middlewares/requireAuth');

// Create a new post
router.post('/posts', auth, async (req, res) => {
    try {
        const post = new Post({ ...req.body });
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get posts by location
router.post('/posts/getPostsByLocation', auth, async (req, res) => {
    const { locationName } = req.body;
    try {
        // Populate user details
        const posts = await Post.find({ 'location.name': locationName }).populate('userId', 'firstName lastName email profilePic');
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get posts by the current user
router.post('/posts/getMyPosts', auth, async (req, res) => {
    const { userId } = req.body;
    try {
        // Populate user details
        const posts = await Post.find({ userId }).populate('userId', 'firstName lastName email profilePic');
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Get all posts
router.get('/posts', auth, async (req, res) => {
    try {
        const posts = await Post.find().populate('userId', 'firstName lastName email profilePic');
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching posts' });
    }
});

module.exports = router;
