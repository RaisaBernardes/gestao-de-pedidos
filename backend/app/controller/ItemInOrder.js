const httpStatus = require('http-status');
const defaultResponse = (data, statusCode = httpStatus.OK) => ({data, statusCode});
const errorResponse = (message, statusCode = httpStatus.BAD_REQUEST) => defaultResponse({error: message}, statusCode);

class ItemInOrderController {
    constructor(ItemInOrder) {
        this.ItemInOrder = ItemInOrder;
    }

    getAll() {
        return this.ItemInOrder.findAll().then(result => defaultResponse(result))
        .catch(error => errorResponse(error.message));
    }

    getById(id){
        return this.ItemInOrder.findByPk(id).then(result => defaultResponse(result))
        .catch(error => errorResponse(error.message));
    }

    getByWhere(where){
        return this.ItemInOrder.findAll({ where: where }).then(result => defaultResponse(result))
        .catch(error => errorResponse(error.message));
    }

    create(itemInOrder){
        return this.ItemInOrder.create(itemInOrder).then(result => defaultResponse(result))
        .catch(error => errorResponse(error.message, httpStatus.UNPROCESSABLE_ENTITY));
    }

    update(itemInOrder) {
        delete itemInOrder.dsPassword;
        return this.ItemInOrder.update(order, { where: { cdItemPedido: itemInOrder.cdItemPedido } }).then(result => defaultResponse(result))
        .catch(error => errorResponse(error.message, httpStatus.UNPROCESSABLE_ENTITY));
    }

    delete(itemInOrder) {
        return this.Orders.destroy({ where: { cdItemPedido: itemInOrder.cdItemPedido } }).then(result => defaultResponse(result))
        .catch(error => errorResponse(error.message, httpStatus.UNPROCESSABLE_ENTITY));
    }
}

module.exports = ItemInOrderController;