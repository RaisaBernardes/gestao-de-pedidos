var router = require('express').Router();
const middlewareFunctions = require('../middleware/Middleware.js');
const Address = require('../../../model/Address.js'); // import
const AddressesController = require('../../../controller/Address.js'); // import

const AddressController = new AddressController(Address);
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
        await AddressController.getById(req.body.idAddress).then(response => {
            res.status(response.statusCode)
            res.json(response.data)
        });
    });

    router.post('/findByWhere', async (req, res) => {
        const where = req.body;
        await AddressController.getByWhere(where).then(response => {
            res.status(response.statusCode)
            res.json(response.data)
        });
    });

    router.get('/findAll', async (req, res) => {
        await AddressController.getAll().then(response => {
            res.status(response.statusCode)
            res.json(response.data)
        });
    });

    router.post('/create', async (req, res) => {
        await AddressController.create(req.body).then(response => {
            res.status(response.statusCode)
            res.json(response.data)
        });
    });

    router.post('/update', async (req, res) => {
        await AddressController.update(req.body).then(response => {
            res.status(response.statusCode);
            res.json(response.data);
        });
    });

    router.post('/delete', async (req, res) => {
        await AddressController.delete(req.body).then(response => {
            res.status(response.statusCode);
            res.json(response.data);
        });
    });

})

module.exports = router;