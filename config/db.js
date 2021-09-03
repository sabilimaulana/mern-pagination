const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connect to database succes :)");
  } catch (error) {
    console.log("Connect to database failed :(");
    process.exit(1);
  }
};

module.exports = connectDB;
