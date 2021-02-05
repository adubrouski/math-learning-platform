const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const config = require('config');

const PORT = config.get('port');
const MONGO_URI = config.get('db-uri');

const app = express();

require('./startup/cors')(app);
require('./startup/db')(MONGO_URI);

app.use(
  session({
    secret: 'Secret value',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ collection: 'sessions', uri: MONGO_URI }),
  }),
);

app.use(express.json({ extended: 'true' }));
app.use(express.urlencoded({ extended: 'true' }));

require('./routes/index')(app);

app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON ${PORT} PORT`);
});
