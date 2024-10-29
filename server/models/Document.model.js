const { Schema, model, default: mongoose } = require("mongoose");

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
  summary: {
    type: String,
    required: [true, "Summary is required"],
  },
  documentReferences: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Entity",
  },
});

const Document = model("Document", documentSchema);

module.exports = Document;
