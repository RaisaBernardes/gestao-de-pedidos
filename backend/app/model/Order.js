const {sequelizeConnect, Sequelize} = require('../config/db');

const Order = sequelizeConnect.define("order", {
    idOrder: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        field: "id_order"
    },
    idClient: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "id_offer"
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "status"
    },
    price: {
        type: Sequelize.NUMBER, 
        allowNull: false,
        field: "price"
    }
})

module.exports = Order;