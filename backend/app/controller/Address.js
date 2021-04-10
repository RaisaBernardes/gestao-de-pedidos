const httpStatus = require('http-status');
const defaultResponse = (data, statusCode = httpStatus.OK) => ({data, statusCode});
const errorResponse = (message, statusCode = httpStatus.BAD_REQUEST) => defaultResponse({error: message}, statusCode);

class AddressController {
    constructor(Address) {
        this.Address = Address;
    }

    getAll() {
        return this.Address.findAll().then(result => defaultResponse(result))
        .catch(error => errorResponse(error.message));
    }

    getById(id){
        return this.Address.findByPk(id).then(result => defaultResponse(result))
        .catch(error => errorResponse(error.message));
    }

    getByWhere(where){
        return this.Address.findAll({ where: where }).then(result => defaultResponse(result))
        .catch(error => errorResponse(error.message));
    }

    create(address){
        return this.Address.create(address).then(result => defaultResponse(result))
        .catch(error => errorResponse(error.message, httpStatus.UNPROCESSABLE_ENTITY));
    }

    update(address) {
        delete address.dsPassword;
        return this.Address.update(address, { where: { idAddress: address.idAddress } }).then(result => defaultResponse(result))
        .catch(error => errorResponse(error.message, httpStatus.UNPROCESSABLE_ENTITY));
    }

    delete(address) {
        return this.Address.destroy({ where: { idAddress: address.idAddress } }).then(result => defaultResponse(result))
        .catch(error => errorResponse(error.message, httpStatus.UNPROCESSABLE_ENTITY));
    }
}

module.exports = AddressController;