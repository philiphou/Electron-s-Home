import express from "express";
const app = express();
import path from 'path'
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

import connectDB from "./config/db.js";

import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

dotenv.config();

connectDB();
// middleware to parse json data
app.use(express.json());

app.use("/api/products", productRoutes);

app.use("/users", userRoutes);
app.use("/orders", orderRoutes);
app.use('/upload',uploadRoutes)
const __dirname = path.resolve()
app.use('/uploads',express.static(path.join(__dirname,'/uploads')))

app.get('/paypal',(req,res)=>{
  res.send(process.env.PAYPAL_CLIENT_ID)
})
//

app.use(notFound);

//  global error taken

app.use(errorHandler);

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`server is on at ${port}`);
});
