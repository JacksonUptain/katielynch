import { useNavigate } from "react-router-dom";
import "./ServiceCard.css";

export default function ServiceCard({ title, description, image, link, reverse }) {
  const navigate = useNavigate();

  

  return (
    
    <div
      className={`service-card ${reverse ? "reverse" : ""}`}
      onClick={() => navigate(link)}
    >
      <div className="service-image">
        {image && <img src={image} alt={title} style={{outline: '1px solid black', outlineOffset: '-5px'}}/>}
      </div>

      <div className="service-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}