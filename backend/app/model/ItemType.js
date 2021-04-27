const {sequelizeConnect, Sequelize} = require('../config/db');

const ItemType = sequelizeConnect.define("item_type", {
    cdTipoItem: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        field: "cd_tipo_item"
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "descricao"
    },
});

module.exports = ItemType;