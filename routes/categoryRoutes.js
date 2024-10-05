import express from "express";
import {
  createCategoryController,
  deleteCategoryController,
  getAllCategoriesController,
  getSingleCategoryController,
} from "../controllers/categoryController.js";

// router object
const router = express.Router();

// routes
// create category routes |||POST
router.post("/create-category", createCategoryController);

// get all categories routes || GET
router.get("/get-all-categories", getAllCategoriesController);

// get single category routes
router.get("/get-single-category/:slug", getSingleCategoryController);

// delete single category routes
router.delete("/delete-single-category/:id", deleteCategoryController);

export default router;
