const {sequelizeConnect, Sequelize} = require('../config/db');
const bcrypt = require('bcrypt');
const Address = require('Address.js');

const User = sequelizeConnect.define('user', {
    idUser: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        field: "id_user"
    },
    nmUser: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "nm_user"
    },
    dsPhone: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "nm_user"
    },
    dsPassword: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "ds_password"
    },
    dsEmail: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "ds_email"
    },
    tpUser: {
        type: Sequelize.STRING,
        field: "tp_user"
    }
}, {
    hooks: {
        beforeCreate: async function(user) {
            const salt = bcrypt.genSaltSync();
            const hashedPassword = await bcrypt.hashSync(user.dsPassword, salt);
            user.dsPassword = hashedPassword;
        }
    }
});

User.prototype.validPassword = async function (password) {
    const checkPass = await bcrypt.compareSync(password, this.dsPassword);
    return checkPass;
}

// Creater Address Foreign Key at User Table
Address.hasMany(User);

module.exports = User;