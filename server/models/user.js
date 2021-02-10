const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  examsResults: {
    type: Array,
    required: true,
  },
});

module.exports = model('User', userSchema);
