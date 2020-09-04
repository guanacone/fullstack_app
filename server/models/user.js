const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    first_name: { type: String, required: true, maxlength: 100 },
    family_name: { type: String, required: true, maxlength: 100 },
  },
);

// Virtual for author's full name
UserSchema
  .virtual('name')
  .get(() => (`${this.first_name}, ${this.last_name}`));

// Export model
module.exports = mongoose.model('User', UserSchema);
