const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const apiRouter = require('./routes/api/index.js');
const homeRouter = require('./routes/home.js');

const app = express();

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', apiRouter);
app.use('/', homeRouter);

app.use(function (request, response, next) {
  response.status(404).send("The page cannot be found");
});

app.use(function (err, request, response, next) {
  console.error(err.stack);
  response.status(500).send("The topic doesn't exist");
});

app.listen(5000, function () {
  console.log(`Example app listening on port 5000!`);
}); 