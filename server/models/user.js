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

userSchema.methods.addTestResult = function (result) {
  const results = [...this.examsResults];

  if (results.some((exam) => exam.examId === result.examId)) {
    const isPassMatch =
      results.filter((item) => item.examId === result.examId)[0].isPassed === true;

    if (isPassMatch) {
      this.examsResults = results;
    } else {
      const filtered = results.filter((item) => item.examId !== result.examId);

      filtered.push(result);
      this.examsResults = filtered;
    }
  } else {
    results.push(result);
    this.examsResults = results;
  }

  return this.save();
};

module.exports = model('User', userSchema);
