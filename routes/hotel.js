import { Router } from "express";
import hotelSchema from "../models/hotelSchema.js";

const hotelRouter = Router();

//C
async function registerHotel(req, res) {
  const { name, place, rating, food, price, room } = req.body;
  if (!name || !place || !rating || !food || !price || !room) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const hotelExists = await hotelSchema.exists({
    name,
  });

  if (hotelExists) {
    return res.status(400).json({
      success: false,
      message: "Hotel already exists",
    });
  }
  const user = hotelSchema({
    name,
    place,
    rating,
    food,
    price,
    room,
  });
  await user.save();

  return res.json({
    success: true,
    message: "Hotel created successfully.",
  });
}

hotelRouter.post("/registerHotel", registerHotel);


async function getRegisteredHotels(req, res) {
  const users = await hotelSchema.find();
  return res.json(users);
}
hotelRouter.get("/getHotels", getRegisteredHotels);

async function getSpecificHotel(req, res) {
  const { id } = req.params;
  const user = await hotelSchema.findById(id);
  return res.json(user);
}
hotelRouter.get("/getHotel/:id", getSpecificHotel);


export default hotelRouter;
