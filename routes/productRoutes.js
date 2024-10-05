import express from "express";
import { createProduct, getProducts } from "../controllers/productController.js";
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

export default router;
