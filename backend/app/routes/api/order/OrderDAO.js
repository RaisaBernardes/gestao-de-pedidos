var router = require('express').Router();
const middlewareFunctions = require('../middleware/Middleware.js');

const Order = require('../../../model/Order.js'); // import
const OrdersController = require('../../../controller/Order.js'); // import
const OrderController = new OrdersController(Order);

const payment = require('../../../model/Payment.js'); // import
const paymentsController = require('../../../controller/Payment.js'); // import
const paymentController = new paymentsController(payment);

const ItemInOrder = require('../../../model/ItemInOrder.js'); // import
const ItensInOrdersController = require('../../../controller/ItemInOrder.js'); // import
const ItemInOrderController = new ItensInOrdersController(ItemInOrder);

require('express-group-routes');

router.group((router) => {
    router.use(middlewareFunctions.auth);    // * authorize()

    // Test Get
    router.get('/test', (req, res) => {
        res.json({
            status: true,
            message: 'Hello world',
            userLogged: req.session.user
        });
    });

    router.post('/findByPk', async (req, res) => {
        await OrderController.getById(req.body.cdPedido).then(response => {
            res.status(response.statusCode)
            res.json(response.data)
        });
    });

    router.post('/findByWhere', async (req, res) => {
        const where = req.body;
        await OrderController.getByWhere(where).then(response => {
            res.status(response.statusCode)
            res.json(response.data)
        });
    });

    router.get('/findAll', async (req, res) => {
        await OrderController.getAll().then(response => {
            res.status(response.statusCode)
            res.json(response.data)
        });
    });

    router.post('/create', async (req, res) => {
        let paymentAndItemInOrder = req.body;

        let payment = {
            'orderCdPedido': '',
            'vlTotal': paymentAndItemInOrder.pagamento.vlTotal,
            'formOfPaymentCdFormaPagamento': paymentAndItemInOrder.pagamento.formaPagamento.cdFormaPagamento
        };
        
        let order = {
            'userCdUsuario': req.session.user.cdUsuario,
            'status': "CRIADO",
            'precoTotal': payment.vlTotal
        };

        let statusCode = {
            'paymentStatusCode': "",
            'itemInOrderStatusCode': "",
            'orderStatusCode': ""
        };

        let resultData = {
            'paymentData': "",
            'itemInOrderData': "",
            'orderData': ""
        };

        await OrderController.create(order).then(async responseOrder => {
            payment.orderCdPedido = responseOrder.data.cdPedido; // Pegando a PK do pedido e Adicionando no Pagamento
            await paymentController.create(payment).then(responsePayment => {
                statusCode.paymentStatusCode = responsePayment.statusCode;
                resultData.paymentData = responsePayment.data;
            });

            await paymentAndItemInOrder.pedidos.forEach(async element => {
                element.orderCdPedido = responseOrder.data.cdPedido; // Pegando a PK do pedido e Adicionando no Pedido Contem
                await ItemInOrderController.create(element).then(responseItemInOrder => {
                    statusCode.itemInOrderStatusCode = responseItemInOrder.statusCode;
                    resultData.itemInOrderData = responseItemInOrder.data;
                });
            });

            statusCode.orderStatusCode = responseOrder.statusCode;
            resultData.orderData = responseOrder.data;

            res.status(statusCode.orderStatusCode);
            res.json(resultData);

        });
    });

    router.post('/update', async (req, res) => {
        await OrderController.update(req.body).then(response => {
            res.status(response.statusCode);
            res.json(response.data);
        });
    });

    router.post('/delete', async (req, res) => {
        await OrderController.delete(req.body).then(response => {
            res.status(response.statusCode);
            res.json(response.data);
        });
    });

})

module.exports = router;