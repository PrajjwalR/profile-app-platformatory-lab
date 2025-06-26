const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const { Connection, Client } = require("@temporalio/client");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

const Profile = require("./Profile");

app.get("/profile/:userId", async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.params.userId });
    res.json(profile || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/profile/:userId", async (req, res) => {
  try {
    const { firstName, lastName, phone, city, pincode } = req.body;
    const profile = await Profile.findOneAndUpdate(
      { userId: req.params.userId },
      { firstName, lastName, phone, city, pincode },
      { new: true, upsert: true }
    );
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

let temporalClient;
(async () => {
  const connection = await Connection.connect();
  temporalClient = new Client({ connection });
})();

const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/profiledb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
