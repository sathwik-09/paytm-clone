const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const dotenv = require("dotenv");
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

const appRouter = require('./routes/index');


app.use("/api/v1", appRouter);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
  } catch (err) {
    console.log(err);
  }
};



app.listen(process.env.PORT, () => {
  connectDB();
  console.log("Server is running on port: " + process.env.PORT);
});
