var router = require('express').Router();
const middlewareFunctions = require('../middleware/Middleware.js');
const User = require('../../../model/User.js');
const UsersController = require('../../../controller/User.js');
const UserController = new UsersController(User);

const Address = require('../../../model/Address.js');
const AddressesController = require('../../../controller/Address.js');

const AddressController = new AddressesController(Address);
require('express-group-routes');

router.group((router) => {
    router.use(middlewareFunctions.sessChecker);    // * sessionChecker()

    router.post('/login', middlewareFunctions.validateParams([
        {
            paramKey: 'email',
            required: true,
            type: 'string',
        },
        {
            paramKey: 'senha',
            required: true,
            type: 'string',
        }
    ]), async (req, res) => {
        const userLogin = req.body;
        let resultMessage = {};

        const user = await User.findOne({ where: { email: userLogin.email } });

        if(user){
            try {
                if(await user.validPassword(userLogin.senha)){
                    resultMessage = {
                        status: true,
                        result: user
                    };

                    req.session.user = user.dataValues;
                }else{
                    resultMessage = {
                        status: false,
                        result: "Senha Inválida"
                    };
                }
            } catch (error) {
                resultMessage = {
                    status: false,
                    result: error
                };
            }
        }else{
            resultMessage = {
                status: false,
                result: "Login inválido"
            }
        }

        return res.json(resultMessage);
    });

    router.post('/signup', middlewareFunctions.validateParams([
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
            paramKey: 'logradouro',
            required: true,
            type: 'string',
        },
        {
            paramKey: 'email',
            required: true,
            type: 'string',
        },
        {
            paramKey: 'senha',
            required: false,
            type: 'string',
        },
        {
            paramKey: 'numero',
            required: false,
            type: 'string',
        },
        {
            paramKey: 'complemento',
            required: false,
            type: 'string',
        },
        {
            paramKey: 'bairro',
            required: false,
            type: 'string',
        },
        {
            paramKey: 'cidade',
            required: false,
            type: 'string',
        },
        {
            paramKey: 'estado',
            required: false,
            type: 'string',
        },
    ]), async (req, res) => {
        await AddressController.create(req.body).then(async responseAddress => {
            if(responseAddress.statusCode == 200){
                req.body.addressIdAddress = responseAddress.data.idAddress;
                await UserController.create(req.body).then(responseUser => {
                    res.status(responseUser.statusCode)
                    res.json(responseUser.data)
                });
            }
            // res.status(response.statusCode)
            // res.json(response.data)
        });
    });
});

module.exports = router;