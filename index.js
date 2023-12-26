import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/users.js";
import nearRouter from "./routes/near.js";
import cors from "cors";
import adviseRouter from "./routes/advise.js";
import paymentRouter from "./routes/payment.js";
import userSchema from "./models/userSchema.js";

dotenv.config();

const { ENVIRONMENT, MONGODB_LOCAL, MONGODB_PROD } = process.env;

export const app = express();
const PORT = 8000;

mongoose
  .connect(ENVIRONMENT === "dev" ? MONGODB_LOCAL : MONGODB_PROD, {})
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

// any domain can hit this backend server

const authMiddleWare = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email);
  const response = await userSchema.findOne({ email });
  console.log("response:::::", response);
  if (response?.subscription) {
    // res.send("Is Subsribed")
    next();
  } else {
    res.send("err");
  }
};
// Uses imported routes in express
app.use("/user", userRouter);
app.use("/near", nearRouter);
app.use("/advise", authMiddleWare);
app.use("/advise", adviseRouter);
app.use("/payment", paymentRouter);
// app.use("/", (req, res) => {
//   res.send("reply from server");
// });

app.post("/abc", authMiddleWare, (req, res) => {
  res.send("Pass");
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
