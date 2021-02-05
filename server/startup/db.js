const mongoose = require('mongoose');

module.exports = async (mongoUri) => {
  const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  };
  try {
    await mongoose.connect(mongoUri, options);
  } catch (e) {
    console.log(e);
  }
};
