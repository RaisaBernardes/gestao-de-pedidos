const {sequelizeConnect, Sequelize} = require('../config/db');
const item = require('./Item.js');
const order = require('./Order.js');

const ItemInOrder = sequelizeConnect.define("item_order", {

    cdItemPedido: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        field: "cd_item_pedido"
    },
    quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "quantidade"
    }, // QUANTIA PARA O ITEM DO PEDIDO 

})

// Creater Item Foreign Key at item Table
item.hasMany(ItemInOrder);
// Creater Item Foreign Key at order Table
order.hasMany(ItemInOrder);

module.exports = ItemInOrder;