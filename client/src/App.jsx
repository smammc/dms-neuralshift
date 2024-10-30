import { useEffect, useState } from "react";
import "./App.css";

import { fetchDocumnts, deleteDocument } from "./services/documentsService";
import { Route, Routes } from "react-router-dom";

// Pages import
import Homepage from "./Pages/Homepage";

function App() {
  const [documents, setDocuments] = useState([]);

  const getDocuments = () => {
    fetchDocumnts()
      .then((data) => setDocuments(data))
      .catch((error) => console.log("Error getting documents: ", error));
  };

  useEffect(() => {
    getDocuments();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage documents={documents} />} />

        <Route path="/document/:documentId" />
        {/* Footer */}

        {/* <Route path="*" element={}/> */}
      </Routes>
    </>
  );
}

export default App;
