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

userSchema.methods.addTestResult = function (obj) {
  const results = [...this.examsResults];

  if (results.some((elem) => elem.examId === obj.examId)) {
    this.examsResults = results;
  } else {
    results.push(obj);
    this.examsResults = results;
  }

  return this.save();
};

module.exports = model('User', userSchema);
