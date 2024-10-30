import "./Homepage.css";
import Document from "../Components/Document.jsx";

export default function Homepage({ documents }) {
  //   console.log("Homepage: ", documents);

  documents.map((item) => {
    console.log(item);
  });
  return (
    <div className="main-container">
      {documents.map((item, index) => {
        return <Document key={item._id} item={item} index={index} />;
      })}
    </div>
  );
}
