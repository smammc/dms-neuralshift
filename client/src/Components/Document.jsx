import "./Document.css";
import { Link } from "react-router-dom";

export default function Document({ item, index }) {
  // Format descriptors to make it easier to display
  const descriptors = item.descriptors.split("\n");

  return (
    <div className="document-container" id={`document-${index}`}>
      <div className="processo">
        <Link to={`/document/${item.id}`}>
          <h3> Processo: </h3>
        </Link>
        <div className="processo-texto">{item.process}</div>
      </div>
      <div className="tribunal">
        <h3>Tribunal:</h3>
        <div className="trbunal-texto">{item.court}</div>
      </div>
      <div className="sumario">
        <h3>Sumário:</h3>
        <div className="sumario-texto">{item.summary}</div>
      </div>
      <div className="descritores">
        <h3>Descritores:</h3>
        {descriptors.map((descriptor, index) => {
          return <div>{descriptor}</div>;
        })}
      </div>
    </div>
  );
}
