const express = require('express');
const exemploController = require('../controllers/exemplo');

const router = express.Router();

router.get('/', (req, res) => {
  res.send(exemploController.signin('a@a.com', 'b'));
});

module.exports = router;
