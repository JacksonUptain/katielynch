import Link from "next/link";

import HeaderHero from './HeaderHero';

import Footer from "./Footer";
import { assetPath } from "./sitePaths";

export default function NotFound() {
  return (
    <div>
      <HeaderHero image={assetPath("/images/capturingLiteracy.png")} title={"404"} description={"Page Not Found"} currentPageName={"404"} />
      
        <div style={{ textAlign: "center", marginTop: "5rem" }}>
       
        <p><b>Oops... the page you're looking for doesn't exist.</b></p>

        <Link href="/">
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
