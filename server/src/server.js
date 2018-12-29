const express = require('express');
const bodyParser = require('body-parser');
const encrypter = require('./encrypter')

const app = express();
const port = process.env.PORT || 3200;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello World!' });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});
