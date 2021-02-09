const { model, Schema } = require('mongoose');

const topicsSchema = new Schema({
  topics: [
    {
      name: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      markup: {
        type: String,
        required: true,
      },
      grade: {
        type: Number,
        required: true,
      },
    },
  ],
});

topicsSchema.methods.addTopic = function () {
  const clonedTopic = [...this.topic];

  clonedTopic.push({ name: 'test', markup: '<p>Test</p>' });

  this.topic = clonedTopic;

  return this.save();
};

module.exports = model('Topics', topicsSchema);
