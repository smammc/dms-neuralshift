const { Schema, model } = require("mongoose");

const documentSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required."],
  },
  process: {
    type: String,
    required: [true, "Process is required"],
  },
  reporter: {
    type: String,
    required: [true, "Reporter is required"],
  },
  court: {
    type: String,
    required: [true, "Court is required"],
  },
  date: {
    type: String,
    required: [true, "Date is required"],
  },
  descriptors: {
    type: String,
    required: [true, "Descriptores are required"],
  },
  Summary: {
    type: String,
    required: [true, "Summary is required"],
  },
});

const Document = model("Document", documentSchema);

module.exports = Document;
