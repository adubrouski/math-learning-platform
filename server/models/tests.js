const { model, Schema } = require('mongoose');

const testsSchema = new Schema({
  tests: [
    {
      question: {
        type: String,
        required: true,
      },
      answers: {
        type: Array,
        required: true,
      },
      rightAnswer: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = model('Tests', testsSchema);
