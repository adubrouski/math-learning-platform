const { model, Schema } = require('mongoose');

const examsSchema = new Schema({
  exams: [
    {
      topic: {
        type: String,
        required: true,
      },
      questions: {
        type: Array,
        required: true,
      },
    },
  ],
});

module.exports = model('Exams', examsSchema);
