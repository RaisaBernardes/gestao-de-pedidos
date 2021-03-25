const {sequelizeConnect, Sequelize} = require('../config/db');

const Item = sequelizeConnect.define("item", {
    idItem: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        field: "id_item"
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "category_item"
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false,
        field: "normal_price"
    },
    salePrice: {
        type: Sequelize.FLOAT,
        allowNull: true,
        field: "sale_price"
    },
    ckSale: {
        type: Sequelize.STRING(1),
        allowNull: false,
        field: "ck_sale"
    }
});

module.exports = Item;