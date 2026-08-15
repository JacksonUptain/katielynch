import Link from "next/link";
import { ArrowRight } from "react-bootstrap-icons";
import { pagePaths } from "./routes";

export default function ContactCta({ className = "" }) {
  return (
    <section className={`home-contact-cta ${className}`.trim()}>
      <div className="home-contact-cta-copy">
        <p className="home-contact-cta-eyebrow">A thoughtful next step</p>
        <h2>Let’s help your student become a more confident reader and writer.</h2>
        <p>
          Tell me a little about your student, what feels difficult right now, and the
          kind of support you are looking for. I’ll help you decide whether Capturing
          Literacy is a good fit.
        </p>
        
      </div>

      <Link href={pagePaths.contact} className="home-contact-cta-button">
        Contact Katie Lynch
        <ArrowRight aria-hidden="true" />
      </Link>
    </section>
  );
}
