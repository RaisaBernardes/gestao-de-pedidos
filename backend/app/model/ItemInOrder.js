const {sequelizeConnect, Sequelize} = require('../config/db');

const ItemInOrder = sequelizeConnect.define("item_order", {

    idItemOrder: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        field: "id_item_order"
    },
    amount: {
        type: Sequelize.NUMBER,
        allowNull: false,
        field: "item_amount"
    }, // QUANTIA PARA O ITEM DO PEDIDO
    idOrder: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "id_order"
    },

})