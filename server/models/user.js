const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true, maxlength: 100 },
    familyName: { type: String, required: true, maxlength: 100 },
  },
);

// Virtual for user's URL
UserSchema
  .virtual('url')
  // eslint-disable-next-line no-underscore-dangle
  .get(() => `/user/${this._id}`);

module.exports = mongoose.model('User', UserSchema);
