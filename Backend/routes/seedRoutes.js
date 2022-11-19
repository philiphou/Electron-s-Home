import express from "express";
import users from "../data/users.js";
import products from "../data/products.js";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";

const router = express.Router();
router.get('/',async (req,res)=>{
    const createdUsers = await User.insertMany(users);
    const adminUserId = createdUsers[0]._id;
    const sampleProducts = products.map((e) => ({ ...e, user: adminUserId }));
   const createdProducts= await Product.insertMany(sampleProducts);
    res.send('good to go')
})
export default router