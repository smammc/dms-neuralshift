const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const Document = require("./models/Document.model");
const Entity = require("./models/Entity.model");

// Directory where data files are stored
const directoryPath = path.join(__dirname, "data");

// Helper function to process HTML files
function processHtmlFile(filePath, fileName) {
  fs.readFile(filePath, "binary", (err, content) => {
    if (err) {
      return console.log("Error reading HTML file: ", err);
    }

    // Parse HTML content
    const $ = cheerio.load(content);

    // Extract information from HTML
    const title = $("title").text();

    // Extract court from title
    // If title includes "Supremo" extract everything after that
    // Else extract everything after "Tribunal"
    const court = title.includes("Supremo")
      ? title.match(/Supremo.*/)[0]
      : title.match(/Tribunal.*/)[0];

    const extractText = (labels) => {
      for (const label of labels) {
        const text = $(`td:contains("${label}")`)
          .next()
          .find('font[color="#000080"]')
          .text()
          .trim();
        if (text) {
          return text; // Return the first found text
        }
      }
      return ""; // Return an empty string if no text is found
    };

    // Create the newDocument object with multiple options for labels
    const newDocument = {
      _id: fileName,
      title: title,
      process: extractText(["Processo:"]),
      reporter: extractText(["Relator:"]),
      court: court,
      date: extractText(["Data do Acordão:"]),
      descriptors: extractText(["Descritores:"]),
      summary: extractText(["Sumário :", "Sumário"]), // Check both labels
      decision: extractText(["Decisão:"]),
      decision_text: extractText(["Decisão Texto Integral:"]),
      documentReferences: fileName,
    };

    // Check if document exists, save if new
    Document.findOne({ _id: newDocument._id })
      .then((existingDocument) => {
        if (existingDocument) {
          console.log(`Document with ID ${newDocument._id} already exists`);
        } else {
          Document.create(newDocument)
            .then((createdDocument) =>
              console.log("Document saved:\n", createdDocument)
            )
            .catch((error) => console.log("Error saving document: ", error));
        }
      })
      .catch((error) =>
        console.log("Error checking document existence: ", error)
      );
  });
}

// Helper function to process JSON files
function processJsonFile(filePath, fileName) {
  // Read and parse JSON file
  const jsonFile = require(`${filePath}`);

  const referencesArray = Array.isArray(jsonFile)
    ? jsonFile
    : jsonFile.entities;

  // Map JSON references to Entity Schema
  const references = referencesArray.map((reference) => ({
    name: reference.name,
    label: reference.label,
    url: reference.url,
  }));

  // Create and save Entity document
  const newEntity = new Entity({
    _id: fileName,
    entities: references,
  });

  // Check if entity exists, save if new
  Entity.findOne({ _id: newEntity._id })
    .then((existingEntity) => {
      if (existingEntity) {
        console.log(`Entity with ID ${newEntity._id} already exists`);
      } else {
        Entity.create(newEntity)
          .then((createdEntity) =>
            console.log("Entity saved:\n", createdEntity)
          )
          .catch((error) => console.log("Error saving entity: ", error));
      }
    })
    .catch((error) => console.log("Error checking entity existence: ", error));
}

// Main function to process all files in the directory
function parseFiles() {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return console.log("Could not read directory: ", err);
    }
    files.forEach((file) => {
      const filePath = path.join(directoryPath, file);
      const fileName = file.split(".")[0]; // Use filename as _id

      // Process based on file extension
      if (path.extname(file) === ".html") {
        processHtmlFile(filePath, fileName);
      } else if (path.extname(file) === ".json") {
        processJsonFile(filePath, fileName);
      }
    });
  });
}

// Run the script
parseFiles();
