const express = require("express");
const {
  getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} = require("../controllers/ProductsControllers");
const router = express.Router();

router.get("/", getAllProducts);
router.post("/", createProduct);
router.get("/:ProductId", getProductById);
router.put("/:ProductId", updateProduct);
router.delete("/:productId", deleteProduct);
module.exports = router;
