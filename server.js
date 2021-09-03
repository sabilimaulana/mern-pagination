require("dotenv").config({ path: "./config.env" });

const express = require("express");

const app = express();

const PORT = process.env.PORT || 5000;

const connectDB = require("./config/db");
connectDB();

const postRoute = require("./routes/post.js");

app.use(express.json());

app.use("/api/v1/posts", postRoute);

app.use("/", (req, res) => {
  res.send("MERN PAGINATION");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
