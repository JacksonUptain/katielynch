
import './App.css';
import HeaderHero from './HeaderHero';
import capturingLiteracy from './capturingLiteracy.png';
import Image from 'react-bootstrap/Image';
import Footer from './Footer';

import ServiceCard from "./ServiceCard";
import { useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { useFirebaseSection } from './useFirebaseSection';


export default function Home() {
const location = useLocation();
const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current && location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
    isMounted.current = true;
  }, [location]);


  const servicesData = useFirebaseSection("Services").items || [];

  return (
    <div>
      <HeaderHero image={capturingLiteracy} title={"Katie Lynch"} description={"Certified Academic Language Therapist | IEW Instructor | Dyslexia Specialist"} currentPageName={"Home"}  />
      <section id="bio" class="bio-section">
            <h2>About Katie Lynch</h2>
            <div className="bio-content">
              <div className="bio-image-wrapper">
                <Image
                  src="https://lh3.googleusercontent.com/a-/ALV-UjUgoM4CLOYApN3oXhKtgtbruhtm5ymFxY6IEO-uoyZToLRE8B4=s330-p-k-rw-no"
                  alt="Katie Lynch"
                  roundedCircle
                  className="bio-image"
                />
                
                <div className="bio-overlay" onClick={() => window.location.href = '/contact'}>
                  Contact Me
                </div>
              </div>
              <div className="bio-text">
                <p>
                    Katie Lynch, CALT, is a <a href="https://dyslexiaida.org/helpful-terminology-fact-sheet/" target="_blank" rel="noopener noreferrer" className="subtle-link">Certified Academic Language Therapist</a> specializing in reading, spelling, and writing instruction for students with language-based learning differences. 
                    Trained in the Sounds In Syllables (SIS) Multisensory Language Therapy approach, an Orton-Gillingham–based structured literacy method, she provides explicit, systematic, and <span className="highlight">individualized</span> instruction 
                    tailored to each student's unique needs.</p>
                   <p>Katie is also accredited as an <a href="https://iew.com/services/instructors/katie-lynch-203114" target="_blank" rel="noopener noreferrer" className="subtle-link">Experienced Instructor</a>  with the Institute for Excellence in Writing (IEW). She offers personalized and small group writing instruction 
                    that helps students gain the <span className="highlight">skills</span> and <span className="highlight">confidence</span> to communicate effectively in writing. Through diagnostic, adaptive teaching, she empowers students to build lasting literacy skills and achieve academic success. </p>
              </div>
            </div>
      </section>
      <section id="quote" class="quote-section">
            <h2>My Belief</h2>
            <p>
                "Many children struggle with reading and writing not because they lack intelligence or potential, 
                but because they have not yet mastered the <span className='highlight'>foundational</span> skills that support literacy.
                 When provided with structured, incremental, and multisensory instruction, students can develop the 
                 tools they need to become confident readers, effective writers, and <span className='highlight'>successful</span> communicators. 
                 Through patience, understanding, and diagnostic, systematic teaching, even the most discouraged 
                 learners can build strong literacy skills, discover their strengths, and experience the confidence 
                 of academic success."
            </p>
            
            </section>

            
            <section className="services-preview quote-section" style={{
          borderLeft: "0px",
          backgroundImage:
            'url("/images/HBG.webp")'
        }}>
                <h2>Services</h2>
                <p>
                  As a Certified Academic Language Therapist with a deep understanding of various learning styles, 
                  I employ a <span class="highlight">compassionate</span> and <span class="highlight">tailored</span> approach to meet children where they are academically. 
                  I focus on each student’s strengths to help them build the confidence and independence needed to achieve 
                  academic success.  
                </p>
                {servicesData
                .filter(service => (service.featured === "true" || service.featured === true || service.featured === "True" || service.featured === "TRUE" || service.featured === "yes")) // 👈 only take featured
                .slice(0, 2) // 👈 only take first 2
                .map((service, index) => (
                  <Link
                    key={index}
                    to={`/services`}
                    style={{ textDecoration: "none" }}
                  >
                    {console.log("Index: ", index)}
                    <ServiceCard
                      title={service.title}
                      description={service["short-description"]}
                      image={service.image}
                      reverse={index % 2 === 1}
                      
                    />
                  </Link>
                ))}
            </section>
            
        
            <Footer />

    </div>
    
  );
}