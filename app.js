const express = require('express');
const morgan = require('morgan');
const { db } = require('./models');

const app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded);

app.get('/', (req, res) => res.send('Hello! wikistack2!!!👋🏻'));

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}👂`);
});

db.authenticate().then(() => {
  console.log('connected to the database');
});
