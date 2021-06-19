const Sequelize = require('sequelize');
const db = require('./index');

const Stock = db.define('stocks', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    name: {
        type: Sequelize.STRING,
        // isAlpha: true,
    },
    current_market_price: {
        type: Sequelize.FLOAT,
        isAlpha: true,
    },
    market_cap: {
        type: Sequelize.FLOAT,
        isAlpha: true,
    },
    stock_pe: {
        type: Sequelize.FLOAT,
        isAlpha: true,
    },
    dividend_yeild: {
        type: Sequelize.FLOAT,
        isAlpha: true,
    },
    roce: {
        type: Sequelize.FLOAT,
        isAlpha: true,
    },
    roe_proviouse: {
        type: Sequelize.FLOAT,
        isAlpha: true,
    },
    debt_to_equity: {
        type: Sequelize.FLOAT,
        isAlpha: true,
    },
    eps: {
        type: Sequelize.FLOAT,
        isAlpha: true,
    },
    reserves: {
        type: Sequelize.FLOAT,
        isAlpha: true,
    },
    debt: {
        type: Sequelize.FLOAT,
        isAlpha: true,
    },
});

Stock.sync().then(() => {
    console.log('Stocks synced');
});

module.exports = Stock;