import { useEffect, useState } from "react";
import "./App.css";

import { fetchDocumnts, deleteDocument } from "./services/documentsService";
import { Route, Routes } from "react-router-dom";

// Pages import
import Homepage from "./Pages/Homepage";
import DetailPage from "./Pages/DetailPage";
import ErrorPage from "./Pages/ErrorPage";

function App() {
  const [documents, setDocuments] = useState([]);

  const getDocuments = () => {
    fetchDocumnts()
      .then((data) => setDocuments(data))
      .catch((error) => console.log("Error getting documents: ", error));
  };

  const removeDocument = (id) => {
    deleteDocument(id)
      .then((response) => {
        console.log(response.data.message);
        // Update the documents state to remove the deleted document
        setDocuments((prevDocuments) =>
          prevDocuments.filter((doc) => doc._id !== id)
        );
      })
      .catch((error) => console.log("Error deleting document: ", error));
  };

  useEffect(() => {
    getDocuments();
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Homepage documents={documents} deleteDocument={removeDocument} />
          }
        />

        <Route
          path="/document/:documentId"
          element={<DetailPage documents={documents} />}
        />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
