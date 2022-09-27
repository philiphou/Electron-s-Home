import express from "express";
const app = express();
import products from "./data/products.js";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

dotenv.config();

connectDB();

app.get("/", (req, res) => {
  res.send("we are now good to go");
});
app.get("/api/products", (req, res) => {
  res.json(products);
});
app.get("/api/products/:id", (req, res) => {
  const product = products.find((e) => e._id === req.params.id);
  res.json(product);
});
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`server is on at ${port}`);
});
