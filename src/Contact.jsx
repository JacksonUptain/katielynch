import HeaderHero from './HeaderHero';
import Footer from './Footer';
import { assetPath } from './sitePaths';
import { Clock, Envelope, GeoAlt, Telephone } from "react-bootstrap-icons";

export default function Contact() {
  return (
    <div className="contact-page">
      <HeaderHero
        image={assetPath("/images/capturingLiteracy.png")}
        title={"Contact Katie Lynch"}
        description={"How can I help your student succeed?"}
        currentPageName={"Contact"}
      />

      <main className="contact-main">
        <section className="contact-section">
          <div className="contact-intro">
            <h2>Contact Information</h2>
            <p>
              I would love to hear from you! Whether you have questions about my educational services or want to discuss your student's needs, please don't hesitate to reach out. I am based in Manassas, Virginia and work with families in Northern Virginia and online.
            </p>
          </div>

          <div className="contact-card-grid">
            <article className="contact-card contact-card-primary">
              <span className="contact-card-icon" aria-hidden="true"><Envelope /></span>
              <p className="contact-card-label">Email:</p>
              <a className="contact-action-button" href="mailto:KatieLynchTutor@gmail.com">
                KatieLynchTutor@gmail.com
              </a>
            </article>

            <article className="contact-card">
              <span className="contact-card-icon" aria-hidden="true"><Telephone /></span>
              <p className="contact-card-label">Phone:</p>
              <a className="contact-text-link" href="tel:+18084897886">
                (808) 489-7886
              </a>
            </article>

            <article className="contact-card contact-card-location">
              <span className="contact-card-icon" aria-hidden="true"><GeoAlt /></span>
              <p><strong>Location:</strong> Manassas, Virginia, USA</p>
              <p><strong>Serving:</strong> Manassas, Prince William County, Northern Virginia, and students in virtual classes online</p>
            </article>
          </div>

          <div className="contact-response-note">
            <Clock aria-hidden="true" />
            <p>
              I typically respond within 24-48 hours on weekdays. I look forward to connecting with you and helping your student achieve their academic goals!
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
