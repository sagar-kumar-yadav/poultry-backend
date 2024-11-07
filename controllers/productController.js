import productModel from "../model/productModel.js";
import categoryModel from "../model/categoryModel.js";
import slugify from "slugify";
import { uploadImageOnCloudinary } from "../utils/cloudinary.js";

// create a new product || POST
export const createProduct = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.body;

    const photoLocalPath = req.files?.photos.map((file) => file.path);
    console.log(photoLocalPath);

    const folderName = "poultry_images";

    const photoUploadPromises = photoLocalPath.map(async (localPath) => {
      return await uploadImageOnCloudinary(localPath, folderName);
    });

    const uploadedPhotos = await Promise.all(photoUploadPromises);

    const photoURLs = uploadedPhotos.map((photo) => photo.url);

    // Create a new product
    const newProduct = await productModel({
      ...req.body,
      slug: slugify(name),
      photos: photoURLs,
    });
    await newProduct.save();

    res.status(201).send({
      success: true,
      message: "Product saved successfully",
      newProduct,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ success: false, message: "error in creating product", error });
  }
};

// get all products || GET
export const getProducts = async (req, res) => {
  try {
    const products = await productModel
      .find()
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.send({
      success: true,
      message: "all products",
      totalCount: products.length,
      products,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ success: false, message: "error in getting products", error });
  }
};

// get product by category || GET
export const getProductByCategory = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while getting product",
      error,
    });
  }
};
