import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const userExit = await User.findOne({ email });
    if (userExit) {
      return res.status(400).json({ message: "This email is taken" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await new User({ name, email, password: hashedPassword }).save();
    res.status(200).json({ message: "Register Succes" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
