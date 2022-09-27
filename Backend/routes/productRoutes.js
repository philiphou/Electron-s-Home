import express from "express";
import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";
const router = express.Router();

//  fetch all products ; access: public
router.get(
  "/",
  asyncHandler(async(req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);
//  fetch specific product: access: public
router.get(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if(product){
        res.json(product);
    }else{
        res.status(404)
        throw new Error('product not found')
    }

  })
);
export default router;
