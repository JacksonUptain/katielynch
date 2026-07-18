"use client";

import Link from "next/link";
import { pagePaths } from "./routes";

export default function KatieBioSection({ className = "" }) {
  const sectionClassName = ["katie-section", className].filter(Boolean).join(" ");

  return (
    <>
      <section id="bio" className={`${sectionClassName} katie-intro-section`}>
        <h2>About Katie Lynch</h2>
        <div className="katie-intro-layout">
          <div className="katie-photo-column">
            <Link href={pagePaths.contact} className="katie-photo-link" aria-label="Contact Katie Lynch">
              <img
                src="https://lh3.googleusercontent.com/a-/ALV-UjUgoM4CLOYApN3oXhKtgtbruhtm5ymFxY6IEO-uoyZToLRE8B4=s330-p-k-rw-no"
                alt="Katie Lynch"
                className="katie-photo"
              />
              <span className="katie-photo-overlay">Contact Me</span>
            </Link>
          </div>

          <div className="katie-intro-copy">
            <div className="katie-intro-text">
              <p>
                I am Katie Lynch, a{" "}
                <span className="highlight">Certified Academic Language Therapist</span> (CALT)
                and accredited Experienced Instructor with the Institute for Excellence in Writing
                (IEW). With a Master's in Applied Counseling Psychology and specialized training in{" "}
                <span className="highlight">dyslexia and dysgraphia</span>, I provide structured,
                evidence-based reading, spelling, and writing instruction for students who need clear,{" "}
                <span className="highlight">individualized support</span>.
              </p>

              <p>
                Through explicit, systematic, and diagnostic teaching, I tailor every lesson to your
                child's unique needs&mdash;helping them grow, gain confidence, and reach their full potential.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${sectionClassName} katie-lens-section`}>
        <div className="katie-section-heading">
          <h2>Approach</h2>
        </div>

        <div className="katie-lens-list">
          <article className="katie-lens-item">
            <h3 className="katie-lens-title">Learning Support</h3>
            <p className="katie-lens-copy">
              As a former high school counselor, college instructor, and homeschooling mother of
              three, I've seen how different learning styles&mdash;and gaps in both traditional and
              homeschool environments&mdash;can leave students struggling. My goal is to fill that
              gap by giving each child the tools they need to thrive academically and feel confident
              in their abilities.
            </p>
          </article>

          <article className="katie-lens-item">
            <h3 className="katie-lens-title">Literacy Growth</h3>
            <p className="katie-lens-copy">
              Since 2017, I have offered personalized tutoring and small-group writing instruction
              that helps students communicate clearly and build lasting literacy skills. I am trained
              in the Sounds In Syllables (SIS) program, an Orton-Gillingham-based structured literacy
              method, which allows me to support learners with a wide range of challenges.
            </p>
          </article>
        </div>
      </section>

      <section className={`${sectionClassName} katie-credentials-section`}>
        <h2>Education &amp; Professional Certifications</h2>
        <ul>
          <li>East Carolina University, BA in Psychology and Child Development and Family Relations</li>
          <li>University of Baltimore, MS in Counseling Psychology</li>
          <li>Atlantic Seaboard Dyslexia Education Center, Certified Academic Language Therapist</li>
          <li>Institute for Excellence in Writing, Experienced Instructor</li>
          <li>Professional member of the International Dyslexia Association (IDA)</li>
          <li>Certified therapist with the Academic Language Therapy Association (ALTA)</li>
          <li>Member of the Virginia Chapter of ALTA</li>
        </ul>
      </section>
    </>
  );
}
