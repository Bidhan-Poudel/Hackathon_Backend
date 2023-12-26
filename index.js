import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/users.js";
import hotelRouter from "./routes/hotel.js";
import resturantRouter from "./routes/resturant.js";
import cors from "cors";

dotenv.config();

const { ENVIRONMENT, MONGODB_LOCAL, MONGODB_PROD } = process.env;

export const app = express();
const PORT= 8000;

mongoose
  .connect(ENVIRONMENT === "dev" ? MONGODB_LOCAL : MONGODB_PROD, {
   
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });
app.use(cors())
  
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

// any domain can hit this backend server

// Uses imported routes in express
app.use("/user", userRouter);
app.use("/hotel", hotelRouter);
app.use("/resturant",resturantRouter);

app.use("/", (req, res) => {
  res.send("reply from server");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
