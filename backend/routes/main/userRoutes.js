const express = require('express');
const router = express.Router();
const { register, login, verifyCode, checkFriend, inviteFriend, getUserDetails, updateUserDetails, searchUsers, addContact } = require('../../controllers/userController');
const auth = require('../../middlewares/requireAuth');

router.post('/users/register', register);
router.post('/users/login', login);
router.post('/users/verify', verifyCode);

router.get('/users/:id', auth, getUserDetails); // Fetch user details
router.put('/users/:id', auth, updateUserDetails); // Update user details

router.post('/friends/check', auth, checkFriend);
router.post('/friends/invite', auth, inviteFriend);


// Search for users
router.post('/users/search', auth, searchUsers);

// Add contact
router.post('/contacts/add', auth, addContact);



module.exports = router;
