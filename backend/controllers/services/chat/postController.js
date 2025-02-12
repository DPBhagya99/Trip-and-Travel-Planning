const Post = require('../models/Post');

exports.createPost = async (req, res) => {
    try {
        const post = new Post({
            ...req.body,
            userId: req.user._id, // Assuming you're using a middleware that sets req.user
        });
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: 'Error creating post' });
    }
};


exports.getPostsByLocation = async (req, res) => {
    try {
        const { locationName } = req.body; // Getting locationName from the request body
        console.log('Location Name:', locationName); // Verify this is correct
        if (!locationName) {
            return res.status(400).json({ error: 'Location name is required' });
        }

        const posts = await Post.find({ "location.name": locationName })
            .populate('userId', 'firstName lastName email profilePic'); // Populating user details

        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error.stack);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getMyPosts = async (req, res) => {
    try {

        const posts = await Post.find()
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error.stack);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

