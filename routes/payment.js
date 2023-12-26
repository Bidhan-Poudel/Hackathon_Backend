import { Router } from "express";
import axios from "axios";
import dotenv from "dotenv";
import userSchema from "../models/userSchema.js";

dotenv.config();
const paymentRouter = Router();
const { KHALTI_SECRET_KEY } = process.env;
paymentRouter.post("/khalti-api", async (req, res) => {
  try {
    const { payload, loginData } = req.body;
    console.log(loginData);

    const response = await axios.post(
      "https://a.khalti.com/api/v2/epayment/initiate/",
      payload,
      {
        headers: { Authorization: `KEY ${KHALTI_SECRET_KEY}` },
      }
    );

    if (response) {
      console.log("response", response.data);
      // try {
      const updateResult = await userSchema.updateOne(
        { email: response.data.email },
        {
          $set: { subscription: true },
        }
      );
      console.log(updateResult);
      //   if (updateResult.ok === 1) {
      res.json({
        success: true,
        data: response.data,
        // subscription: true,
      });
      //   } else {
      //     console.log("Update failed");
      //     res.json({
      //       success: false,
      //       message: "Failed to update subscription",
      //       subscription: false,
      //     });
      //   }
      // } catch (err) {
      //   console.log(err);
      // }

      // Check if the update was successful
    } else {
      console.log("not done");
      res.json({
        success: false,
        message: "Something Went Wrong",
        subscription: false,
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      subscription: false,
    });
  }
});

export default paymentRouter;
