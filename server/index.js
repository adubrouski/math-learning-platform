const express = require('express');
const config = require('config');
const cookieParser = require('cookie-parser');

const PORT = config.get('port');
const MONGO_URI = config.get('db-uri');

const app = express();

app.use(cookieParser(config.get('cookie-secret')));

require('./startup/cors')(app);
require('./startup/db')(MONGO_URI);

app.use(express.json({ extended: 'true' }));
app.use(express.urlencoded({ extended: 'true' }));

require('./routes/index')(app);

app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON ${PORT} PORT`);
});
