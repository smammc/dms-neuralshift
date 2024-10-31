import "./DetailPage.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function DetailPage({ documents }) {
  console.log(documents);

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
  console.log("Document: ", document);

  console.log(references);

  //   Create links for references
  const createLinkedReferences = (text, references) => {
    let linkedText = text;

    // Helper function to escape special characters in a string for use in regex
    const escapeRegex = (str) => {
      return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // Escapes special characters
    };

    references.forEach((reference) => {
      const escapedName = escapeRegex(reference.name); // Step 1: Escape special characters
      console.log("Name: ", reference.name);
      console.log("Text includes name: ", text.includes(reference.name));
      console.log("Escaped name: ", escapedName);
      console.log("Text includes escaped name: ", text.includes(escapedName));
      const regex = new RegExp(`${escapedName}`, "g"); // Step 2: Use escaped name in regex
      console.log(regex);
      linkedText = linkedText.replace(
        regex,
        `<a href="${reference.url}" target="_blank" rel="noopener noreferrer">${reference.name}</a>`
      );
    });
    return linkedText;
  };

  // Summary with links
  //   const linkedDecision = createLinkedReferences(document.decision, references);

  return (
    <div className="detail-container">
      <div className="detail-title">
        <h1>{document.title}</h1>
      </div>
      <div className="information-container">
        <div className="processo">
          <div className="titulo">
            <h3> Processo: </h3>
          </div>
          <div className="texto">{document.process}</div>
        </div>
        <div className="relator">
          <div className="titulo">
            <h3> Relator: </h3>
          </div>
          <div className="texto">{document.reporter}</div>
        </div>
        <div className="tribunal">
          <div className="titulo">
            <h3> Tribunal: </h3>
          </div>
          <div className="texto">{document.court}</div>
        </div>
        <div className="sumario">
          <div className="titulo">
            <h3> Sumário: </h3>
          </div>
          <div className="texto">{document.summary}</div>
          {/* <div
            className="texto"
            dangerouslySetInnerHTML={{ __html: linkedSummary }}
          ></div> */}
        </div>
        <div className="data">
          <div className="titulo">
            <h3> Data: </h3>
          </div>
          <div className="texto">{document.date}</div>
        </div>
        <div className="descritores">
          <div className="titulo">
            <h3> Descritores: </h3>
          </div>
          <div className="texto">{document.descriptors}</div>
        </div>
        <div className="decisao">
          <div className="titulo">
            <h3> Decisão: </h3>
          </div>
          {/* <div className="texto">{item.process}</div> */}
        </div>
      </div>
    </div>
  );
}
