var router = require('express').Router();
const middlewareFunctions = require('../middleware/Middleware.js');
const ItemType = require('../../../model/ItemType.js'); // import
const ItemTypesController = require('../../../controller/ItemType.js'); // import

const ItemTypeController = new ItemTypesController(ItemType);
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
        await ItemTypeController.getById(req.body.cdTipoItem).then(response => {
            res.status(response.statusCode)
            res.json(response.data)
        });
    });

    router.post('/findByWhere', async (req, res) => {
        const where = req.body;
        await ItemTypeController.getByWhere(where).then(response => {
            res.status(response.statusCode)
            res.json(response.data)
        });
    });

    router.get('/findAll', async (req, res) => {
        await ItemTypeController.getAll().then(response => {
            res.status(response.statusCode)
            res.json(response.data)
        });
    });

    router.post('/create', async (req, res) => {
        await ItemTypeController.create(req.body).then(response => {
            res.status(response.statusCode)
            res.json(response.data)
        });
    });

    router.post('/update', async (req, res) => {
        await ItemTypeController.update(req.body).then(response => {
            res.status(response.statusCode);
            res.json(response.data);
        });
    });

    router.post('/delete', async (req, res) => {
        await ItemTypeController.delete(req.body).then(response => {
            res.status(response.statusCode);
            res.json(response.data);
        });
    });

})

module.exports = router;