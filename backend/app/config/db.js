const Sequelize = require('sequelize');
//const sequelizeConnect = new Sequelize('the_ranch_db', 'root', 'root', {dialect: 'mysql', host: 'mysql-ranch'});
const sequelizeConnect = new Sequelize('heroku_7aa488ddd03433f', 'ba5b023c05b33c', 'f2485e4c', 
{dialect: 'mysql', host: 'us-cdbr-east-03.cleardb.com', 
pool: { max: 15, min: 5, idle: 20000, evict: 15000, acquire: 30000},});
module.exports = {sequelizeConnect, Sequelize};