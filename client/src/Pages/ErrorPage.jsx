import image from "../assets/not-found.svg";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "90vh",
        gap: "50px",
      }}
    >
      <img
        src={image}
        alt="Not found Page"
        style={{
          width: "200px",
          height: "200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
      <div>
        <Link to={"/"}> Homepage</Link>
      </div>
    </div>
  );
}
