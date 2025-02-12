const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();

// Function to create a JWT token
const createToken = (_id) => {
  if (!process.env.SECRET) {
    throw new Error('JWT Secret not set in environment variables');
  }
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};



const getEmailTemplate = (title, message, verificationCode) => {
  return `
  <html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        padding: 20px;
      }
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      .header {
        text-align: center;
        background-color: #007bff;
        padding: 15px 0;
        color: #ffffff;
        border-radius: 8px 8px 0 0;
        font-size: 24px;
        font-weight: bold;
      }
      .content {
        margin: 20px 0;
        font-size: 16px;
        line-height: 1.5;
        color: #333333;
        text-align: center;
      }
      .code {
        display: inline-block;
        font-size: 22px;
        font-weight: bold;
        color: #007bff;
        margin: 10px 0;
        background-color: #f1f1f1;
        padding: 10px 20px;
        border-radius: 8px;
      }
      .footer {
        text-align: center;
        margin-top: 20px;
        font-size: 12px;
        color: #888888;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">
        ${title}
      </div>
      <div class="content">
        <p>${message}</p>
        <p class="code">${verificationCode}</p>
      </div>
      <div class="footer">
        <p>If you didn’t request this email, you can ignore this message.</p>
      </div>
    </div>
  </body>
  </html>`;
};




const sendVerificationEmail = async (user, req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: 'Email Verification for Travel Sri',
      text: `Your verification code is: ${user.verificationCode}`,
      html: getEmailTemplate(
        "Verify Your Email",
        "Please verify your email by entering the following code:",
        user.verificationCode
      ),
    };

    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${user.email}`);
  } catch (error) {
    console.error('Error sending verification email:', error.message);
    throw new Error('Failed to send verification email');
  }
};



// Function to fetch user details
const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password -verificationToken -verificationTokenExpires');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to update user details
const updateUserDetails = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true }).select('-password -verificationToken -verificationTokenExpires');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Function to send invite email
const sendInviteEmail = async (email, req) => {
  try {
    const registrationUrl = `${req.protocol}://${req.get('host')}/register`;
    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      }
    });

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: 'Invitation to Join Our Platform',
      text: `You have been invited to join our platform. Register using the following link: ${registrationUrl}`,
      html: `<p>You have been invited to join our platform. Register using the following link: <a href="${registrationUrl}">Register Here</a></p>`,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending invite email:', error);
    throw new Error('Failed to send invite email');
  }
};

// Signup a user
const register = async (req, res) => {
  const { firstName, lastName, email, address, bod, gender, password, profilePicUrl } = req.body;

  try {
    const user = await User.signup(firstName, lastName, email, address, bod, gender, password, profilePicUrl);
    
    // Optional: log user creation
    console.log('User created:', user);

    await sendVerificationEmail(user, req, res);

    res.status(200).json({ 
      email, 
      message: 'Verification email sent. Please check your email.',
    });
  } catch (error) {
    console.error('Error during registration:', error); // Log the error for debugging
    res.status(400).json({ error: error.message });
  }
};


// Email verification endpoint
const verifyEmail = async (req, res) => {
  try {
    const user = await User.findOne({
      verificationToken: req.params.token,
      verificationTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: 'Token is invalid or has expired.' });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Email verified successfully!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login a user
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({
      _id: user._id,
      email,
      token,
      profilePic: user.profilePic,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Check if a friend is registered
const checkFriend = async (req, res) => {
  try {
    const { email } = req.body;
    const friend = await User.findOne({ email });
    res.status(200).json({ exists: !!friend });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Invite a friend
const inviteFriend = async (req, res) => {
  const { email } = req.body;

  try {
    const friend = await User.findOne({ email });
    if (friend) {
      return res.status(200).json({ message: 'Friend is already registered.' });
    } else {
      await sendInviteEmail(email, req);
      return res.status(200).json({ message: 'Invite sent successfully.' });
    }
  } catch (error) {
    console.error('Error sending invite:', error);
    return res.status(500).json({ error: 'Failed to send invite.' });
  }
};

// Function to search for users
const searchUsers = async (req, res) => {
  try {
    const { query } = req.body; // Change from req.query to req.body
    console.log("Search query received:", query); // Debug log

    if (!query) return res.status(400).json({ error: 'Search query is required' });

    const regex = new RegExp(query, 'i'); // 'i' for case insensitive
    const users = await User.find({
      $or: [
        { email: regex },
        { firstName: regex },
        { lastName: regex }
      ]
    }).select('-password'); // Exclude password from the returned data

    console.log("Users found:", users); // Debug log
    res.status(200).json(users);
  } catch (error) {
    console.error("Error occurred in searchUsers function:", error); // Log the actual error
    res.status(500).json({ error: error.message });
  }
};




// Function to add a user to contacts
const addContact = async (req, res) => {
  try {
    const { contactId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      return res.status(400).json({ error: 'Invalid contact ID' });
    }

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    await user.addContact(contactId);
    res.status(200).json({ message: 'Contact added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const verifyCode = async (req, res) => {
  const { email, code } = req.body;
  console.log(email)

  try {
    const user = await User.verifyCode(email, code);
    res.status(200).json({ message: 'Email verified successfully!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
  verifyEmail,
  checkFriend,
  inviteFriend,
  getUserDetails,
  updateUserDetails,
  searchUsers,
  addContact,
  verifyCode
};
