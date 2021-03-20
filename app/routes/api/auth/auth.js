var router = require('express').Router();
const middlewareFunctions = require('../middleware/Middleware.js');
const User = require('../../../model/User.js');
require('express-group-routes');

router.group((router) => {
    router.use(middlewareFunctions.sessChecker);    // * sessionChecker()

    router.post('/login', middlewareFunctions.validateParams([
        {
            paramKey: 'dsLogin',
            required: true,
            type: 'string',
        },
        {
            paramKey: 'dsPassword',
            required: true,
            type: 'string',
        }
    ]), async (req, res) => {
        const userLogin = req.body;
        let resultMessage = {};

        const user = await User.findOne({ where: { dsLogin: userLogin.dsLogin } });

        if(user){
            try {
                if(await user.validPassword(userLogin.dsPassword)){
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
            paramKey: 'nmUser',
            required: true,
            type: 'string',
        },
        {
            paramKey: 'dsLogin',
            required: true,
            type: 'string',
        },
        {
            paramKey: 'dsPassword',
            required: true,
            type: 'string',
        },
        {
            paramKey: 'dsEmail',
            required: true,
            type: 'string',
        },
        {
            paramKey: 'dsAvatar',
            required: false,
            type: 'string',
        }
    ]), async (req, res) => {
        await UserController.create(req.body).then(response => {
            res.status(response.statusCode)
            res.json(response.data)
        });
    });
});

module.exports = router;