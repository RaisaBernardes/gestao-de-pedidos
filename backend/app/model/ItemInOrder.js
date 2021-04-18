const {sequelizeConnect, Sequelize} = require('../config/db');
const Item = require('./Item.js');

const ItemInOrder = sequelizeConnect.define("item_order", {

    cdItemPedido: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        field: "cd_item_pedido"
    },
    cdPedido: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "cd_pedido"
    },
    quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "quantidade"
    }, // QUANTIA PARA O ITEM DO PEDIDO 

})

// Creater Item Foreign Key at item_order Table
Item.hasMany(ItemInOrder);

module.exports = ItemInOrder;