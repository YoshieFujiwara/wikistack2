const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Hello! wikistack2!!!👋🏻'));

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App listening in port ${port}`);
});
