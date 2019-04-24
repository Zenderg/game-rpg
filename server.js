/* const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('dist'));
app.use(express.json());

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, './dist/index.html'), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(3000, () => {
  console.log('Server listening 3000');
}); */
