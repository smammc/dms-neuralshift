const { Schema, model } = require("mongoose");

const referenceSchema = new Schema({
  name: {
    type: String,
    required: true,
    description: "Name of the entity present in the text",
  },
  label: {
    type: String,
    enum: ["CASE", "LAW"],
    required: true,
    description: "Type of the entity",
  },
  url: {
    type: String,
    description: "External URL of the entity",
  },
});

// The EntitySchema is an array of references
const EntitySchema = new Schema({
  entities: {
    type: [referenceSchema],
    required: true,
    description: "Array of entity objects",
  },
});

// Create and export the model
const Entity = model("Entity", EntitySchema);
module.exports = Entity;
