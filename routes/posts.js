const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const postsCtrl = require('../controllers/posts');

router.get('/', postsCtrl.getPosts);
router.get('/:id', postsCtrl.getPostById);
router.post('/new-post', auth, postsCtrl.createPost);
router.put('/modify/:id', auth, postsCtrl.updatePost);

module.exports = router;
