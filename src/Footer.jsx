
import { Link } from 'react-router-dom';
import './App.css';




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
                  src="/images/IEW.png"
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
                  src="/images/ALTA.jpg"
                  alt="Alta Logo & Link" 
                  className="footer-award"
                  style={{borderRadius: "5px", border: "20px solid white"}}
                />
              </a>
            </div>
            
            
            <div className="footer-links">
              <Link to="/" state={{ scrollTo: "bio" }}>
                About
              </Link>
              <Link to="/services">Services</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/blog">Blog</Link>
              <Link to="/essay">Essay of the Month</Link>

            </div>
          </div>

          <p className="footer-copy">&copy; 2026 Katie Lynch | Capturing Literacy LLC</p>
        </footer>

   
    
  );
}