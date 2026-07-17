"use client";

import Footer from "./Footer";
import HeaderHero from "./HeaderHero";
import KatieBioSection from "./KatieBioSection";
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

      <KatieBioSection />

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
