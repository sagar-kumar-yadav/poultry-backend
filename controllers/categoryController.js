import categoryModel from "../model/categoryModel.js";
import slugify from "slugify";

// Create a new category || POST request
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ error: "Name is required" });
    }

    // if category is already existing in the database
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: false,
        error: "Category already exists",
      });
    }

    // if category is not existing in the category save it
    const newCategory = new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "category created",
      newCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).Send({
      success: false,
      message: "Error in category",
      error,
    });
  }
};

// Get all categories || GET request
export const getAllCategoriesController = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    res
      .status(200)
      .send({ success: true, message: "All category list", categories });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting categories",
      error,
    });
  }
};

// Get a single category by slug || GET request
export const getSingleCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "get single category successfully ",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting category",
      error,
    });
  }
};

// delete category by id
export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryModel.findByIdAndDelete(id);
    res
      .status(200)
      .send({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error in deleting category", error });
  }
};
