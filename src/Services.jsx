"use client";

import HeaderHero from './HeaderHero';
import ServiceCard from "./ServiceCard";
import Footer from './Footer';
import { useFirebaseSection } from './useFirebaseSection';
import Link from "next/link";
import { servicePath } from "./routes";
import { assetPath } from "./sitePaths";

export default function Services({ initialServices = [] }) {
  const servicesData = useFirebaseSection("Services", initialServices).items || [];

  return (
    <div>
      
      <HeaderHero
        image={assetPath("/images/capturingLiteracy.png")}
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
            className="service-list-item"
          >
            <Link
              href={servicePath(service)}
              className="service-card-link"
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
