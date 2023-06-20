const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const urlRouter = require("./routes/urlRouter");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 8000;

mongoose
  .connect(
    `mongodb+srv://${process.env.USENAME}:${process.env.PASSWORD}@cluster0.oz1ak5v.mongodb.net/urlShorter`
  )
  .then(() => console.log("connection Successfull"))
  .catch((err) => console.log(err));

app.use("/", urlRouter);

app.listen(PORT, () => {
  console.log("server running in port 8000");
});
