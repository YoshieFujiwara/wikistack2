const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
//DB
const { db, Page, User } = require('./models');

//Web
const app = express();
const wikiRouter = require(`./routes/wiki`);
const userRouter = require(`./routes/users`);

//middleware to use
app.use(morgan('dev'));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use('/wiki', wikiRouter);
app.use('/users', userRouter);

//Webserver
app.get('/', (req, res, next) => {
  try {
    //res.send('Hello! wikistack2!!!👋🏻');
    res.redirect(`/wiki`);
  } catch (err) {
    next(errs);
  }
});

//DB server
const PORT = 3000;

const init = async () => {
  await db.sync({ force: false });

  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}👂`);
  });
};

init();

db.authenticate().then(() => {
  console.log('connected to the database');
});

module.exports = app;
