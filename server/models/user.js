const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true, maxlength: 100 },
    familyName: { type: String, required: true, maxlength: 100 },
  },
);

module.exports = mongoose.model('User', UserSchema);