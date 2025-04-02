const express = require("express");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../db");
const { authMiddleware } = require("../middleware");


router.post("/signup", async (req, res) => {
  const requiredBody = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
  });
  const parsedBody = requiredBody.safeParse(req.body);
  if (!parsedBody.success) {
    res.status(400).json({ message: "Incorrect Body" });
    return;
  }
  const { username, email, password } = parsedBody.data;
  const existingUser = await User.findOne({
    email: email,
  });

  if (existingUser) {
    return res.status(409).json({
      message: "Email already exist",
    });
  }
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      username: username,
      email: email,
      password: hashedPassword,
    });
    res.json({
      message: "signup successful",
    });
  } catch (e) {
    res.status(500).json({
      message: "Error while creating user",
    });
  }
});

router.post("/signin", async (req, res) => {
  const signinBody = z.object({
    email: z.string().email(),
    password: z.string(),
  });
  const parsedBody = signinBody.safeParse(req.body);
  if (!parsedBody.success) {
    res.status(400).json({ message: "Incorrect Body" });
    return;
  }
  const { email, password } = parsedBody.data;
  try {

    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      res.status(401).json({
        message: "User not found",
      });
      return;
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      res.status(409).json({
        message: "Incorrect Credentials",
      });
      return;
    }
    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET);
    res.json({
      message: "Sign in successful",
      token: token,
    });
  } catch (e) {
    res.status(500).json({
      message: "Error while signing in",
    });
  }
});

router.put("/update", authMiddleware ,async (req, res) => {
  const updateBody = z.object({
    username: z.string().optional(),
    password: z.string().optional(),
  });
  const parsedBody = updateBody.safeParse(req.body);
  if (!parsedBody.success) {
    res.status(400).json({ message: "Incorrect Body" });
    return;
  }
  const { username, password } = parsedBody.data;
  try{
    const updateData = {};
    if (username) updateData.username = username;
    if (password) updateData.password = await bcrypt.hash(password, 10);
    const result = await User.updateOne({ _id: req.userId }, { $set: updateData });
    res.json({
      message: "Update successful",
    });
  } catch (e) {
    res.status(500).json({
      message: "Error while updating",
    });
  }
});


router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || ""; 

  try {
    const users = await User.find({
      username: {
        "$regex": filter,
        "$options": "i", 
      },
    });
    res.json({
      users: users.map(user => ({
        username: user.username,
        _id: user._id,
      })),
    });
  } catch (e) {
    res.status(500).json({
      message: "Error while fetching users",
    });
  }
});


module.exports = router;
