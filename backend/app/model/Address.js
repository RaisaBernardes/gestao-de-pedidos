const {sequelizeConnect, Sequelize} = require('../config/db');
const bcrypt = require('bcrypt');

const Address = sequelizeConnect.define('address', {
    idAddress: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        field: "id_address"
    },
    logradouro: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "ds_address"
    },
    numero: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "ds_number"
    },
    complemento: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "ds_complement"
    },
    bairro: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "ds_district"
    },
    cidade: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "ds_city"
    },
    estado: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "ds_state"
    }
});

module.exports = Address;