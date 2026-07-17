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
        title={"Educational Services"}
        description={"provided by Katie Lynch"}
        currentPageName={"Educational Services"}
      />

      <section className="services-page-intro">
        <div className="services-page-intro-photo">
          <img
            src={assetPath("/images/educational-services.png")}
            alt="Katie Lynch guiding a student through a literacy activity"
          />
        </div>

        <div className="services-page-intro-copy">
          <p className="services-page-eyebrow">Structured Literacy Support</p>
          <p>
            I provide personalized in-person and virtual dyslexia remediation,
            along with live virtual small-group and private writing and grammar instruction. Through a
            compassionate, evidence-based approach tailored to each student's unique learning profile, I
            help children build the skills and independence needed to thrive as readers and writers.
          </p>
        </div>
      </section>

      <section className="services-directory-section">
        <div className="services-directory-header">
          <p className="services-page-eyebrow">Current Offerings</p>
          <h2>Choose the Right Support</h2>
        </div>

        <div className="services-directory-list">
          {servicesData.length > 0 ? (
            servicesData.map((service, index) => (
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
            ))
          ) : (
            <p className="services-empty-state">Current offerings will be posted soon.</p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
