const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  yearOfStudy: { type: String, required: true },
  program: { type: String, required: true },
  isModerator: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', UserSchema);
