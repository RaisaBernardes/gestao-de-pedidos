const {sequelizeConnect, Sequelize} = require('../config/db');
const Address = require('./Address');
const User = require('./User.js');

const Order = sequelizeConnect.define("order", {
    cdPedido: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        field: "cd_pedido"
    },
    cdUsuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "cd_usuario"
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "status"
    },
    precoTotal: {
        type: Sequelize.FLOAT, 
        allowNull: false,
        field: "preco_total"
    },
})

// Creater User Foreign Key at Order Table
User.hasMany(Order);
Address.hasMany(Order);

module.exports = Order;