const httpStatus = require('http-status');
const defaultResponse = (data, statusCode = httpStatus.OK) => ({data, statusCode});
const errorResponse = (message, statusCode = httpStatus.BAD_REQUEST) => defaultResponse({error: message}, statusCode);

class ItemTypesController {
    constructor(ItemTypes) {
        this.ItemTypes = ItemTypes;
    }

    getAll() {
        return this.ItemTypes.findAll().then(result => defaultResponse(result))
        .catch(error => errorResponse(error.message));
    }

    getById(id){
        return this.ItemTypes.findByPk(id).then(result => defaultResponse(result))
        .catch(error => errorResponse(error.message));
    }

    getByWhere(where){
        return this.ItemTypes.findAll({ where: where }).then(result => defaultResponse(result))
        .catch(error => errorResponse(error.message));
    }

    create(ItemType){
        return this.ItemTypes.create(ItemType).then(result => defaultResponse(result))
        .catch(error => errorResponse(error.message, httpStatus.UNPROCESSABLE_ENTITY));
    }

    update(ItemType) {
        return this.ItemTypes.update(ItemType, { where: { cdTipoItem: ItemType.cdTipoItem } }).then(result => defaultResponse(result))
        .catch(error => errorResponse(error.message, httpStatus.UNPROCESSABLE_ENTITY));
    }

    delete(ItemType) {
        return this.ItemTypes.destroy({ where: { cdTipoItem: ItemType.cdTipoItem } }).then(result => defaultResponse(result))
        .catch(error => errorResponse(error.message, httpStatus.UNPROCESSABLE_ENTITY));
    }
}

module.exports = ItemTypesController;