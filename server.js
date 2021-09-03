require("dotenv").config({ path: "./config.env" });

const express = require("express");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/", (req, res) => {
  res.send("MERN PAGINATION");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
