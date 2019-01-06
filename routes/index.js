const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController')

router.get('/', transactionController.homePage);
router.get('/add', transactionController.addTransaction);
router.post('/add', transactionController.createTransaction);

module.exports = router;