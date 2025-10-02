const router = require("express").Router();
const adminController = require("../controllers/admin.controller");
const{auth, adminOnly} = require("../middleware/auth.middleware");

router.get("/all-users", auth, adminOnly, adminController.getAllUsers);


module.exports = router;