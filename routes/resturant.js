import { Router } from "express";
import resturantSchema from "../models/resturantSchema.js";
const resturantRouter = Router();

//C
async function registerResturant(req, res) {
  const { name, place, rating, food, price,  } = req.body;
  if (!name || !place || !rating || !food || !price ) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const resturantExists = await resturantSchema.exists({
    name,
  });

  if (resturantExists) {
    return res.status(400).json({
      success: false,
      message: "Resturant already exists",
    });
  }
  const resturant = resturantSchema({
    name,
    place,
    rating,
    food,
    price,
  });
  await resturant.save();

  return res.json({
    success: true,
    message: "Resturant created successfully.",
  });
}

resturantRouter.post("/registerResturant", registerResturant);


async function getRegisteredResturant(req, res) {
  const resturants = await resturantSchema.find();
  return res.json(resturants);
}
resturantRouter.get("/getResturant", getRegisteredResturant);

async function getSpecificResturant(req, res) {
  const { id } = req.params;
  const resturant = await resturantSchema.findById(id);
  return res.json(resturant);
}
resturantRouter.get("/getResturant/:id", getSpecificResturant);


export default resturantRouter;
