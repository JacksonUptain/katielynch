import { Link } from "react-router-dom";

import './App.css';
import HeaderHero from './HeaderHero';
import capturingLiteracy from './capturingLiteracy.png';

import Footer from "./Footer";

export default function NotFound() {
  return (
    <div>
      <HeaderHero image={capturingLiteracy} title={"404"} description={"Page Not Found"} currentPageName={"404"} />
      
        <div style={{ textAlign: "center", marginTop: "5rem" }}>
       
        <p><b>Oops... the page you're looking for doesn't exist.</b></p>

        <Link to="/">
            <button style={{
            padding: "10px 20px",
            marginTop: "20px",
            cursor: "pointer"
            }}>
            Go Back Home
            </button>
        </Link>
        </div>
        <Footer />
    </div>
  );
}