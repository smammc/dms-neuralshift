const router = require("express").Router();
const Document = require("../models/Document.model");
const Entity = require("../models/Entity.model");

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

// Delete document and entity

router.delete("/:id", (request, response, next) => {
  const { id } = request.params;

  // Delete both the Document and Entity in parallel
  Promise.all([Document.findByIdAndDelete(id), Entity.findByIdAndDelete(id)])
    .then(([deletedDocument, deletedEntity]) => {
      // Check if both Document and Entity were deleted
      if (!deletedDocument && !deletedEntity) {
        return response
          .status(404)
          .json({ error: "Document and Entity not found" });
      }

      if (!deletedDocument) {
        console.log("Entity successfully deleted, but Document not found.");
        return response
          .status(200)
          .json({ message: "Entity deleted, but Document not found" });
      }

      if (!deletedEntity) {
        console.log("Document successfully deleted, but Entity not found.");
        return response
          .status(200)
          .json({ message: "Document deleted, but Entity not found" });
      }

      // If both deletions were successful
      console.log("Document and Entity successfully deleted.");
      response
        .status(200)
        .json({ message: "Document and Entity successfully deleted" });
    })
    .catch((error) => {
      console.log("Error deleting Document or Entity: ", error);
      response
        .status(500)
        .json({ error: "Failed to delete Document or Entity" });
    });
});

module.exports = router;
