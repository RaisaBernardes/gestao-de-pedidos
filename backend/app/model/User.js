const {sequelizeConnect, Sequelize} = require('../config/db');
const bcrypt = require('bcrypt');
const Address = require('./Address.js');

const User = sequelizeConnect.define('user', {
    idUser: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        field: "id_user"
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "nm_user"
    },
    telefone: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "ds_phone"
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "ds_password"
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "ds_email"
    },
    tp_usuario: {
        type: Sequelize.STRING,
        field: "tp_user"
    }
}, {
    hooks: {
        beforeCreate: async function(user) {
            const salt = bcrypt.genSaltSync();
            const hashedPassword = await bcrypt.hashSync(user.senha, salt);
            user.senha = hashedPassword;
        }
    }
});

User.prototype.validPassword = async function (password) {
    const checkPass = await bcrypt.compareSync(password, this.senha);
    return checkPass;
}

// Creater Address Foreign Key at User Table
Address.hasMany(User);

module.exports = User;