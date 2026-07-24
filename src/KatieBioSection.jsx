"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import Link from "next/link";
import { pagePaths } from "./routes";

const approachSlides = [
  {
    title: "Learning Support",
    copy: (
      <>
        As a former high school counselor, college instructor, and homeschooling mother of
        three, I've seen how different learning styles&mdash;and gaps in both traditional and
        homeschool environments&mdash;can leave students struggling. My goal is to fill that
        gap by giving each child the tools they need to thrive academically and feel confident
        in their abilities.
      </>
    ),
  },
  {
    title: "Literacy Growth",
    copy: (
      <>
        Since 2017, I have offered personalized tutoring and small-group writing instruction
        that helps students communicate clearly and build lasting literacy skills. I am trained
        in the Sounds In Syllables (SIS) program, an Orton-Gillingham-based structured literacy
        method, which allows me to support learners with a wide range of challenges.
      </>
    ),
  },
];

export default function KatieBioSection({ className = "" }) {
  const sectionClassName = ["katie-section", className].filter(Boolean).join(" ");
  const [activeApproachIndex, setActiveApproachIndex] = useState(0);
  const activeApproachSlide = approachSlides[activeApproachIndex];

  const showPreviousApproach = () => {
    setActiveApproachIndex((currentIndex) =>
      currentIndex === 0 ? approachSlides.length - 1 : currentIndex - 1
    );
  };

  const showNextApproach = () => {
    setActiveApproachIndex((currentIndex) =>
      currentIndex === approachSlides.length - 1 ? 0 : currentIndex + 1
    );
  };

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
                (IEW). With a Master's in Counseling Psychology and specialized training in{" "}
                <span className="highlight">dyslexia and dysgraphia</span>, I provide structured,
                evidence-based reading, spelling, and writing instruction for students who need clear,{" "}
                <span className="highlight">individualized support</span>.
              </p>

              <p>
                Through explicit, systematic, and diagnostic teaching, I tailor every lesson to your
                child's unique needs&mdash;helping them grow, gain confidence, and reach their full potential.
              </p>

              <div
                id="approach"
                className="katie-approach-carousel"
                aria-label="Katie Lynch's professional approach"
              >
                <article className="katie-approach-slide">
                  <div className="katie-approach-slide-header">
                    <h3>{activeApproachSlide.title}</h3>
                    <div className="katie-approach-controls" aria-label="Approach carousel controls">
                      <button
                        type="button"
                        className="katie-approach-control"
                        onClick={showPreviousApproach}
                        aria-label="Show previous approach note"
                      >
                        <ChevronLeft aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        className="katie-approach-control"
                        onClick={showNextApproach}
                        aria-label="Show next approach note"
                      >
                        <ChevronRight aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <p>{activeApproachSlide.copy}</p>
                </article>

                <div className="katie-approach-dots" aria-hidden="true">
                  {approachSlides.map((slide, index) => (
                    <span
                      key={slide.title}
                      className={[
                        "katie-approach-dot",
                        index === activeApproachIndex ? "is-active" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="credentials" className={`${sectionClassName} katie-credentials-section`}>
        <h2>Education &amp; Professional Certifications</h2>

        <div className="katie-credentials-grid">
          <div className="katie-credential-column" aria-label="Education">
            <ul className="katie-credential-list">
              <li className="katie-credential-item">
                <span className="katie-credential-title">
                  Master of Science (M.S.) in Counseling Psychology
                </span>
                <span className="katie-credential-source">University of Baltimore</span>
              </li>

              <li className="katie-credential-item">
                <span className="katie-credential-title">
                  Bachelor of Arts (B.A.) in Psychology and Child Development and Family
                  Relations
                </span>
                <span className="katie-credential-source">East Carolina University</span>
              </li>
            </ul>
          </div>

          <div className="katie-credential-column" aria-label="Professional certifications">
            <ul className="katie-credential-list">
              <li className="katie-credential-item">
                <span className="katie-credential-title">
                  Certified Academic Language Therapist (CALT)
                </span>
                <span className="katie-credential-source">
                  Atlantic Seaboard Dyslexia Education Center
                </span>
              </li>

              <li className="katie-credential-item">
                <span className="katie-credential-title">Experienced Instructor</span>
                <span className="katie-credential-source">
                  Institute for Excellence in Writing (IEW)
                </span>
              </li>

              <li className="katie-credential-item">
                <span className="katie-credential-title">Certified Therapist</span>
                <span className="katie-credential-source">
                  Academic Language Therapy Association (ALTA)
                </span>
              </li>

              <li className="katie-credential-item">
                <span className="katie-credential-title">Professional Member</span>
                <span className="katie-credential-source">
                  International Dyslexia Association (IDA)
                </span>
              </li>

              <li className="katie-credential-item">
                <span className="katie-credential-title">
                  Member, Virginia Chapter of the Atlantic Language Therapist Association (ALTA)
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
