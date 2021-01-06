const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true, maxlength: 15 },
    familyName: { type: String, required: true, maxlength: 15 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isActivated: { type: Boolean, default: false },
    roles: { type: Array, default: [] },
    expireAt: { type: Date, default: null },
  },
);

UserSchema.pre(
  'save',
  async function(next) {
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
    next();
  },
);

UserSchema.methods.isValidPassword = async function(password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

UserSchema.index({ expireAt: 1 }, { expireAfterSeconds : 0 });

module.exports = mongoose.model('User', UserSchema);