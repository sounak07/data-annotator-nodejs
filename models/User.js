const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: Number, required: true },
});

module.exports = User = mongoose.model('users', UserSchema);
