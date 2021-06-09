const httpStatus = require('http-status');
const User = require('../model/User');
const Address = require('../model/Address');
const defaultResponse = (data, statusCode = httpStatus.OK) => ({data, statusCode});
const errorResponse = (message, statusCode = httpStatus.BAD_REQUEST) => defaultResponse({error: message}, statusCode);

class OrdersController {
    constructor(Orders) {
        this.Orders = Orders;
    }

    getAll() {
        return this.Orders.findAll({include: [User, Address] }).then(result => defaultResponse(result))
        .catch(error => errorResponse(error.message));
    }

    getById(id){
        return this.Orders.findByPk(id, { include: [User] }).then(result => defaultResponse(result))
        .catch(error => errorResponse(error.message));
    }

    getByWhere(where){
        return this.Orders.findAll({ where: where, include: [User, Address] }).then(result => defaultResponse(result))
        .catch(error => errorResponse(error.message));
    }

    create(order){
        return this.Orders.create(order).then(result => defaultResponse(result))
        .catch(error => errorResponse(error.message, httpStatus.UNPROCESSABLE_ENTITY));
    }

    update(order) {
        return this.Orders.update(order, { where: { cdPedido: order.cdPedido } }).then(result => defaultResponse(result))
        .catch(error => errorResponse(error.message, httpStatus.UNPROCESSABLE_ENTITY));
    }

    delete(order) {
        return this.Orders.destroy({ where: { cdPedido: order.cdPedido } }).then(result => defaultResponse(result))
        .catch(error => errorResponse(error.message, httpStatus.UNPROCESSABLE_ENTITY));
    }
}

module.exports = OrdersController;
