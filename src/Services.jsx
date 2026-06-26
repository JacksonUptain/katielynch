import './App.css';
import HeaderHero from './HeaderHero';
import capturingLiteracy from './capturingLiteracy.png';
import ServiceCard from "./ServiceCard";
import Footer from './Footer';
import { useFirebaseSection } from './useFirebaseSection';
import { Link } from "react-router-dom";
import "./service.css"

export default function Services() {
  const servicesData = useFirebaseSection("Services").items || [];

  return (
    <div>
      
      <HeaderHero
        image={capturingLiteracy}
        title={"Services"}
        description={"provided by Katie Lynch"}
        currentPageName={"Services"}
      />

      <section
        className="services-preview quote-section"
        style={{
          borderLeft: "0px",
          
        }}
      >
        {servicesData.map((service, index) => (
          <div
            key={index}
            style={{
              borderBottom: "1px solid black",
              marginBottom: "1rem",
            }}
          >
            <Link
              to={`/services/${encodeURIComponent(service.title)}`}
              style={{ textDecoration: "none" }}
            >
              <ServiceCard
                title={service.title}
                description={service["short-description"]}
                image={service.image}
              />
            </Link>
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
}