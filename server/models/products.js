import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

const Schema = mongoose.Schema;
loadType(mongoose);

const ProductSchema = new mongoose.Schema(
  {
    name:String,
    price:String,
    grade:String,
    dimensions:String,
    brand:String,
    location:String,
  },
  
  { timestamps: true }
);

const Products = mongoose.model("Product", ProductSchema);
export default Products;