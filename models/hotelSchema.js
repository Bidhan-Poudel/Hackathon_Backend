import mongoose from "mongoose";


export const FoodSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
})

const HotelSchema = mongoose.Schema({
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
  },
  room:{
    type:Number,
    required:false,
  }
});

export default mongoose.model("Hotels", HotelSchema);
