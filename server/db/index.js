// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

const MONGO_URI = "mongodb://mongodb:27017/dms-app";
// process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/dms-app";

// Define the connectDB function
async function connectDB() {
  try {
    const x = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const dbName = x.connections[0].name;
    console.log(`Connected to Mongo! Database name: "${dbName}"`);
  } catch (err) {
    console.error("Error connecting to mongo: ", err);
    process.exit(1); // Exit the process on connection error
  }
}

connectDB();
