const router = require('express').Router();


router.use("/auth", require('./auth.route'));
router.use("/user", require('./user.route'));
router.use("/admin", require('./admin.routes'));
router.use("/product", require('./product.routes'));


module.exports = router;