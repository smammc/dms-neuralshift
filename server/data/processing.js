const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const mongoose = require("../db/index");
const Document = require("../models/Document.model");

// Directory where HTML files are stored
const directoryPath = path.join(__dirname);

// Function to read and parse HTML files
const parseHtmlFiles = () => {
  // Read all files in directory
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return console.log("Could not read directory: ", err);
    }
    // Loop through each file
    files.forEach((file) => {
      // Obtain only the HTML files
      if (path.extname(file) === ".html") {
        const filePath = path.join(directoryPath, file);
        const fileName = file.split(".")[0]; // Get filename for _id

        // Read content of file
        fs.readFile(filePath, "binary", (err, content) => {
          if (err) {
            return console.log("Error reading file: ", err);
          }

          //   Load the HTML with cheerio
          const $ = cheerio.load(content);

          //   Extract information

          //   Extract title
          const title = $("title").text();

          //   Function to extract text of interest
          //   Receives label to extract text from
          const extractText = (label) => {
            return $(`td:contains("${label}")`)
              .next()
              .find('font[color="#000080"]')
              .text()
              .trim(); // remove white spaces
          };

          const process = extractText("Processo:");
          const reporter = extractText("Relator:");
          // COURT
          const date = extractText("Data do Acordão:");
          const descriptors = extractText("Descritores:");
          const summary = extractText("Sumário :");

          //   Output extracted information
          const newDocument = {
            _id: fileName,
            title: title,
            process: process,
            reporter: reporter,
            court: "court",
            date: date,
            descriptors: descriptors,
            summary: summary,
            documentReferences: fileName,
          };
          // console.log(newDocument);

          // Check if document already exists before saving it
          Document.findOne({ _id: newDocument._id })
            .then((existingDocument) => {
              if (existingDocument) {
                console.log(
                  `Document with ID ${newDocument._id} already exists`
                );
              } else {
                // Save document
                return Document.create(newDocument)
                  .then((createdDocument) =>
                    console.log("Document saved:\n", createdDocument)
                  )
                  .catch((error) =>
                    console.log("Error saving document: ", error)
                  );
              }
            })
            .catch((error) =>
              console.log("Error checking document existence: ", error)
            );
        });
      }
    });
  });
};

parseHtmlFiles();
