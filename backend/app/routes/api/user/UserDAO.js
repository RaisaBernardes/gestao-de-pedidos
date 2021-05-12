const User = require('../../../model/User.js');
const UsersController = require('../../../controller/User.js');

var router = require('express').Router();

const middlewareFunctions = require('../middleware/Middleware.js');

const UserController = new UsersController(User);
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

    router.get('/userLogged', (req,res) => {
        res.json({status: true, userLogged: req.session.user})
    })

    router.get('/logout', async (req, res) => {
        res.clearCookie('SessionCookie');
        req.session.destroy;
        res.json({status: true, message: 'Logout!'})
    });

    router.post('/findByPk', middlewareFunctions.validateParams([
        {
            paramKey: 'cdUsuario',
            required: true,
            type: 'number',
        },
    ]), async (req, res) => {
        await UserController.getById(req.body.cdUsuario).then(response => {
            res.status(response.statusCode)
            res.json(response.data)
        });
    });

    router.post('/findByWhere', async (req, res) => {
        const where = req.body;
        await UserController.getByWhere(where).then(response => {
            res.status(response.statusCode)
            res.json(response.data)
        });
    });

    router.get('/findAll', async (req, res) => {
        await UserController.getAll().then(response => {
            res.status(response.statusCode)
            res.json(response.data)
        });
    });

    router.post('/create', middlewareFunctions.validateParams([
        {
            paramKey: 'nome',
            required: true,
            type: 'string',
        },
        {
            paramKey: 'telefone',
            required: true,
            type: 'number',
        },
        {
            paramKey: 'email',
            required: true,
            type: 'string',
        },
    ]), async (req, res) => {
        await UserController.create(req.body).then(response => {
            res.status(response.statusCode)
            res.json(response.data)
        });
    });

    router.post('/update', middlewareFunctions.validateParams([
        {
            paramKey: 'cdUsuario',
            required: true,
            type: 'number',
        },
        {
            paramKey: 'nome',
            required: true,
            type: 'string',
        },
        {
            paramKey: 'telefone',
            required: true,
            type: 'number',
        },
        {
            paramKey: 'email',
            required: true,
            type: 'string',
        }
    ]), async (req, res) => {
        await UserController.update(req.body).then(response => {
            res.status(response.statusCode);
            res.json(response.data);
        });
    });

    router.post('/delete', middlewareFunctions.validateParams([
        {
            paramKey: 'cdUsuario',
            required: true,
            type: 'number',
        },
    ]), async (req, res) => {
        await UserController.delete(req.body).then(response => {
            res.status(response.statusCode);
            res.json(response.data);
        });
    });
});

module.exports = router;