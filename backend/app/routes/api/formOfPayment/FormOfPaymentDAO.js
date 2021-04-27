var router = require('express').Router();
const middlewareFunctions = require('../middleware/Middleware.js');
const formOfPayment = require('../../../model/FormOfPayment.js'); // import
const formOfPaymentsController = require('../../../controller/FormOfPayment.js'); // import
// const abstractController = require('../../../controller/AbstractController.js'); // import

const formOfPaymentController = new formOfPaymentsController(formOfPayment);
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
        await formOfPaymentController.getById(req.body.cdFormaPagamento).then(response => {
            res.status(response.statusCode)
            res.json(response.data)
        });
    });

    router.post('/findByWhere', async (req, res) => {
        const where = req.body;
        await formOfPaymentController.getByWhere(where).then(response => {
            res.status(response.statusCode)
            res.json(response.data)
        });
    });

    router.get('/findAll', async (req, res) => {
        await formOfPaymentController.getAll().then(response => {
            res.status(response.statusCode)
            res.json(response.data)
        });
    });

    router.post('/create', async (req, res) => {
        await formOfPaymentController.create(req.body).then(response => {
            res.status(response.statusCode)
            res.json(response.data)
        });
    });

    router.post('/update', async (req, res) => {
        await formOfPaymentController.update(req.body).then(response => {
            res.status(response.statusCode);
            res.json(response.data);
        });
    });

    router.post('/delete', async (req, res) => {
        await formOfPaymentController.delete(req.body).then(response => {
            res.status(response.statusCode);
            res.json(response.data);
        });
    });

})

module.exports = router;