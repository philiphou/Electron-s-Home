import mongoose from "mongoose";
const reviewSchema=mongoose.Schema({
    name:{type:String,required:true},
    rating:{type:Number,required:true},
    comment:{type:String,required:true}
})
const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    reviews:[reviewSchema],
    category: {
      type: String,
      required: true,
    },
    descripton: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      default: 0,
    },
   countInStock: {
      type: Number,
      default: 10,
    },

  },
  { timestamps: true }
);
const Product = mongoose.model("User", productSchema);
export default Product;
