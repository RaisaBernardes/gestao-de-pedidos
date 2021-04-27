var router = require('express').Router();

// Sync all tables
(async () => {
    const {sequelizeConnect} = require('../../config/db.js');
    try {
        const result = await sequelizeConnect.sync();
    } catch (error) {
        console.log(error);
    }
})();

router.use((req, res, next) => {
    if (req.cookies.SessionCookie && !req.session.user) {
        res.clearCookie('SessionCookie');
    }
    next();
});

// Split up route handling
router.use('/auth', require('./auth/auth.js'));
router.use('/user', require('./user/UserDAO.js'));
router.use('/item', require('./item/ItemDAO.js'));
router.use('/item_type', require('./item_type/ItemTypeDAO.js'));
router.use('/order', require('./order/OrderDAO.js'));
router.use('/itemInOrder', require('./item_in_order/ItemInOrderDAO.js'));
router.use('/address', require('./address/AddressDAO.js'));
router.use('/payment', require('./payment/PaymentDAO.js'));
router.use('/formOfPayment', require('./formOfPayment/FormOfPaymentDAO.js'));

module.exports = router;