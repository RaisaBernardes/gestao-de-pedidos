var router = require('express').Router();
const middlewareFunctions = require('../middleware/Middleware.js');
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
        await ItemInOrderController.getById(req.body.cdItemPedido).then(response => {
            res.status(response.statusCode)
            res.json(response.data)
        });
    });

    router.post('/findByWhere', async (req, res) => {
        const where = req.body;
        await ItemInOrderController.getByWhere(where).then(response => {
            res.status(response.statusCode)
            res.json(response.data)
        });
    });

    router.get('/findAll', async (req, res) => {
        await ItemInOrderController.getAll().then(response => {
            res.status(response.statusCode)
            res.json(response.data)
        });
    });

    router.get('/findAllMirna', async (req, res) => {
        await ItemInOrderController.getByWhereMirna().then(response => {
            res.status(response.statusCode)
            res.json(response.data)
        });
    });

    router.post('/create', async (req, res) => {
        await ItemInOrderController.create(req.body).then(response => {
            res.status(response.statusCode)
            res.json(response.data)
        });
    });

    router.post('/update', async (req, res) => {
        await ItemInOrderController.update(req.body).then(response => {
            res.status(response.statusCode);
            res.json(response.data);
        });
    });

    router.post('/delete', async (req, res) => {
        await ItemInOrderController.delete(req.body).then(response => {
            res.status(response.statusCode);
            res.json(response.data);
        });
    });

})

module.exports = router;