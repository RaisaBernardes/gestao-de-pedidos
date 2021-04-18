const {sequelizeConnect, Sequelize} = require('../config/db');
const order = require('./Order.js');

const Payment = sequelizeConnect.define("payment", {
    cdPagamento: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        field: "cd_pagamento"
    },
    vlTotal: {
        type: Sequelize.FLOAT, 
        allowNull: false,
        field: "vl_total"
    },
})

order.hasOne(Payment);

module.exports = Payment;