import HeaderHero from './HeaderHero';
import Footer from './Footer';
import { assetPath } from './sitePaths';

export default function Contact() {
  return (
    <div>
      <HeaderHero
        image={assetPath("/images/capturingLiteracy.png")}
        title={"Contact Katie Lynch"}
        description={"How can I help your student succeed?"}
        currentPageName={"Contact"}
      />

      <section className="contact-section">
        <p>
          I would love to hear from you! Whether you have questions about my educational services or want to discuss your student's needs, please don't hesitate to reach out. I am based in Manassas, Virginia and work with families in Northern Virginia and online.
        </p>

        <h3>Contact Information</h3>
        <p><strong>Email:</strong> <a href="mailto:KatieLynchTutor@gmail.com">KatieLynchTutor@gmail.com</a></p>
        <p><strong>Phone:</strong> <a href="tel:+18084897886">(808) 489-7886</a></p>
        <p><strong>Location:</strong> Manassas, Virginia, USA</p>
        <p><strong>Serving:</strong> Manassas, Prince William County, Northern Virginia, and online students</p>

        <p>
          I typically respond within 24-48 hours on weekdays. I look forward to connecting with you and helping your student achieve their academic goals!
        </p>
      </section>

      <Footer />
    </div>
  );
}
