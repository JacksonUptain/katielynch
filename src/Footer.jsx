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
                <img 
                  src={assetPath("/images/IEW.png")}
                  alt="Experience Instructor Award" 
                  className="footer-award"
                />
              </a>
            
              <a 
                href="https://www.altaread.org/about/mission" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <img 
                  src={assetPath("/images/ALTA.jpg")}
                  alt="Alta Logo & Link" 
                  className="footer-award footer-award-framed"
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
