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
    dsAddress: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "ds_address"
    },
    dsNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "ds_number"
    },
    dsComplement: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "ds_complement"
    },
    dsDistrict: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "ds_district"
    },
    dsCity: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "ds_city"
    },
    dsState: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "ds_state"
    }
});

module.exports = Address;