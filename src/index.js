require("./models/User");
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");

const requireAuth = require("./middlewares/requireAuth");

const app = express();
app.use(express.json());
app.use(authRoutes);
const MONGO_URL =
  "mongodb+srv://nasa-api:kmd123@nasacluster.uvu3kll.mongodb.net/track?retryWrites=true&w=majority";

mongoose.connect(MONGO_URL);
mongoose.connection.on("connected", () => {
  console.log("Connected to mongodb");
});

mongoose.connection.on("error", (error) => {
  console.error("Error connection to mongo", error);
});

app.get("/", requireAuth, (req, res) => {
  res.send(`Your email:${req.user.email}`);
});

app.listen(3000, () => {
  console.log(`Server is running on PORT:3000`);
});
