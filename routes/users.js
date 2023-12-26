import { Router } from "express";
import userSchema from "../models/userSchema.js";
import { hashPassword } from "../utils/hashPassword.js";
import { checkPassword } from "../utils/checkPassword.js";

const userRouter = Router();

async function updateSubscription(req, res) {
  const bod = req.body;
  const email = bod.email;
  console.log(bod);
  try {
    // Find the user by email and update the subscription field
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: { subscription: true } },
      { new: true } // Returns the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({
      message: "Subscription updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating subscription:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
userRouter.post("/updateSubscription", updateSubscription);

//C
async function registerUser(req, res) {
  const { name, email, password } = req.body;
  if (!name || !password || !email) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const userExists = await userSchema.exists({
    email,
  });

  if (userExists) {
    return res.status(400).json({
      success: false,
      message: "Email already exists",
    });
  }

  const user = userSchema({
    name,
    password: await hashPassword(password),
    email,
  });
  await user.save();

  return res.json({
    success: true,
    message: "User created successfully.",
  });
}

userRouter.post("/registerUser", registerUser);

async function getRegisteredUsers(req, res) {
  const users = await userSchema.find();
  return res.json(users);
}
userRouter.get("/getUser", getRegisteredUsers);

async function LoginUser(req, res) {
  const { email, password } = req.body;

  const dbUser = await userSchema.findOne({
    email,
  });

  if (!dbUser) {
    return res.status(400).json({
      success: false,
      message: "Email doesn't exists.",
    });
  }

  const isPasswordCorrect = await checkPassword(password, dbUser.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({
      success: false,
      message: "Password incorrect",
    });
  }

  return res.json({
    success: true,
    message: "Data Found",
    data: {
      email,
    },
  });
}
userRouter.post("/loginUser", LoginUser);

export default userRouter;
