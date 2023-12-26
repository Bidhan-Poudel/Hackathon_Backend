import mongoose from "mongoose";
import { FoodSchema } from "./hotelSchema.js";
const ResturantSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: false,
  },
  rating: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: false,
  },
  food:{
    type: [FoodSchema],
    required: false,
  }
});

export default mongoose.model("ResturantSchema", ResturantSchema);
