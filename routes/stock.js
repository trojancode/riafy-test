const express = require('express');
const router = express.Router();

const {
    requireSignin,
} = require('../controller/auth');
const { listStock, searchStocks, getStock, stockById } = require('../controller/stock');


router.get('/list', requireSignin, listStock);
router.get('/search', requireSignin, searchStocks);
router.get('/:stockId', requireSignin, getStock);

router.param("stockId", stockById)

module.exports = router;