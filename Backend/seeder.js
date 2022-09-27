import mongoose from "mongoose";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from'colors'
dotenv.config();

connectDB();

const importData = async () => {
  try {
    const createdUsers = await User.insertMany(users);
    const adminUserId = createdUsers[0]._id;
    const sampleProducts = products.map((e) => ({ ...e, user: adminUserId }));
    await Product.insertMany(sampleProducts);
    console.log(`data imported successfully`.green);
    process.exit();
  } catch (error) {
    console.error(`${error.message}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log('historical data is cleaned'.green)
    process.exit()
  } catch (error) {
    console.error(`${error.message}`.red.inverse);
    process.exit(1);
  }
};
if(process.argv[2]==='-d'){
  destroyData()
}else{
  importData()
}