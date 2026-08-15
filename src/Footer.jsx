import Link from "next/link";
import { assetPath } from "./sitePaths";
import { pagePaths } from "./routes";




export default function Footer() {
  return (
    
        
        <footer className="site-footer">
          <div className="footer-container">
            <div className="footer-left">
              <a 
                href="https://iew.com/services/instructors/katie-lynch-203114" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <picture>
                  <source srcSet={assetPath("/images/IEW.avif")} type="image/avif" />
                  <img
                    src={assetPath("/images/IEW.png")}
                    alt="Institute for Excellence in Writing Experienced Instructor badge"
                    className="footer-award"
                    width={360}
                    height={360}
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
              </a>
            
              <a 
                href="https://www.altaread.org/about/mission" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <img 
                  src={assetPath("/images/ALTA.jpg")}
                  alt="Academic Language Therapy Association logo"
                  className="footer-award footer-award-framed"
                  width={474}
                  height={280}
                  loading="lazy"
                  decoding="async"
                />
              </a>
            </div>
            
            
            <div className="footer-links">
              <Link href={pagePaths.about}>
                About
              </Link>
              <Link href={pagePaths.services}>Educational Services</Link>
              <Link href={pagePaths.contact}>Contact</Link>
              <Link href={pagePaths.blog}>Resources</Link>
              <Link href={pagePaths.essay}>Student Showcase</Link>

            </div>
          </div>

          <p className="footer-copy">Manassas, Virginia | In-person and virtual literacy tutoring</p>
          <p className="footer-copy">&copy; 2026 Katie Lynch | Capturing Literacy LLC</p>
        </footer>

   
    
  );
}
