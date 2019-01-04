const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('hello', {
    title: 'Home'
  });
});

module.exports = router;