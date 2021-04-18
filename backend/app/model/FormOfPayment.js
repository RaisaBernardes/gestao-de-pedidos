const {sequelizeConnect, Sequelize} = require('../config/db');
const payment = require('./Payment.js');

const formOfPayment = sequelizeConnect.define("formOfPayment", {
    cdFormaPagamento: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        field: "cd_forma_pagamento"
    },
    descricao: {
        type: Sequelize.STRING, 
        allowNull: false,
        field: "descricao"
    },
})

payment.belongsTo(formOfPayment);

module.exports = formOfPayment;