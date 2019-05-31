const Post = require('../models/Post');
const jwt = require('jsonwebtoken');

exports.getPosts = (req, res, next) => {
  if (!req.query.pageNumber || !req.query.pageSize || +req.query.pageNumber <= 0 || +req.query.pageSize <= 0) {
    return res.status(400).json({ error: 'Invalid request!'});
  }
  const pageNumber = req.body.pageNumber;
  const pageSize = req.body.pageSize;
  Post.countDocuments().then(count => {
    Post.find({}, null, { skip: pageSize * (pageNumber - 1), limit: pageSize, sort: '-createdAt' }).then(results => {
      res.status(200).json({ pageNumber, pageSize, totalPages: count / pageSize, results });
    }).catch(error => {
      res.status(500).json({ error: error || 'Database error!' });
    });
  }).catch(error => {
    res.status(500).json({ error: error || 'Count error!'});
  });
};

exports.getPostById = (req, res, next) => {
  Post.findOne({ _id: req.params.id }).then(result => {
    res.status(200).json(result);
  }).catch(err => res.status(404).json({error: err || 'Post not found!'}));
};

exports.createPost = (req, res, next) => {
  if (!req.body.post) {
    return res.status(400).json({ error: 'No post received!' });
  }
  const post = req.body.post;
  if (!post.title || !post.content) {
    return res.status(400).json({ error: 'Invalid post!' });
  }
  const newPost = new Post({
    userId: req.body.userId,
    title: post.title,
    content: post.content,
    createdAt: Date.now()
  });
  newPost.save().then(data => {
    res.status(201).json({
      message: 'Post saved successfully!',
      data
    });
  }).catch(error => {
    res.status(500).json({
      error: error || 'Database error!'
    });
  });
};

exports.updatePost = (req, res, next) => {
  if (!req.body.post) {
    return res.status(400).json({ error: 'No post received!' });
  }
  Post.updateOne({ _id: req.params.id }, { title: req.body.post.title, content: req.body.post.content })
    .then(() => res.status(200).json({ message: 'Post updated successfully!' }))
    .catch(err => res.status(500).json({ error: err || 'Database update error!' }));
};
