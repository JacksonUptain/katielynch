"use client";

import HeaderHero from './HeaderHero';
import Footer from './Footer';
import KatieBioSection from './KatieBioSection';
import { useEffect } from "react";
import Link from "next/link";
import { assetPath } from "./sitePaths";
import { pagePaths } from "./routes";
import ContactCta from "./ContactCta";


export default function Home() {
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if (!revealElements.length) return;

    if (!window.IntersectionObserver) {
      revealElements.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const revealTarget = (entry, obs) => {
      if (entry.isIntersecting || entry.intersectionRatio > 0) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    };

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => revealTarget(entry, obs));
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -90px 0px',
      }
    );

    revealElements.forEach((el, index) => {
      el.style.transitionDelay = `${index * 80}ms`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-page">
      <HeaderHero
        image={assetPath("/images/capturingLiteracy.png")}
        title={"Katie Lynch"}
        description={"Certified Academic Language Therapist providing dyslexia, writing, and IEW instruction in Manassas and Northern Virginia."}
        currentPageName={"Home"}
      />

      <nav className="mobile-home-jump-nav" aria-label="Home page sections">
        <a href="#bio">About</a>
        <a href="#credentials">Credentials</a>
        <a href="#home-services">Services</a>
      </nav>

      <KatieBioSection className="reveal-on-scroll" />
      <section id="quote" className="quote-section reveal-on-scroll">
            <h2>My Belief</h2>
            <p>
                "Many children struggle with reading and writing not because they lack intelligence or potential, 
                but because they have not yet mastered the <span className='highlight'>foundational</span> skills that support literacy.
            </p>
            <p>
                 When provided with structured, incremental, and multisensory instruction, students can develop the 
                 tools they need to become confident readers, effective writers, and <span className='highlight'>successful</span> communicators.
            </p>
            <p>
                 Through patience, understanding, and diagnostic, systematic teaching, even the most discouraged 
                 learners can build strong literacy skills, discover their strengths, and experience the confidence 
                 of academic success."
            </p>
            
            </section>

            
            <section id="home-services" className="educational-services-section reveal-on-scroll">
              <div className="educational-services-photo">
                <picture>
                  <source
                    srcSet={assetPath("/images/educational-services.avif")}
                    type="image/avif"
                  />
                  <img
                    src={assetPath("/images/educational-services.png")}
                    alt="Katie Lynch guiding a student through a literacy activity"
                    width={762}
                    height={900}
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
              </div>

              <div className="educational-services-copy">
                <h2>Educational Services</h2>
                <p>
                  At Capturing Literacy, I provide personalized in-person and virtual dyslexia remediation,
                  along with live virtual small-group and private writing and grammar instruction. Through a
                  compassionate, evidence-based approach tailored to each student's unique learning profile, I
                  help children build the skills and independence needed to thrive as readers and writers.
                </p>
                <Link href={pagePaths.services} className="educational-services-cta">
                  View Educational Services
                </Link>
              </div>
            </section>

            <ContactCta className="reveal-on-scroll" />

            <Footer />

    </div>
    
  );
}
