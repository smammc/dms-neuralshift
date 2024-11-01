import "./DetailPage.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function DetailPage({ documents }) {
  const [document, setDocument] = useState();
  const { documentId } = useParams();
  const [references, setReferences] = useState();

  // Get the document and references of interest
  useEffect(() => {
    const doc = documents.find((doc) => doc._id === documentId);
    setDocument(doc);
    const refs = doc.documentReferences.entities;
    setReferences(refs);
  }, [documentId, documents]);

  if (!document) {
    return <p>Loading...</p>; // Show a loading message until the document is set
  }
  //   Create links for references
  const createLinkedReferences = (text, references) => {
    let linkedText = text;

    // Helper function to escape special characters in a string for use in regex
    const escapeRegex = (str) => {
      return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // Escapes special characters
    };

    references.forEach((reference) => {
      const escapedName = escapeRegex(reference.name); // Step 1: Escape special characters
      const regex = new RegExp(`${escapedName}`, "g"); // Step 2: Use escaped name in regex
      linkedText = linkedText.replace(
        regex,
        `<a href="${reference.url}" target="_blank" rel="noopener noreferrer">${reference.name}</a>`
      );
    });
    return linkedText;
  };

  // Decision with links
  const linkedDecisionText = createLinkedReferences(
    document.decision_text,
    references
  );

  const descriptors = document.descriptors.split("\n");

  return (
    <div className="detail-container">
      <div>
        <Link to={"/"}> Homepage</Link>
      </div>
      <div className="detail-title">
        <h1>{document.title}</h1>
      </div>
      <div className="information-container">
        <div className="process">
          <div className="titulo">
            <h3> Processo: </h3>
          </div>
          <div className="texto">{document.process}</div>
        </div>
        <div className="date">
          <div className="titulo">
            <h3> Data: </h3>
          </div>
          <div className="texto">{document.date}</div>
        </div>
        <div className="decision">
          <div className="titulo">
            <h3> Decisão: </h3>
          </div>
          <div className="texto">{document.decision}</div>
        </div>
        <div className="reporter">
          <div className="titulo">
            <h3> Relator: </h3>
          </div>
          <div className="texto">{document.reporter}</div>
        </div>
        <div className="court">
          <div className="titulo">
            <h3> Tribunal: </h3>
          </div>
          <div className="texto">{document.court}</div>
        </div>
        <div className="summary">
          <div className="titulo">
            <h3> Sumário: </h3>
          </div>
          <div className="texto">{document.summary}</div>
        </div>
        <div className="descriptors">
          <div className="titulo">
            <h3>Descritores:</h3>
          </div>
          <div className="texto">
            {descriptors.map((descriptor, index) => {
              return <div key={index}>{descriptor}</div>;
            })}
          </div>
        </div>
        <div className="decision-text">
          <div className="titulo">
            <h3>Decisão Integral</h3>
          </div>
          <div
            className="texto"
            dangerouslySetInnerHTML={{ __html: linkedDecisionText }}
          ></div>
        </div>
      </div>
    </div>
  );
}
