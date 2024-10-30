// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

// Data processing scripts and directory to monitor
const dataProcessing = require("./dataProcessing");
const dirToMonitor = path.join(__dirname, "/data");

// Load file with last processed time
const lastProcessedFilePath = path.join(__dirname, "lastProcessed.json");
const lastProcessedFile = require(lastProcessedFilePath);
const { lastProcessedTime } = lastProcessedFile;

// Check if processing is needed
function checkIfProcessingNeeded() {
  const files = fs.readdirSync(dirToMonitor);
  for (const file of files) {
    const filePath = path.join(dirToMonitor, file);
    const stats = fs.statSync(filePath);
    if (stats.mtimeMs > lastProcessedTime) {
      return true; // processing needed
      console.log(`File ${file} will be processed`);
    }
  }
  return false;
}

// Update last processed time
function updateLastProcessedTime() {
  const currentTime = Date.now();
  fs.writeFileSync(
    lastProcessedFilePath,
    JSON.stringify({ lastProcessedTime: currentTime })
  );
}

// Run processing scripts if needed
function runProcessingScriptsIfNeeded() {
  if (checkIfProcessingNeeded()) {
    console.log("Running processing scripts...");
    dataProcessing;
    updateLastProcessedTime();
    console.log("Processing fineshed.");
  } else {
    console.log("No new or modified files to process.");
  }
}

// Initiate conditional processing after database connection
runProcessingScriptsIfNeeded();

module.exports = app;
