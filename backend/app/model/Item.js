const {sequelizeConnect, Sequelize} = require('../config/db');
const ItemType = require('./ItemType.js');
//const ItemInOrder = require('./ItemInOrder.js');

const Item = sequelizeConnect.define("item", {
    cdItem: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        field: "cd_item"
    },
    preco: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "preco"
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "descricao"
    },
    ingredientesDescricao: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "ingredientes_descricao"
    },
});

ItemType.hasMany(Item);
Item.belongsTo(ItemType);

module.exports = Item;