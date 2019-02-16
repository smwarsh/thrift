const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController')
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', catchErrors(transactionController.getTransactions));
router.get('/transactions', catchErrors(transactionController.getTransactions));
router.get('/add', transactionController.addTransaction);
router.post('/add', catchErrors(transactionController.createTransaction));
router.get('/transactions/:id/edit', catchErrors(transactionController.editTransaction));

module.exports = router;