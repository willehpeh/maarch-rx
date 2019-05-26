const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  from: { type: ObjectId, required: true },
  to: { type: ObjectId, required: true },
  content: { type: String, required: true }
});

module.exports = mongoose.model('Message', messageSchema);
