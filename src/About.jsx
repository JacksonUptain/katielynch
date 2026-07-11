"use client";

import Image from "react-bootstrap/Image";
import Footer from "./Footer";
import HeaderHero from "./HeaderHero";
import { assetPath } from "./sitePaths";

export default function About() {
  return (
    <div>
      <HeaderHero
        image={assetPath("/images/capturingLiteracy.png")}
        title={"About Katie Lynch"}
        description={"Certified Academic Language Therapist | IEW Instructor | Dyslexia Specialist"}
        currentPageName={"About"}
      />

      <section id="bio" className="bio-section">
        <h2>About Katie Lynch</h2>
        <div className="bio-content">
          <div className="bio-image-wrapper">
            <Image
              src="https://lh3.googleusercontent.com/a-/ALV-UjUgoM4CLOYApN3oXhKtgtbruhtm5ymFxY6IEO-uoyZToLRE8B4=s330-p-k-rw-no"
              alt="Katie Lynch"
              roundedCircle
              className="bio-image"
            />

            <div
              className="bio-overlay"
              onClick={() => {
                window.location.href = "/contact";
              }}
            >
              Contact Me
            </div>
          </div>
          <div className="bio-text">
            <p>
              Katie Lynch, CALT, is a{" "}
              <a
                href="https://dyslexiaida.org/helpful-terminology-fact-sheet/"
                target="_blank"
                rel="noopener noreferrer"
                className="subtle-link"
              >
                Certified Academic Language Therapist
              </a>{" "}
              specializing in reading, spelling, and writing instruction for
              students with language-based learning differences. Trained in the
              Sounds In Syllables (SIS) Multisensory Language Therapy approach,
              an Orton-Gillingham-based structured literacy method, she provides
              explicit, systematic, and <span className="highlight">individualized</span>{" "}
              instruction tailored to each student's unique needs.
            </p>
            <p>
              Katie is also accredited as an{" "}
              <a
                href="https://iew.com/services/instructors/katie-lynch-203114"
                target="_blank"
                rel="noopener noreferrer"
                className="subtle-link"
              >
                Experienced Instructor
              </a>{" "}
              with the Institute for Excellence in Writing (IEW). She offers
              personalized and small group writing instruction that helps
              students gain the <span className="highlight">skills</span> and{" "}
              <span className="highlight">confidence</span> to communicate
              effectively in writing. Through diagnostic, adaptive teaching, she
              empowers students to build lasting literacy skills and achieve
              academic success.
            </p>
          </div>
        </div>
      </section>

      <section id="quote" className="quote-section">
        <h2>My Belief</h2>
        <p>
          "Many children struggle with reading and writing not because they lack
          intelligence or potential, but because they have not yet mastered the{" "}
          <span className="highlight">foundational</span> skills that support
          literacy. When provided with structured, incremental, and multisensory
          instruction, students can develop the tools they need to become
          confident readers, effective writers, and{" "}
          <span className="highlight">successful</span> communicators. Through
          patience, understanding, and diagnostic, systematic teaching, even the
          most discouraged learners can build strong literacy skills, discover
          their strengths, and experience the confidence of academic success."
        </p>
      </section>

      <Footer />
    </div>
  );
}
