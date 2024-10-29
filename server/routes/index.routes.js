const router = require("express").Router();
const { request } = require("../app");
const Document = require("../models/Document.model");
const Entity = require("../models/Entity.model");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// Get all documents
router.get("/documents", (request, response, next) => {
  Document.find()
    .populate("documentReferences")
    .then((documents) => {
      console.log("Retrieved documents: ", documents);
      response.status(200).json(documents);
    })
    .catch((error) => {
      console.log("Error retrieving documents: ", error);
      response.status(500).json({ error: "Failed to retrieve documents" });
    });
});

// Delete document

router.delete("/:documentId", (request, response, next) => {
  const { documentId } = request.params;
  Document.findByIdAndDelete(documentId)
    .then((deletedDocument) => {
      console.log("Documented successuffully deleted");
      response.status(200).send("Document deleted");
    })
    .catch((error) => {
      console.log("Error deleting document: ", error);
      response.status(500).json({ error: "Failed to delete document" });
    });
});

module.exports = router;
