const mongoose = require('mongoose');
const { Schema } = mongoose;

const BlacklistSchema = new Schema(
  {
    refreshToken: { type: String, required: true },
    expireAt: { type: Date, required: true },
  },
);

BlacklistSchema.index({ expireAt: 1 }, { expireAfterSeconds : 0 });

module.exports = mongoose.model('Blacklist', BlacklistSchema);