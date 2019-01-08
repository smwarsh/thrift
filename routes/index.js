const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController')
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', transactionController.homePage);
router.get('/add', transactionController.addTransaction);
router.post('/add', catchErrors(transactionController.createTransaction));

module.exports = router;