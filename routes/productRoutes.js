import express from "express";
import { createProduct, getProductByCategory, getProducts, searchProduct } from "../controllers/productController.js";
import { upload } from "../middlewares/multerMiddleware.js";

const router = express.Router();

// POST /api/products
router.post(
  "/create-product",
  upload.fields([
    {
      name: "photos",
      maxCount: 5,
    },
  ]),
  createProduct
);

// GET /api/products
router.get("/get-products", getProducts);

// GET /category wise products routes
router.get("/product-category/:slug", getProductByCategory);

// search products routes
router.get("/search/:keyword", searchProduct);

export default router;
