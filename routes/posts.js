const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const postsCtrl = require('../controllers/posts');

router.get('/', postsCtrl.getPosts);
router.post('/new-post', auth, postsCtrl.createPost);

module.exports = router;
