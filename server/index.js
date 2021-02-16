const express = require('express');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();

app.use(cookieParser(process.env.COOKIE_SECRET));

require('./startup/cors')(app);

require('./startup/db')(process.env.MONGO_URI);

app.use(express.json({ extended: 'true' }));
app.use(express.urlencoded({ extended: 'true' }));

require('./routes/index')(app);

app.listen(process.env.PORT, () => {
  console.log(`SERVER IS RUNNING ON ${process.env.PORT} PORT...`);
});
