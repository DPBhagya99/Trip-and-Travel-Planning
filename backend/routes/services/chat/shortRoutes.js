const express = require('express');
const router = express.Router();
const { getShorts, addShort } = require('../../../controllers/services/chat/shortController');
const auth = require('../../../middlewares/requireAuth');

router.get('/shorts', auth, getShorts);
router.post('/shorts', auth, addShort);

module.exports = router;
