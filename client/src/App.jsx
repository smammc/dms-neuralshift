import { useEffect, useState } from "react";
import "./App.css";

import { fetchDocumnts, deleteDocument } from "./services/documentsService";
import { Route, Routes } from "react-router-dom";

// Pages import
import Homepage from "./Pages/Homepage";
import DetailPage from "./Pages/DetailPage";

function App() {
  const [documents, setDocuments] = useState([]);

  const getDocuments = () => {
    fetchDocumnts()
      .then((data) => setDocuments(data))
      .catch((error) => console.log("Error getting documents: ", error));
  };

  const removeDocument = (id) => {
    deleteDocument(id)
      .then((response) => console.log(response))
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
        {/* Footer */}

        {/* <Route path="*" element={}/> */}
      </Routes>
    </>
  );
}

export default App;
