import "./Homepage.css";
import Document from "../Components/Document.jsx";

export default function Homepage({ documents, deleteDocument }) {
  documents.map((item) => {});
  return (
    <div className="main-container">
      {documents.map((item, index) => {
        return (
          <Document
            key={item._id}
            item={item}
            index={index}
            deleteDocument={deleteDocument}
          />
        );
      })}
    </div>
  );
}
