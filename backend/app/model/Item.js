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
        type: Sequelize.NUMBER,
        allowNull: false,
        field: "normal_price"
    },
    salePrice: {
        type: Sequelize.NUMBER,
        allowNull: false,
        field: "sale_price"
    },
    InSale: {
        type: Sequelize.BOOLEAN,
        field_name: "in_sale"
    }

})

module.exports = Item;