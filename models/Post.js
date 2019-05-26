const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now() }
});

module.exports = mongoose.model('Post', postSchema);
