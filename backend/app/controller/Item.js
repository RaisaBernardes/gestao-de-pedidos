const httpStatus = require('http-status');
const defaultResponse = (data, statusCode = httpStatus.OK) => ({data, statusCode});
const errorResponse = (message, statusCode = httpStatus.BAD_REQUEST) => defaultResponse({error: message}, statusCode);

class ItemsController {
    constructor(Items) {
        this.Items = Items;
    }

    getAll() {
        return this.Items.findAll().then(result => defaultResponse(result))
        .catch(error => errorResponse(error.message));
    }

    getById(id){
        return this.Items.findByPk(id).then(result => defaultResponse(result))
        .catch(error => errorResponse(error.message));
    }

    getByWhere(where){
        return this.Items.findAll({ where: where }).then(result => defaultResponse(result))
        .catch(error => errorResponse(error.message));
    }

    create(item){
        return this.Items.create(item).then(result => defaultResponse(result))
        .catch(error => errorResponse(error.message, httpStatus.UNPROCESSABLE_ENTITY));
    }

    update(item) {
        return this.Items.update(item, { where: { cdItem: item.cdItem } }).then(result => defaultResponse(result))
        .catch(error => errorResponse(error.message, httpStatus.UNPROCESSABLE_ENTITY));
    }

    delete(item) {
        return this.Items.destroy({ where: { cdItem: item.cdItem } }).then(result => defaultResponse(result))
        .catch(error => errorResponse(error.message, httpStatus.UNPROCESSABLE_ENTITY));
    }
}

module.exports = ItemsController;