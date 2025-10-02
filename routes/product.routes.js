const router = require("express").Router();
const productController = require("../controllers/product.controller");
const {auth, adminOnly} = require("../middleware/auth.middleware");
const upload = require("../middleware/cloudinary.middleware");


router.post("/create-product", auth, adminOnly, upload.single('image'), productController.createProduct);

module.exports = router;