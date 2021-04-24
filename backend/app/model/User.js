const {sequelizeConnect, Sequelize} = require('../config/db');
const bcrypt = require('bcrypt');
const Address = require('./Address.js');

const User = sequelizeConnect.define('user', {
    cdUsuario: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        field: "cd_usuario"
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "nome"
    },
    telefone: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "telefone"
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "senha"
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "email"
    },
    tp_usuario: {
        type: Sequelize.STRING,
        field: "tp_usuario"
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
User.belongsTo(Address);

module.exports = User;