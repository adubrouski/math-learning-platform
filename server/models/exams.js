const { model, Schema } = require('mongoose');

const examsSchema = new Schema({
  exams: [
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

module.exports = model('Exams', examsSchema);
