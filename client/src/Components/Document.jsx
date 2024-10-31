import "./Document.css";
import { Link } from "react-router-dom";
import external from "../assets/external.png";
import trash from "../assets/delete.png";

export default function Document({ item, index, deleteDocument }) {
  // Format descriptors to make it easier to display
  const descriptors = item.descriptors.split("\n");

  return (
    <div className="document-container" id={`document-${index}`}>
      <div className="processo">
        <div className="titulo">
          <h3> Processo: </h3>
        </div>
        <div className="texto">{item.process}</div>
      </div>
      <div className="tribunal">
        <div className="titulo">
          <h3>Tribunal:</h3>
        </div>
        <div className="texto">{item.court}</div>
      </div>
      <div className="sumario">
        <div className="titulo">
          <h3>Sumário:</h3>
        </div>
        <div className="texto">{item.summary}</div>
      </div>
      <div className="descritores">
        <div className="titulo">
          <h3>Descritores:</h3>
        </div>
        <div className="texto">
          {descriptors.map((descriptor, index) => {
            return <div key={index}>{descriptor}</div>;
          })}
        </div>
      </div>
      <div className="detail-button">
        <Link to={`/document/${item._id}`}>
          <img src={external} alt="detail-button" className="button" />
        </Link>
        <img
          src={trash}
          alt="delete"
          onClick={() => deleteDocument(`${item._id}`)}
        />
      </div>
    </div>
  );
}
