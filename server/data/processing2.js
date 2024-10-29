const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const mongoose = require("../db/index");
const Entity = require("../models/Entity.model");

// Directory where HTML files are stored
const directoryPath = path.join(__dirname);

// Function to read and parse HTML files
const parseJsonFiles = () => {
  // Read all files in directory
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return console.log("Could not read directory: ", err);
    }
    // Loop through each file
    files.forEach((file) => {
      // Obtain only the HTML files
      if (path.extname(file) === ".json") {
        const filePath = path.join(directoryPath, file);
        const fileName = file.split(".")[0]; // Get filename for _id

        // Store JSON data
        const jsonFile = require(`${filePath}`);

        // Map JSON references to Entity Schema
        const references = jsonFile.map((reference) => ({
          name: reference.name,
          label: reference.label,
          url: reference.url,
        }));

        // Create and save Entity document
        const newEntity = new Entity({
          _id: fileName,
          entities: references,
        });

        // Check if Entity already exists before saving it
        Entity.findOne({ _id: newEntity._id })
          .then((existingEntity) => {
            if (existingEntity) {
              console.log(`Entity with ID ${newEntity._id} already exists`);
            } else {
              // Save Entity
              return Entity.create(newEntity)
                .then((createdEntity) =>
                  console.log("Entity saved:\n", createdEntity)
                )
                .catch((error) => console.log("Error saving entity: ", error));
            }
          })
          .catch((error) =>
            console.log("Error checking entity existence: ", error)
          );
      }
    });
  });
};

parseJsonFiles();
