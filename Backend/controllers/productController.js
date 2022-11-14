import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";
export const getProducts = asyncHandler(async (req, res) => {
  const pageSize=8
  const page = Number(req.query.pageNumber)
  const keyword = req.query.keyword?{
        name: { $regex: req.query.keyword, $options: "i" },
      }
    : {};
    const count = await Product.countDocuments({...keyword})
  const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize*(page-1));
  res.json({products,page,pages:Math.ceil(count/pageSize)});
});

//  delete a product
//  @route  DELETE  /api/products/:id
//  access: private, only admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json("product is deleted successfully");
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});

export const getProductById = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});

//  Create a product
//  @route  POST  /api/products
//  access: private, only admin
export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "sample name",
    price: 11,
    user: req.user._id,
    brand: "sample brand",
    image: "/Images/HeadPhone/HeadPhone-1.jpg",
    category: "Sample category",
    countInStock: 20,
    numReviews: 5,
    description: "good quality",
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

//  Update a product
//  @route  Put  /api/products/:id
//  access: private, only admin
export const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("product is not found");
  }
});

//  create new review for a product
//  @route  POST /api/products/:id/reviews
//  access: private
export const createProductReview = asyncHandler(async (req, res) => {
  const { ratingNumber, comments } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(401);
      throw new Error("product already has your reviews");
    }
    const review = {
      rating: Number(ratingNumber),
      comment: comments,
      name: req.user.name,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    //  get the average rating number for the product from all reviews
    product.rating =
      product.reviews.reduce((acc, item) => acc + item.rating, 0) /
      product.reviews.length;
    const updatedProduct = await product.save();
    res.status(201).json({ message: "review is added" });
  } else {
    res.status(404);
    throw new Error("product is not found");
  }
});
