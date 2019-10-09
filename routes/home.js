const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
  const home = 'home';
  response.send(home);
});

module.exports = router;