const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(express.static(__dirname));
app.use(express.static(path.resolve(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT, (err) => {
  if (err) throw err;
  console.log(`APP IS RUNNING ON ${process.env.PORT} PORT...`);
});
