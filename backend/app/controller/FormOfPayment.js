const httpStatus = require('http-status');
const defaultResponse = (data, statusCode = httpStatus.OK) => ({data, statusCode});
const errorResponse = (message, statusCode = httpStatus.BAD_REQUEST) => defaultResponse({error: message}, statusCode);

class PaymentController {
  
  constructor(payment) {
    this.payment = payment;
  }

  getAll() {
    return this.payment.findAll().then(result => defaultResponse(result))
    .catch(error => errorResponse(error.message));
  }

  getById(id){
    return this.payment.findByPk(id).then(result => defaultResponse(result))
    .catch(error => errorResponse(error.message));
  }

  getByWhere(where){
    return this.payment.findAll({ where: where }).then(result => defaultResponse(result))
    .catch(error => errorResponse(error.message));
  }

  create(payment){
    return this.payment.create(payment).then(result => defaultResponse(result))
    .catch(error => errorResponse(error.message, httpStatus.UNPROCESSABLE_ENTITY));
  }

  update(payment) {
    return this.payment.update(payment, { where: { cdFormaPagamento: payment.cdFormaPagamento } }).then(result => defaultResponse(result))
    .catch(error => errorResponse(error.message, httpStatus.UNPROCESSABLE_ENTITY));
  }

  delete(payment) {
    return this.payment.destroy({ where: { cdFormaPagamento: payment.cdFormaPagamento } }).then(result => defaultResponse(result))
    .catch(error => errorResponse(error.message, httpStatus.UNPROCESSABLE_ENTITY));
  }
}

module.exports = PaymentController;