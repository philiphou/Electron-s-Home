import express from "express";
import morgan from 'morgan'
const app = express();
import path from "path";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

import connectDB from "./config/db.js";

import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

dotenv.config();

connectDB();
// middleware to parse json data
app.use(express.json());
if(process.env.NODE_ENV==='development'){

  app.use(morgan('dev'))
}
const __dirname = path.resolve();
app.use(express.static(__dirname));

app.use("/api/products", productRoutes);

app.use("/users", userRoutes);
app.use("/orders", orderRoutes);
app.use("/api/uploads", uploadRoutes);

app.use("/api/uploads", express.static(path.join(__dirname, "/uploads")));

app.get("/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});
//

app.use(notFound);

//  
app.use(express.static(path.join(__dirname,'frontend/build')))
app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,'frontend/build/index.html'))
})

//  global error taken

app.use(errorHandler);

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`server is on at ${port}`);
});
