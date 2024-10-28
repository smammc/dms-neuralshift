const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");

// Directory where HTML files are stored
const directoryPath = path.join(__dirname);

// Function to read and parse HTML files
const parseHtmlFiles = () => {
  // Read all files in directory
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return console.log("Could not read directory: ", err);
    }
    // console.log(directoryPath);
    // console.log(files);
    // Loop through each file
    files.forEach((file) => {
      // Obtain only the HTML files
      if (path.extname(file) === ".html") {
        const filePath = path.join(directoryPath, file);
        console.log(filePath);

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
          console.log(title);
          console.log(process);
          console.log(reporter);
          console.log("COURT MISSING");
          console.log(date);
          console.log(descriptors);
          console.log(summary);
        });
      }
    });
  });
};

parseHtmlFiles();
